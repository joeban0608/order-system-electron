// renderer.js
const information = document.getElementById("info");
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`;

const orderFormDom = document.getElementById("orderForm");
const submitBtnDom = document.getElementById("submit-btn");
const submitMsgDom = document.getElementById("submit-msg");
const loadingSpinnerDom = document.getElementById("loading-spinner");

if (orderFormDom) {
  orderFormDom.addEventListener("submit", function (event) {
    event.preventDefault();
    const order = {
      name: document.getElementById("name").value,
      meal: document.getElementById("meal").value,
      extra: document.getElementById("extra").value,
    };
    window.electronAPI.getOrder(order); // IPC 透過 electronAPI 保存訂單
  });
}

if (submitBtnDom) {
  submitBtnDom.addEventListener("click", async () => {
    // 顯示 loading 動畫
    // if (loadingSpinnerDom) {
    //   loadingSpinnerDom.style.display = "inline-block";
    // }

    // 提交表單資料並接收回應
    const submitMsgInfo = await window.electronAPI.submitForm();

    // // 隱藏 loading 動畫
    // if (loadingSpinnerDom) {
    //   loadingSpinnerDom.style.display = "none";
    // }

    console.log("submitMsg", submitMsgInfo.message);
    if (submitMsgDom) {
      submitMsgDom.innerText = submitMsgInfo.message;
    }
  });
}
