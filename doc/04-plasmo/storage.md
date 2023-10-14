## @plasmohq/storage
https://docs.plasmo.com/framework-api/storage

https://juejin.cn/post/7138820996840030215

@plasmohq/storage 是一个来自 plasmo 的实用程序库，它抽象了浏览器扩展可用的持久存储 API。当扩展存储 API 不可用时，它会回退到本地存储，允许在弹出窗口 - 选项 - 内容 - 背景之间进行状态同步。
官网还说了一句，如果使用了这个库，配置会自动把 storage 的权限加上

我觉得还是挺好的，这样依赖抹平了不同平台之间存储的差异，也做了保底方案


## 如果一定要说框架有帮我们处理什么兼容问题，那可能就是本地存储了
提供了 @plasmohq/storage 抹平各个平台的存储api差异，还提供了快捷的方式然我们更新本地存储的内容