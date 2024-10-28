const { ipcMain } = require("electron");
const { app, BrowserWindow } = require("electron/main");
const path = require("node:path");

let initialOrderInfo = {
  name: "",
  meal: "",
  extra: "",
};
let storeOrderInfo = initialOrderInfo;
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  ipcMain.on("get-order", (event, orderInfo) => {
    console.log("orderInfo", orderInfo);
    if (orderInfo.name && orderInfo.meal) {
      storeOrderInfo = orderInfo;
    }
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    // console.log("win", win);
    // win.setTitle(title);
  });

  win.loadFile("index.html");
};
async function submitForm(event, orderInfo) {
  console.log("orderInfo in submit", orderInfo);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  console.log("storeOrderInfo", storeOrderInfo);
  const raw = JSON.stringify(storeOrderInfo);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };
  try {
    const res = await fetch("http://localhost:8000/order", requestOptions);
    const createOrderRes = await res.json();
    console.log("createOrderRes", createOrderRes);
    if (!createOrderRes.ok) {
      throw new Error("create order fetch error");
    }
    if ("error" in createOrderRes) {
      throw new Error(createOrderRes.error);
    }
    return {
      message: createOrderRes.message,
    };
  } catch (err) {
    return {
      error: `create order something went wrong: ${err}`,
    };
  }

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({ message: "success" });
  //     // resolve({ error: "something went wrong" });
  //   }, 3000); // 延遲 3 秒
  // });
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
