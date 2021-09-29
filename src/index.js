const {app , BrowserWindow, dialog, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const {previewArticle, createPdf} = require("./functions/pupAndLat.js");
const {handleUrlError, handlePathError} = require("./functions/errorHandling.js");

let win;

ipcMain.on('getPath', async (event, data) => {
  const path = await dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  })

  console.log(path);

  event.reply('sendPath',path)
})

ipcMain.on('beginInfoGetting', async (event,data) => {
    const code = handleUrlError(data);

    if (code !== undefined) {
      event.reply("errorHappened", code)
      return;
    }

    const scrapeData = await previewArticle(data);

    event.reply("endInfoGetting", scrapeData);
});

ipcMain.on('beginPdfying', async (event, data) => {
    const code = handlePathError(data.articleTitle, data.pathString);
    
    if (code !== undefined) {
      event.reply("errorHappened", code)
      return;
    }

    const response = await createPdf(data.articleTitle, data.pathString);

    event.reply('endPdfying', response);
})

// Application already running, so we close now
if (!app.requestSingleInstanceLock()) {
  app.quit()
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

async function createWindow() {
  let
    startUrl = '';

  // Create the browser window.
  mainWindow = new BrowserWindow(
    {
      width: 480,
      height: 460,
      resizable: process.env.NODE_ENV !== 'Production',
      maximizable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true
      }
    });

  // Add in the devtools
  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err));
  //
  // installExtension(REDUX_DEVTOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err));

  // and load the index.html of the app.
  if(process.env.NODE_ENV === 'production') {
    startUrl = url.format({
      pathname: path.join(__dirname, `index.html`),
      protocol: 'file:',
      slashes: true
    });
  }
  else {
    startUrl = url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    });
  }

  await mainWindow.loadURL(startUrl);
  await mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', async function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    await createWindow()
  }
});
