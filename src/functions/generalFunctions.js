const { ipcRenderer} = require('electron')

document.getElementById('getPath').addEventListener('click', getPath);
document.getElementById('previewArticle').addEventListener('click', previewArticle);
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

function endScraping(e, data) {
    if (document.getElementById('previewDiv')) {
        document.getElementById('previewDiv').remove();
    }

    const div = document.createElement('div');
    div.setAttribute('id', 'previewDiv')
    const title = document.createElement('p');
    const extract = document.createElement('p');
    const img = document.createElement('img');
    title.innerText = data.title;
    const shortExtract = data.extract.substring(0, 250);
    extract.innerText = shortExtract + "...";
    // img.src = data.image?.thumbnail?.source;

    const target = document.getElementById("pdfyArticle");

    target.parentNode.insertBefore(div, target.nextSibling);

    div.append(title, img, extract);
}

function previewArticle() {
    const articleTitle = url.value;
    ipcRenderer.send('beginInfoGetting', articleTitle.toLowerCase());
}

function pdfyArticle() {
    const articleTitle = url.value;
    const pathString = pathSpan.innerText;

    ipcRenderer.send('beginPdfying', {articleTitle, pathString})
}

function errorMessaging(event, errorCode) {
    console.log("errorCode: ", errorCode);
    document.getElementById('errorBox');
    if (document.getElementById('errorBox')) {
       document.getElementById('errorBox').remove();
    }

    const div = document.createElement('div');
    div.setAttribute('id', 'errorBox');

    const errorMessage = document.createElement('p');

    if (errorCode === 1) {
        errorMessage.innerText = "No input provided";
    } else if (errorCode === 2) {
        errorMessage.innerText = 'Provided link instead of article'
    } else if (errorCode === 3) {
        errorMessage.innerText = 'No download file path specified'
    }

    const target = document.getElementById('pdfyArticle');

    target.parentNode.insertBefore(div, target.nextSibling);

    div.append(errorMessage);
}

ipcRenderer.on('sendPath', (brap, data) => {
    const filePath = data.filePaths[0];
    setPath(filePath);
})

ipcRenderer.on('endInfoGetting', endScraping);

ipcRenderer.on('errorHappened', errorMessaging)