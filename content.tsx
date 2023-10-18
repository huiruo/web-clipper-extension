import type { PlasmoCSConfig } from "plasmo"

import { useStorage } from "@plasmohq/storage/hook"
import { useEffect } from "react"
import { ACTIONS } from "~common/action"
import type { MsgRes } from "~types"
import { prepareContent } from "~content/prepare-content"
import TurndownService from 'turndown';


// Idea for an UI API, for popup, notification badge, or mounting UI
// Idea for static mount
// Idea for styling injection support (inline or with custom emotion cache)

// export const getRootContainer = () => {
//   return document.querySelector("body")
// }

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

const PlasmoOverlay = () => {

  useEffect(() => {
    const testStr = '<DIV class="page" id="readability-page-1"><div><div><h2 id="bc34" data-selectable-paragraph="">Trouble can come in fast</h2><div><a rel="noopener follow" href="chrome-extension://phipndgalcajoficeoeiligpgapnogjp/@acecreates?source=post_page-----bf190f2246c6--------------------------------"><div aria-hidden="false" aria-describedby="3" aria-labelledby="3"><p><img alt="George “Ace” Acevedo" src="https://miro.medium.com/v2/resize:fill:88:88/1*-ZOAO8NNryvt9mtriHAa-A.jpeg" width="44" height="44" loading="lazy" data-testid="authorPhoto"></p></div></a><a href="https://medium.com/illumination?source=post_page-----bf190f2246c6--------------------------------" rel="noopener follow"><div aria-hidden="false" aria-describedby="4" aria-labelledby="4"><p><img alt="ILLUMINATION" src="https://miro.medium.com/v2/resize:fill:48:48/1*AZxiin1Cvws3J0TwNUP2sQ.png" width="24" height="24" loading="lazy" data-testid="publicationPhoto"></p></div></a></div></div><figure><div tabindex="0" role="button"><picture><source srcset="https://miro.medium.com/v2/resize:fit:640/format:webp/1*U8po6qauvi3sHxzeXsTEXg.jpeg 640w, https://miro.medium.com/v2/resize:fit:720/format:webp/1*U8po6qauvi3sHxzeXsTEXg.jpeg 720w, https://miro.medium.com/v2/resize:fit:750/format:webp/1*U8po6qauvi3sHxzeXsTEXg.jpeg 750w, https://miro.medium.com/v2/resize:fit:786/format:webp/1*U8po6qauvi3sHxzeXsTEXg.jpeg 786w, https://miro.medium.com/v2/resize:fit:828/format:webp/1*U8po6qauvi3sHxzeXsTEXg.jpeg 828w, https://miro.medium.com/v2/resize:fit:1100/format:webp/1*U8po6qauvi3sHxzeXsTEXg.jpeg 1100w, https://miro.medium.com/v2/resize:fit:1400/format:webp/1*U8po6qauvi3sHxzeXsTEXg.jpeg 1400w" sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px" type="image/webp"><source data-testid="og" srcset="https://miro.medium.com/v2/resize:fit:640/1*U8po6qauvi3sHxzeXsTEXg.jpeg 640w, https://miro.medium.com/v2/resize:fit:720/1*U8po6qauvi3sHxzeXsTEXg.jpeg 720w, https://miro.medium.com/v2/resize:fit:750/1*U8po6qauvi3sHxzeXsTEXg.jpeg 750w, https://miro.medium.com/v2/resize:fit:786/1*U8po6qauvi3sHxzeXsTEXg.jpeg 786w, https://miro.medium.com/v2/resize:fit:828/1*U8po6qauvi3sHxzeXsTEXg.jpeg 828w, https://miro.medium.com/v2/resize:fit:1100/1*U8po6qauvi3sHxzeXsTEXg.jpeg 1100w, https://miro.medium.com/v2/resize:fit:1400/1*U8po6qauvi3sHxzeXsTEXg.jpeg 1400w" sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px"><img alt="" width="700" height="700" loading="eager" role="presentation" src="https://miro.medium.com/v2/resize:fit:1400/1*U8po6qauvi3sHxzeXsTEXg.jpeg"></picture></div><figcaption data-selectable-paragraph="">Photo by Author</figcaption></figure><h2 id="1257" data-selectable-paragraph="">The first day of dealing with a loved one dying may be the most challenging time of your life.</h2><p id="784e" data-selectable-paragraph="">The grief and sadness hit hard.</p><p id="0024" data-selectable-paragraph="">Despite your feelings, there are obvious things that need to be done right away. You may need to call 911. Then, the mortuary needs to be called. The family needs to be notified.</p><p id="f744" data-selectable-paragraph="">Even though they’re difficult, you do them because they are important and necessary.</p><p id="24d0" data-selectable-paragraph="">However, it’s also essential for someone to remain clear-headed enough to take care of a few things you might not think of. Some of these I learned the hard way after helping a few friends and family members through hospice.</p><p id="0d6c" data-selectable-paragraph="">For example, my mother-in-law Elaine’s identity was hacked three days after she passed because of her home nurse.</p><p id="681d" data-selectable-paragraph=""><mark><strong>The first thing to do is find their book of passwords, if they have one, and hide or remove it from the house.</strong></mark></p><p id="8793" data-selectable-paragraph="">This one thing alone can prevent a lot of havoc. Elaine’s password book disappeared the day she died. The hospice nurse took it and then passed it on to others, who proceeded to get into her Apple ID account to order iPads.</p><p id="3d07" data-selectable-paragraph="">The thieves also tried to open several credit cards since they now had access to her information.</p><p id="d2f3" data-selectable-paragraph="">You may be wondering how they bypassed the two-factor authentication. Well, the password book included the login for Elaine’s cell phone carrier, which enabled them to transfer her phone number to one of their phones.</p><p id="a50c" data-selectable-paragraph="">My wife and I figured out something was happening when Elaine’s phone showed no service.</p><p id="480d" data-selectable-paragraph="">This leads me to another thing to do.</p><p id="2691" data-selectable-paragraph=""><strong>Take control of their phone, and don’t let anyone see or take it.</strong></p><p id="a917" data-selectable-paragraph="">Many people keep the line active for a couple of weeks, and that’s fine, but the phone should only be in the hands of one trustworthy person.</p><p id="0425" data-selectable-paragraph="">Similarly, if they have a desk computer, unplug everything immediately. If it’s a laptop, treat it the same as their phone. Unplug it and put it in a safe place until you’re ready…</p></div></DIV>'
    const testStr2 = '<DIV class="page" id="readability-page-1"><div options="[object Object]"><h3 data-first-child=""><b>简介：</b></h3><p data-pid="7QuSEqdf">Mac 自带 Python2.7 版本，可以在终端输入 python 进入 python 编译模式。如果要安装 Python3 需要手动安装「本文以 Python3.7 为例进行讲解」。</p><h3><b>安装</b></h3><h3><b>方式一：</b></h3><p data-pid="XiUvEh_j">1. 在终端输入: brew install python3</p><p data-pid="uytP7xMb">2. 等待自动安装完成，再进行配置</p><p data-pid="vF9BgyKh"><b>方式二：</b></p><p data-pid="7e4zsi37">1. 官网：<a href="https://link.zhihu.com/?target=https%3A//www.python.org/downloads/" target="_blank" rel="nofollow noreferrer" data-za-detail-view-id="1043"><span>https://www.</span><span>python.org/downloads/</span><span></span></a></p><p data-pid="OBhWEoAC">2. 下载对应版本，一路默认安装，安装完成如下图：</p><figure data-size="normal"><p><img src="https://pic4.zhimg.com/v2-d788a60a86a120dd64659f819f9fd8af_b.jpg" data-caption="" data-size="normal" data-rawwidth="410" data-rawheight="152" width="410" data-actualsrc="https://pic4.zhimg.com/v2-d788a60a86a120dd64659f819f9fd8af_b.jpg" data-original-token="v2-64b949c51ad9cea5cf8272341b161a03" height="152" data-lazy-status="ok"></p></figure><p data-pid="VvsZ6KMR">3. 安装完成，在终端输入: python，还是之前默认版本，需要该配置才能更新为最新版本</p><h3><b>配置</b></h3><p data-pid="37zuTx83">1. 在终端输入：which python3.7，可查看快捷方式存在的路径，如图</p><figure data-size="normal"><p><img src="https://pic2.zhimg.com/v2-3b498672ba632c969f8e04ef99a64621_b.png" data-caption="" data-size="small" data-rawwidth="264" data-rawheight="35" width="264" data-actualsrc="https://pic2.zhimg.com/v2-3b498672ba632c969f8e04ef99a64621_b.png" data-original-token="v2-3b498672ba632c969f8e04ef99a64621" height="35" data-lazy-status="ok"></p></figure><p data-pid="BOi_CS7v">2. 安装路径：/Library/Frameworks/Python.framework</p><figure data-size="normal"><p><img src="https://pic1.zhimg.com/v2-543f6d753b6780eab986edc3ee95a828_b.jpg" data-caption="" data-size="small" data-rawwidth="297" data-rawheight="122" width="297" data-actualsrc="https://pic1.zhimg.com/v2-543f6d753b6780eab986edc3ee95a828_b.jpg" data-original-token="v2-0ef6454ec20a43f8c72392306ad0a7e0" height="122" data-lazy-status="ok"></p></figure><p data-pid="8cWJSXW9">3. 终端输入：vi ~/.bash_profile</p><p data-pid="zUeQyF6t">4. 直接 vi 打开进行编辑，编辑完保存</p><p data-pid="y8G_YhpE">5. 中断输入：source ~/.bash_profile</p><p data-pid="x5XaJmdF">6. 终端再次输入：python ，查看默认版本为 3.7</p><figure data-size="normal"><p><img src="https://pic4.zhimg.com/v2-4e8076ab927b57272a8e78f674259ec7_b.jpg" data-caption="" data-size="normal" data-rawwidth="415" data-rawheight="114" width="415" data-actualsrc="https://pic4.zhimg.com/v2-4e8076ab927b57272a8e78f674259ec7_b.jpg" data-original-token="v2-72bd12e4ce91bce5c1c466b9b9692840" height="114" data-lazy-status="ok"></p></figure><p data-pid="WDGk0oqF">7. 查看 Python 版本</p><figure data-size="normal"><p><img src="https://pic2.zhimg.com/v2-aac8fefdaeb3f04b60982e215ab97261_b.jpg" data-caption="" data-size="small" data-rawwidth="290" data-rawheight="71" width="290" data-actualsrc="https://pic2.zhimg.com/v2-aac8fefdaeb3f04b60982e215ab97261_b.jpg" data-original-token="v2-44ac812700744f00e5f481168677b9ad" height="71" data-lazy-status="ok"></p></figure><p data-pid="CQG0CtF9">8. pip 查看版本</p><figure data-size="normal"><p><img src="https://pic2.zhimg.com/v2-e0ff3a1d827903d5a33539d7e4577781_b.png" data-caption="" data-size="normal" data-rawwidth="415" data-rawheight="20" width="415" data-actualsrc="https://pic2.zhimg.com/v2-e0ff3a1d827903d5a33539d7e4577781_b.png" data-original-token="v2-e0ff3a1d827903d5a33539d7e4577781" height="20" data-lazy-status="ok"></p></figure><h3><b>卸载 Python</b></h3><p data-pid="PyNYSfTP">1. Python3 安装完后，在系统中不同目录下存在各种依赖关系，若需卸载，需要一步步无残留完全卸载干净。</p><p data-pid="imICdstc">2. 删除Python 3.7 框架，打开终端，输入</p><p data-pid="bYmReGsk">       sudo rm -rf /Library/Frameworks/Python.framework/Versions/3.7</p><p data-pid="EgXwKX1g">3. 删除 Python 3.7 应用目录</p><p data-pid="e7JB17_j">      cd /Applications</p><p data-pid="rAugNgnB">      sudo rm -rf Python 3.7</p><p data-pid="IxVexPqz">4. 删除/usr/local/bin 目录下指向的Python3.7 的连接</p><p data-pid="LfkKo4P_">      cd /usr/local/bin/</p><p data-pid="HqptEvbZ">      ls -l /usr/local/bin</p><p data-pid="O2izrf3Y">      rm Python3.7相关的文件和链接</p><p data-pid="YMOeiO4m">      #Python3.7相关的文件和链接需要自行确认是否删除</p><p data-pid="qYBbL4VL">5. 删除 Python 的环境路径</p><p data-pid="NcbWq2sO">       vi ~/.bash_profile</p><p data-pid="oYM9jp0v">6. 确认python 是否已经删除</p><p data-pid="Tn4IgP-1">       python3.7</p><p data-pid="n68F0qK5">       -bash: python3.7: command not found</p><hr><p data-pid="jBecb8-T">至此，Python 3.7 安装及卸载都讲完了，大家可以试试了。</p></div></DIV>'
    const turndownService = new TurndownService();
    const markdownContent = turndownService.turndown(testStr);
    console.log('%c=savePage end-3:', 'color:yellow', { markdownContent })
    console.log('===content.tsx-init====',)

    chrome.runtime.onMessage.addListener((request: MsgRes<keyof typeof ACTIONS, any>, sender, sendResponse) => {
      if (request.type === ACTIONS.GetContent) {
        console.log('%c=content2-GetContent:', 'color:red', request)
        prepareContent().then((document) => {
          console.log('GetContent:', document)
          sendResponse({ document })
        }).catch((error) => {
          console.log('prepare error', error)
        })
      }

      return true
    })
  }, [])

  return (
    <div />
  )
}

export default PlasmoOverlay
