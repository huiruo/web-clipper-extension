## service_worker
service_worker 非常特殊，这是一直伴随插件运行的后台脚本，它没有前端页面，不支持dom，所以没法引入jquey和其他js

所有需要保持运行的脚本都要直接写在background.js里，同样他也不支持XMLHttpRequest，因此需要使用fetch来代替xhr请求。

```js
// background.js
chrome.runtime.onInstalled.addListener(() => {
    // 清除插件保存的本地数据
    DBdata("clear");
});

// 插件用的数据都存储在storage.local中
function DBdata(mode,callback,data){
  // 操作本地存储的函数
  if(mode=="set"){ // 保存本地数据
      console.log('set-LocalDB');
      chrome.storage.local.set({LocalDB: data});
  }else if(mode=="get"){ // 获取
      chrome.storage.local.get('LocalDB', function(response) {
          typeof callback == 'function' ? callback(response) : null;
      });
  }else if(mode=="clear"){ // 清空
      chrome.storage.local.clear();
  }
}
```

## popup.js
```js
window.bgCommunicationPort = chrome.runtime.connect();//初始化bgCommunicationPort
$(".checkbtn").click(function(){
	bgCommunicationPort.postMessage({//发送到bg,键值可以自由设置
        Direct : $(this).attr('id'),//目标
        Content : '测试内容',//内容
		step : 0//步骤
    });
});

$(document).ready(function(){//打开popup时触发，读取之前存储的参数
	bgCommunicationPort.postMessage({fromPopup:'getDB'});//向background发送消息
	bgCommunicationPort.onMessage.addListener(function(receivedPortMsg) {//监听background
		console.log(receivedPortMsg);//这是background发来的内容
		if(receivedPortMsg&&receivedPortMsg.Direct){
			$(".checkbtn").prop({'checked': false});//初始化按钮
			$("#"+receivedPortMsg.Direct).prop({'checked': true});
		}
	});
});
```

## content部分:content可以注入浏览的网页，使用得当可以做出很多功能。
整个运行过程是：
匹配的网页刷新触发content的getDB，发送到bg
bg接收到content发来的getDB的消息，bg获取本地数据，如果是用户界面上勾选的TEST按钮，就发送到content
content接收到bg发来的消息，如果是TEST，则console 123123

和popup一样，content也是可以直接读取本地存储而不用来回连接搞得那么麻烦，这里是展示content和bg的连接代码。

manifest.json中加入content的配置：
```js
"content_scripts":[{
	"js":["js/jquery.js","js/content.js"],/*content可以随意引入js，因为其内容会在浏览的网页上直接运行*/
	"matches":["*://localhost/*"],/*在哪些网页上运行*/
	"run_at":"document_end"/* 在页面加载完成时运行 */
}]


//content.js   manifest匹配地址的页面在刷新时会直接执行这里的代码
chrome.runtime.sendMessage(chrome.runtime.id, {//当页面刷新时发送到bg
    fromContent: 'getDB'
});


// bg中加入监听content的代码
chrome.runtime.onMessage.addListener(function(senderRequest) {
    console.log('demo已运行');
    var LocalDB=senderRequest.LocalDB;
    console.log(LocalDB);
    switch(LocalDB.Direct){
        case 'TEST':
            console.log(123123);
        break;
    }
});



// bg中加入监听content的代码
//background.js
chrome.runtime.onMessage.addListener(function(senderRequest) {//接收到content
	sendResponse({msg: '接收到content'});
    console.log(senderRequest);
    if(senderRequest.fromContent&&senderRequest.fromContent=='getDB'){//接收到fromContent:getDB
        DBdata('get',function(res){//从本地取数据
            if(res.LocalDB){
                var LocalDB=res.LocalDB;
                switch(LocalDB.Direct){
                	//如果是存入的TEST按钮
                    case 'TEST':
                        chrome.tabs.query({
                            active: true, 
                            currentWindow: true
                        }, function(tabs){
                            chrome.tabs.sendMessage(tabs[0].id, {LocalDB: LocalDB});//发送到content		
                        });
                    break;
                }
            }
        });
    }
});
```