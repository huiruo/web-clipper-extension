# 官方文档
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/action/onClicked

Chrome 浏览器从88版本开始支持MV3啦（即Manifest Version 3），现在浏览器版本都100+了。

而MV2（即Manifest Version 2）将会在2023年 退休 。所以今天要讲的就是MV3版本

## manifest.json
manifest.json 作为插件的配置清单最能体现相关的变动了 从manifest.json 参考文档 可以很清楚地看到配置升级其实主要加了2个 「action」和 「host_permissions」

Host Permissions
在V2中，有两种方法为你的api或任何主机获得权限，要么在 permissions 数组或 optional_permissions 数组。
```json
{
  "permissions": ["https://xxxx.com/*"]
}
```

在V3中，所有主机权限现在都单独存在一个新数组中，该数组的键为 host_permissions。主机权限不再与其他权限一起添加。
```json
{
  "host_permissions": ["https://xxx.com/*"]
}
```

### Actions
在V2中，分为 browser_action 和 page_action 。

* browser_action 更多是负责插件的icon的切换等操作。参考文档： API-browserAction
* 而page_action 更多是针对某个页面进行地址栏的操作 参考文档：API-pageAction
感兴趣的可以在MDN插件开发文档里面看一看。

在V3中，都统一合并为 action 。参考文档：API-action

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/action

## 弃用的API
```
chrome.extension.getExtensionTabs()
chrome.extension.getURL()
chrome.extension.lastError
chrome.extension.onRequest
chrome.extension.onRequestExternal
chrome.extension.sendRequest()
chrome.tabs.getAllInWindow()
chrome.tabs.getSelected()
chrome.tabs.onActiveChanged
chrome.tabs.onHighlightChanged
chrome.tabs.onSelectionChanged
chrome.tabs.sendRequest()
chrome.tabs.selected
```

## tabs
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Working_with_the_Tabs_API

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/sendMessage

```js
// background-script.js
"use strict";

function onError(error) {
  console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs) {
  for (const tab of tabs) {
    browser.tabs
      .sendMessage(tab.id, { greeting: "Hi from background script" })
      .then((response) => {
        console.log("Message from the content script:");
        console.log(response.response);
      })
      .catch(onError);
  }
}

browser.browserAction.onClicked.addListener(() => {
  browser.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then(sendMessageToTabs)
    .catch(onError);
});
```

```js
// content-script.js
"use strict";

browser.runtime.onMessage.addListener((request) => {
  console.log("Message from the background script:");
  console.log(request.greeting);
  return Promise.resolve({ response: "Hi from content script" });
});
```

## 将 Background Scripts 改造成 Service Workers
在V2中，Background是可以通过 persistent 配置来确保页面时候需要 持久化 。而且还能支持 .html

```json
"background": {
  "scripts": ["background-script.js"],
  "persistent": false
}

//  或
"background": {
  "page": "background-page.html",
  "persistent": false
}
```

很多小技巧都依赖于 html 这特性，把数据挂载在 background 的 window 对象上进行数据中转

V3 则是强制使用了 Service Workers，禁止了持久化。background只能使用js文件
```json
"background": { "scripts": ["background.js"] },
```


## content_security_policy 变动
在V2的manifest.json 的 content_security_policy 配置是一个字符串类型。升级到 V3 后变成了一个对象类型。详细的变更看文档会更加清晰：content_security_policy 参考文档

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/content_security_policy

## web_accessible_resources
```json
// v2 写法
{
	"web_accessible_resources": ["images/my-image.png"]
}
```

```json
// v3 写法
{
  // …
  "web_accessible_resources": [
    {
      "resources": [ "test1.png", "test2.png" ],
      "matches": [ "https://web-accessible-resources-1.glitch.me/*" ]
    }, {
      "resources": [ "test3.png", "test4.png" ],
      "matches": [ "https://web-accessible-resources-2.glitch.me/*" ],
      "use_dynamic_url": true
    }
  ],
  // …
}
```

## Promises
V3 现在原生支持 Promise。许多常用 API 现在都支出，最终所有合适的 API 都会支持 Promise。

如果使用 callback，就不会返回 Promise，优先执行 callback。



