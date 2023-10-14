## Plasmo 修改 manifest.json 配置
`https://docs.plasmo.com/customization`

比如我们开发一个针对 http://xxxx.com 网页的插件，首先得申请权限 host_permissions

这部分配置写在了 package.json 中的 "manifest" 下。包括申请权限，注入资源都在 "manifest" 中去配置。
```json
{
	// ...
	"manifest": {
		"permissions":["declarativeNetRequest"], // 获取拦截网络请求的权限

		// 页面注入静态资源
		"web_accessible_resources": [
			{
				"resources": [
					"inject.js"
				],
				// 针对全部界面注入
				"matches": [
					"<all_urls>"
				]
			}
		],

		// 针对哪些页面生效
		"host_permissions": [
			"https://xxxx.com/*",
			"http://xxxx.com/*"
		]
	}
	// ...
}
```

有个例外就是 content.ts (注入到网页的那部分内容),正常的配置应该是这样的:
```json
"content_scripts": [
  {
    "matches": ["*://*.mozilla.org/*"],
    "js": ["content.js"]
  }
```

`https://github.com/PlasmoHQ/examples/blob/main/with-content-script/content.ts`

因为 content.ts 是动态入口，也就是说 content_scripts[0].js 的内容是框架去生成的，而不是我们自己手动填的
这也就造成了 content_scripts 的配置只能是写在 content.ts 这个页面中。这样 Plasmo 才能既知道入口路径，也知道对应的配置:
```js
// file - content.ts

import type { PlasmoContentScript } from "plasmo"

// 进行 content_scripts 的配置
export const config: PlasmoContentScript = {
  matches: ["https://www.plasmo.com/*"]
}

window.addEventListener("load", () => {
  console.log("content script loaded")

  document.body.style.background = "pink"
})

// 运行后出来的配置可能就是
// "content_scripts": [
//   {
//     "matches": ["https://www.plasmo.com/*"],
//     "js": ["content.[hash].js"]
//   }
// ]
```

### 就是这样的配置写完，那我岂不是只能写一个 content.ts ? 如果我想一个插件针对不用的站点做不同的操作呢？
去example找找模版就知道:

https://github.com/PlasmoHQ/examples/tree/main/with-many-content-scripts

这里提供了多个 content.ts 的示例，这样就能针对不同页面注入不同的 content.ts 了

