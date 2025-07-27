const {app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    // win.loadURL('data:text/html, <h1>Hello Exam Sim</h1>');
    win.loadFile('index.html');
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);