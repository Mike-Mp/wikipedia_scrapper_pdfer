const handleUrlError = (urlText = '') => {
    if (urlText.length === 0 || urlText.replace(/\s/g, '').length === 0) {
        // no input
        return 1;
    } else if (urlText.startsWith("http://www") || urlText.startsWith("https://www") || urlText.startsWith("www.")) {
        // provided link instead of article title
        return 2;
    }
}

const handlePathError = (urlText, filePath) => {
    const errorCode = handleUrlError(urlText);
    if (errorCode !== undefined) {
        return errorCode;
    }
    if (filePath.length === 0 || filePath.replace(/\s/g, '').length === 0) {
        return 3;
    }
}

module.exports = {
    handleUrlError,
    handlePathError
}