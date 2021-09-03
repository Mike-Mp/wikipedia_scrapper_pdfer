const {app , BrowserWindow, dialog, ipcMain} = require('electron');
const path = require('path');
const pie = require("puppeteer-in-electron")
const puppeteer = require("puppeteer-core");

let win;
let invisibleWin;

ipcMain.on('getPath', async (event, data) => {
  const path = await dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  })

  console.log(path);

  event.reply('sendPath',path)
})

ipcMain.on('beginScraping', async (event,data) => {
  const page = main();
  event.reply('sendPage', page);
})

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile(path.join(__dirname, 'index.html'));
}

app.once('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})



const main = async (url) => {
  await pie.initialize(app);
  const browser = await pie.connect(app, puppeteer);
 
  invisibleWin = new BrowserWindow({
    show: false
  });
  const url = "https://example.com/";
  await window.loadURL(url);
 
  const page = await pie.getPage(browser, window);
  
  return page;
};
