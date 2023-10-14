export { }

// const bg = chrome.extension.getBackgroundPage();
console.log('bgjs-hello6')

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Quick wiki for %s",
    contexts: ['selection'],
    id: 'myIdIsSoCool'
  })
})

// chrome.contextMenus.onClicked.addListener((info,tab)=>{
//   console.log('info,tab',{ info,tab })
// })


// browserActionApi.onClicked.addListener(handleActionClick)

console.log('test:', { chrome, runtime: chrome.runtime })

// chrome.tabs.onActivated(
//   (info)=>{
//   console.log('browserAction.onClicked:',{ info })
// }
// )

// chrome.tabs.onActivated.addListener(activeInfo => {
//   const { tabId } = activeInfo;
//   console.log('tabs.onActivated',activeInfo)
// });

// 接收到popup
chrome.runtime.onConnect.addListener(function (port) {
  console.log('port:',port)
  /*
  port.onMessage.addListener(function (receivedMsg) { // 监听popup发来的内容receivedMsg
    if (receivedMsg.fromPopup && receivedMsg.fromPopup == 'getDB') { // 如果接收到了getDB，这里读取数据并返回相当于初始化popup页面
      DBdata('get', function (res) {
        port.postMessage(res.LocalDB); // 发送到popup
      });
    } else { // 如果不是，则说明是收到来自popup手动点击设置的数据，存入以用于popup打开时展示
      DBdata('set', '', receivedMsg)
    }
  })
  */
});
