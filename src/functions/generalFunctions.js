const { ipcRenderer} = require('electron')
const path = require('path');
const pupAndLatFunctions = require(path.resolve(__dirname, './functions/pupAndLat.js'));
const errorHandlingFunctions = require(path.resolve(__dirname, './functions/errorHandling.js'));

document.getElementById('getPath').addEventListener('click', getPath);
document.getElementById('pdfyArticle').addEventListener('click', previewArticle);
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
    const elem = document.createElement('p');
    const elem2 = document.createElement('p');
    const elem3 = document.createElement('img');
    console.log("DATA", data);
    console.log("source?", data.image.thumbnail.source);
    elem.innerText = data.title;
    elem2.innerText = data.extract;
    elem3.src = data.image.thumbnail.source;

    const target = document.getElementById("pdfyArticle");

    target.parentNode.insertBefore(elem, target.nextSibling);
    target.parentNode.insertBefore(elem2, target.nextSibling);
    target.parentNode.insertBefore(elem3, target.nextSibling);
}

function previewArticle() {
    const urlText = url.value;
    // if (urlText.length === 0) {
    //     console.log('empty url text')
    //     return handleUrlError(0)
    // }
    ipcRenderer.send('beginInfoGetting', urlText.toLowerCase());
}

ipcRenderer.on('sendPath', (brap, data) => {
    const filePath = data.filePaths[0];
    setPath(filePath);
})

ipcRenderer.on('endInfoGetting', endScraping);
