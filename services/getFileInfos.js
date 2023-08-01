const createDriveClient = require("../helpers/createDriveClient");

const getFileInfos = async (token, query) => {
    const drive = createDriveClient(token);

    const allFiles = [];
    let nextPageToken = null;

    do {
        const response = await drive.files.list({
            q: query,
            fields: 'nextPageToken, files(id, name, originalFilename, mimeType, webViewLink, owners)',
            pageSize: 100, // Use a reasonable page size to avoid hitting API limits
            pageToken: nextPageToken,
        });

        allFiles.push(...response.data.files);
        nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);

    // console.log("see this", allFiles.filter(f => f.webViewLink))
    // shared with and created by information for each file...
    const filesWithInfo = await Promise.all(
        allFiles.filter(f => f.webViewLink).map(async file => {
            try {
                const p_response = await drive.permissions.list({
                    fileId: file.id,
                    fields: 'permissions(emailAddress)'
                });

                // const visible = await drive.files.get({
                //     fileId: file.id,
                //     fields: 'visibility',
                // })

                const p_info = p_response?.data?.permissions?.filter(p => p.emailAddress);
                const sharedWith = p_info?.map(p => p.emailAddress);

                // get file ownership
                const createdBy = file.owners && Array.isArray(file.owners) && file.owners[0] ? file.owners[0].emailAddress : 'Anonymous';

                // return file with added informations
                return {
                    ...file,
                    sharedWith,
                    createdBy,
                    // visiblity: visible,
                }
            } catch (error) {
                return {
                    ...file,
                    sharedWith: [],
                    createdBy: 'Unknown',
                };
            }
        })
    )

    return filesWithInfo;
}

module.exports = getFileInfos;