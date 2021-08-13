chrome.tabs.getSelected(null, function (tab) {
  //获取 当前标签页的url
  $(function () {
    init(tab.url);
  });
});
/**
 * @function 设置projectToHtml
 * @description 页面展示过往页面url
 * @param {Object} object 数据模型
 * @return void
 */
function projectToHtml(project) {
  let i = 0;
  for (const key in project) {
    if (Object.hasOwnProperty.call(project, key)) {
      const element = project[key];
      const htmlFateh = `<div class="project-module"><div class="project-title">${key}</div></div>`;
      $(".project").append(htmlFateh);

      element.forEach((object) => {
        const html = ` <div class="project-module-item">
        <div class="project-module-item-name">${object.name}</div>
        <div class="project-module-item-url">${object.url}</div>
      </div>`;
        $(".project-module").eq(i).append(html);
      });
      i++;
    }
  }
}
/**
 * @function
 * @description 函数描述...
 * @param {Array} cols 描述
 * @param {Boolean} isAllSome  描述
 * @return void
 */

function setUrl(url, domId) {
  this.uri = new Uri(url) || "";
  this.domId = domId || "qrcode";
  this.qrcode = null;
  this.H5 = true;
  this.appUrlBase = "https://app.mama.cn/soft_link/pt?type=666&url="; //孕育app 打开H5入口
  this.init();
}
setUrl.prototype.init = function () {
  //初始化默认uri 添加 "lightproxy", "true"
  this.uri = this.uri.addQueryParam("lightproxy", "true");
};
setUrl.prototype.toURLString = function () {
  //uri转String url
  return this.uri.toString();
};
setUrl.prototype.addQueryParam = function (key, value) {
  this.uri = this.uri.addQueryParam(key, value);
  return this;
};
setUrl.prototype.deleteQueryParam = function (key) {
  this.uri = this.uri.deleteQueryParam(key);
  return this;
};
setUrl.prototype.setAppUrl = function () {
  //设置 将uri 改成 孕育app 打开H5入口
  return new Uri(this.appUrlBase + encodeURIComponent(this.uri.toString()));
};
setUrl.prototype.setMMAppQRcode = function () {
  // 设置二维码
  let activeUri = this.uri;
  if (!this.H5) {
    activeUri = this.setAppUrl();
  }
  if (this.qrcode) {
    this.qrcode.clear();
    this.qrcode.makeCode(activeUri.toString());
  } else {
    this.qrcode = new QRCode(
      document.getElementById(this.domId),
      activeUri.toString()
    ); // 设置要生成二维码的链接
  }
  return this;
};
function init(url) {
  projectToHtml(project);
  //初始化
  const inputDom = $("[name='change-modue-input']");

  const setUrlObject = new setUrl(url);

  setUrlObject.setMMAppQRcode();

  inputDom.val(setUrlObject.toURLString());

  $("input:radio[name='lightproxy']").change(function () {
    if ($(this).val() === "true") {
      setUrlObject.addQueryParam("lightproxy", "true");
    } else {
      setUrlObject.deleteQueryParam("lightproxy");
    }
    inputDom.val(setUrlObject.toURLString()) && setUrlObject.setMMAppQRcode();
  });

  $("input:radio[name='environment']").change(function () {
    if ($(this).val() === "true") {
      setUrlObject.H5 = true;
    } else {
      setUrlObject.H5 = false;
    }
    setUrlObject.setMMAppQRcode();
  });
  $(".to-change").click(function () {
    const changeUrl = $("[name='change-modue-input']").val();

    setUrlObject.uri = new Uri(changeUrl);

    setUrlObject.setMMAppQRcode();
  });
}
