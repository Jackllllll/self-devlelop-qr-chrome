console.log("你好，我是popup！");
let url = "";
chrome.tabs.getSelected(null, function (tab) {
  //获取 当前标签页的url
  url = tab.url;
  // 孕育：
  appurl = `https://app.mama.cn/soft_link/pt?type=666&url=${encodeURIComponent(
    url
  )}`;
});
$(function () {
  new QRCode(document.getElementById("qrcode"), appurl); // 设置要生成二维码的链接
  $("#taburl").html("当前页面url:" + url);
});
