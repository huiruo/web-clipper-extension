### **简介：**

Mac 自带 Python2.7 版本，可以在终端输入 python 进入 python 编译模式。如果要安装 Python3 需要手动安装「本文以 Python3.7 为例进行讲解」。

### **安装**

### **方式一：**

1\. 在终端输入: brew install python3

2\. 等待自动安装完成，再进行配置

**方式二：**

1\. 官网：[https://www.python.org/downloads/](https://link.zhihu.com/?target=https%3A//www.python.org/downloads/)

2\. 下载对应版本，一路默认安装，安装完成如下图：

![](https://pic4.zhimg.com/v2-d788a60a86a120dd64659f819f9fd8af_b.jpg)

3\. 安装完成，在终端输入: python，还是之前默认版本，需要该配置才能更新为最新版本

### **配置**

1\. 在终端输入：which python3.7，可查看快捷方式存在的路径，如图

![](https://pic2.zhimg.com/v2-3b498672ba632c969f8e04ef99a64621_b.png)

2\. 安装路径：/Library/Frameworks/Python.framework

![](https://pic1.zhimg.com/v2-543f6d753b6780eab986edc3ee95a828_b.jpg)

3\. 终端输入：vi ~/.bash\_profile

4\. 直接 vi 打开进行编辑，编辑完保存

5\. 中断输入：source ~/.bash\_profile

6\. 终端再次输入：python ，查看默认版本为 3.7

![](https://pic4.zhimg.com/v2-4e8076ab927b57272a8e78f674259ec7_b.jpg)

7\. 查看 Python 版本

![](https://pic2.zhimg.com/v2-aac8fefdaeb3f04b60982e215ab97261_b.jpg)

8\. pip 查看版本

![](https://pic2.zhimg.com/v2-e0ff3a1d827903d5a33539d7e4577781_b.png)

### **卸载 Python**

1\. Python3 安装完后，在系统中不同目录下存在各种依赖关系，若需卸载，需要一步步无残留完全卸载干净。

2\. 删除Python 3.7 框架，打开终端，输入

sudo rm -rf /Library/Frameworks/Python.framework/Versions/3.7

3\. 删除 Python 3.7 应用目录

cd /Applications

sudo rm -rf Python 3.7

4\. 删除/usr/local/bin 目录下指向的Python3.7 的连接

cd /usr/local/bin/

ls -l /usr/local/bin

rm Python3.7相关的文件和链接

#Python3.7相关的文件和链接需要自行确认是否删除

5\. 删除 Python 的环境路径

vi ~/.bash\_profile

6\. 确认python 是否已经删除

python3.7

\-bash: python3.7: command not found

* * *

至此，Python 3.7 安装及卸载都讲完了，大家可以试试了。