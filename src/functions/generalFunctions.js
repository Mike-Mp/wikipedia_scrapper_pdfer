const { ipcRenderer} = require('electron')

document.getElementById('getPath').addEventListener('click', getPath);
document.getElementById('pdfyArticle').addEventListener('click', pdfyArticle);
const url = document.getElementById('url');

const pathSpan = document.getElementById('filePath');

if (pathSpan.innerText.length === 0) {
    pathSpan.innerText = 'Please choose a path';
}

function getPath() {
    ipcRenderer.send('getPath');
}

function setPath(newPath) {
    pathSpan.innerText = newPath;
}

function pdfyArticle() {
    const urlText = url.innerText;
    if (urlText.length === 0) {
        return handleUrlError(0)
    }
    ipcRenderer.send('beginScraping', url)
}

ipcRenderer.on('sendPath', (brap, data) => {
    const filePath = data.filePaths[0];
    setPath(filePath);
})