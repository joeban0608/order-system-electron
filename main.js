const { ipcMain } = require("electron");
const { app, BrowserWindow } = require("electron/main");
const path = require("node:path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  ipcMain.on("get-order", (event, oderInfo) => {
    console.log("oderInfo", oderInfo);
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    console.log("win", win);
    // win.setTitle(title);
  });

  win.loadFile("index.html");
};
async function submitForm() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "success" });
      // resolve({ error: "something went wrong" });
    }, 3000); // 延遲 3 秒
  });
}

app.whenReady().then(() => {
  ipcMain.handle("form:submit", submitForm);

  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
