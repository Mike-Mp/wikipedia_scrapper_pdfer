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

function endScraping (e, data) {
    if (data?.results) {
        showResults(data);
        return;
    }

    if (document.getElementById('previewDiv')) {
        document.getElementById('previewDiv').remove();
    }

    const div = document.createElement('div');
    div.setAttribute('id', 'previewDiv')
    const title = document.createElement('p');
    const extract = document.createElement('p');
    title.innerText = data.title;
    const shortExtract = data.extract.substring(0, 250);
    extract.innerText = shortExtract + "...";

    const target = document.getElementsByClassName("pButtons")[0];

    target.parentNode.insertBefore(div, target.nextSibling);

    div.append(title, extract);
}

function showResults({results, query}) {
    console.log("if data results")
    if (document.getElementById("resultsDiv")) {
        document.getElementById('resultsDiv').remove();
    }

    if (document.getElementById("closeResults")) {
        document.getElementById("closeResutls").remove()
    }

    const div = document.createElement('div');
    div.setAttribute("id", "resultsDiv");

    const message = document.createElement('p');
    message.innerHTML = `<span class="query">${query}</span> may refer to: `
    const select = document.createElement('select');

    for(let i=0;i<results.length;i++) {
        const option = document.createElement('option');

        option.setAttribute('value', results[i]);
        option.innerText = results[i];

        select.append(option);
    }

    div.append(message, select);

    const target = document.getElementsByClassName("pButtons")[0];

    target.parentNode.insertBefore(div, target.nextSibling);

    const closeResults = document.createElement('a');

    closeResults.addEventListener('click', () => {
        div.remove();
        closeResults.remove();
    });

    closeResults.setAttribute('id', 'closeResults');
    closeResults.innerText = "Close Results";

    div.parentNode.insertBefore(closeResults, div.nextSibling);

    select.addEventListener('change', function() {
        document.getElementById('url').value = this.value;
    });
}

function previewArticle() {
    const articleTitle = url.value;
    ipcRenderer.send('beginInfoGetting', articleTitle.toLowerCase());
}

function pdfyArticle() {
    const articleTitle = url.value;
    const pathString = pathSpan.innerText;

    const processMessage = document.getElementById('processMessage')

    if (processMessage) {
        processMessage.innerText = "process started"
    } else {
        let e = 1
        processDiv(e);
    }

    ipcRenderer.send('beginPdfying', {articleTitle, pathString})
}

function processDiv(e, response = undefined) {
    if (document.getElementById("endPdfyingMessage")) {
        document.getElementById("endPdfyingMessage").remove();
    }

    const div = document.createElement('div');
    div.setAttribute('id', 'endPdfyingMessage');
    const p = document.createElement('p');

    p.setAttribute('id', 'processMessage');

    if (response?.message) {
        p.innerText = response
    } else if (response?.results) {
        console.log("LELELELLELELELE");
        showResults(response);
        return;
    }
     else if (e === 1) {
        p.innerText = 'process started';
    }
    else {
        p.innerText = 'process complete'
    }


    div.append(p);

    const target = document.getElementsByClassName('pButtons')[0];

    target.parentNode.insertBefore(div, target.nextSibling);
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

    const target = document.getElementsByClassName('pButtons')[0];

    target.parentNode.insertBefore(div, target.nextSibling);

    div.append(errorMessage);
}

ipcRenderer.on('sendPath', (brap, data) => {
    const filePath = data.filePaths[0];
    setPath(filePath);
})

ipcRenderer.on('endInfoGetting', endScraping);

ipcRenderer.on('endPdfying', processDiv);

ipcRenderer.on('errorHappened', errorMessaging)