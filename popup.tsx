import { useEffect, useState } from "react"
import { ACTIONS } from "~common/action"
import type { MsgRes, TabInfo } from "~types"

function IndexPopup() {
  const [currentUrl, setCurrentUrl] = useState<string>("")

  const sendTabToBg = async (tabInfo: TabInfo) => {
    try {
      const data = await chrome.runtime.sendMessage(
        {
          type: ACTIONS.QueryTab,
          payload: tabInfo,
        },
      );

      console.log('sendTabToBg-res', data)
    } catch (error) {
      console.error(error);
    }
  }

  const getCurrentUrl: () => Promise<void> = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })

    const { hostname } = new URL(tab.url)
    const [_, sld, tld] = hostname.split(".")
    const domain = `${sld}.${tld}`

    await sendTabToBg(tab as TabInfo)

    console.log('getCurrentUrl:', { tab, domain })
    setCurrentUrl(tab.url)
  }

  const onSendToBg = async () => {
    /*
    try {
      const data = await chrome.runtime.sendMessage(
        {
          type: 'getShortUrl',
          url: 'test',
        },
      );
      console.log('onSendToBg--', data)
    } catch (error) {
      console.error(error);
    }
    */

    getCurrentUrl()
  };

  useEffect(() => {
    console.log('===init====',)
    chrome.runtime.onMessage.addListener((request: MsgRes<keyof typeof ACTIONS,any>,sender, sendResponse) => {
      console.log('%c=popup.tsx-evnet:','color:red',request)
      if (request.type === ACTIONS.TabNotComplete) {
        // Todo
        console.log('%c=event1-TabNotComplete','color:red',)
      } else if(request.type === ACTIONS.GetContent){
        console.log('%c=event2-GetContent','color:red',)
        // sendResponse({ data: 'test' })
        return Promise.resolve({ response: "Hi from content script" });
      }

      return true
    })

    // getCurrentUrl()
  }, [])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: '400px'
      }}>
      your currentUrl is: {currentUrl}

      <button onClick={onSendToBg}>
        Send To Bg
      </button>
    </div>
  )
}

export default IndexPopup
