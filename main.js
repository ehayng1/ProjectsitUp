const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  contextBridge,
} = require("electron");
let path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   nodeIntegration: true,
    //   contextIsolation: false,
    //   enableRemoteModule: true,
    // },
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: true,

      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("login.html"); // Load the login.html file
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  contextBridge.exposeInMainWorld("electronAPI", {
    send: (channel, data) => {
      mainWindow.webContents.send(channel, data);
    },
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Handle navigateToPage message
ipcMain.on("navigateToPage", (event, file) => {
  if (mainWindow) {
    mainWindow.loadFile(file);
  }
});

// Handle showDialog message
ipcMain.handle("showDialog", async (event, options) => {
  const response = await dialog.showMessageBox(mainWindow, options);
  return response;
});
