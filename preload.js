const { ipcRenderer } = require("electron");
const { contextBridge } = require("electron/renderer");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("electronAPI", {
  getOrder: (orderInfo) => ipcRenderer.send("get-order", orderInfo),
  submitForm: () => ipcRenderer.invoke("form:submit"),
});
