const { ipcRenderer} = require('electron')
const path = require('path');
const pupAndLatFunctions = require(path.resolve(__dirname, './functions/pupAndLat.js'));
const errorHandlingFunctions = require(path.resolve(__dirname, './functions/errorHandling.js'));
const {scrapeInfo} = pupAndLatFunctions;

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
    const urlText = url.value;
    // if (urlText.length === 0) {
    //     console.log('empty url text')
    //     return handleUrlError(0)
    // }
    ipcRenderer.send('beginScraping', urlText);
}

ipcRenderer.on('sendPath', (brap, data) => {
    const filePath = data.filePaths[0];
    setPath(filePath);
})

ipcRenderer.on('sendPage', (event, data) => {
    scrapeInfo(data)
})

ipcRenderer.on('endScraping', (event, data) => {
    const elem = document.createElement('p');
    console.log(data);
    elem.innerText = data;

    const target = document.getElementById("pdfyArticle");

    target.parentNode.insertBefore(elem, target.nextSibling);
})