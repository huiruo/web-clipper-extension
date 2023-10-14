## 是插件注入到页面的脚本
content script 可以操作 DOM，但是它和页面其他的脚本是隔离的，访问不到其他脚本定义的变量、函数等，相当于运行在单独的沙盒里。

content script 可以调用有限的 chrome 插件 API，通知到 background script ，实现网络请求。

正常的配置应该是这样的
```json
"content_scripts": [
  {
    "matches": ["*://*.mozilla.org/*"],
    "js": ["content.js"]
  }
```