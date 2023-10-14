## popup
因为用户界面(popup.html)相当于日常浏览的网页，关闭之后就销毁了。

所以需要一个地方来存储。这里用按钮的点击事件来触发，把数据通过一直运行在后台的service worker来保存到本地。

* 在用户界面打开时连接service worker读取之前保存的数据，这样就做到了记录用户界面的数据。

* 当然，直接在popup.js存取本地数据也是可行的

### 在主文件夹(manifest.json同级文件夹)中新建一个popup.html文件
并在manifest.json中的action配置popup的路径
```json
"action":{
	"default_title":"Chrome插件",
	"default_popup":"popup.html"
}
```

```html
<!-- popup.html -->
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="css/popup.css" />
</head>
<body>
    <div class="btn">
        测试<input id="TEST" class="checkbtn" type="checkbox" />
    </div>
</body>
<script src="js/jquery.js"></script>
<script src="js/popup.js"></script>
</html>
```
