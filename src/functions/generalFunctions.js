const { ipcRenderer} = require('electron')
const path = require('path');
const pupAndLatFunctions = require(path.resolve(__dirname, './functions/pupAndLat.js'));
const errorHandlingFunctions = require(path.resolve(__dirname, './functions/errorHandling.js'));

document.getElementById('getPath').addEventListener('click', getPath);
document.getElementById('previewArticle').addEventListener('click', previewArticle);
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
    const div = document.createElement('div');
    const title = document.createElement('p');
    const extract = document.createElement('p');
    const img = document.createElement('img');
    console.log("DATA", data);
    console.log("source?", data.image.thumbnail.source);
    title.innerText = data.title;
    const shortExtract = data.extract.substring(0, 250);
    extract.innerText = shortExtract + "...";
    img.src = data.image.thumbnail.source;

    const target = document.getElementById("pdfyArticle");

    target.parentNode.insertBefore(div, target.nextSibling);

    div.append(title, img, extract);
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
