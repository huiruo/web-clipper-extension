import { useEffect, useState } from "react"
import { ACTIONS } from "~common/action"
import type { TabInfo } from "~types"

function IndexPopup() {
  const [currentUrl, setCurrentUrl] = useState<string>("")

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

  const sendTabToBg = async (tabInfo: TabInfo) => {
    try {
      const data = await chrome.runtime.sendMessage(
        {
          type: ACTIONS.QueryTab,
          result: tabInfo,
        },
      );

      console.log('sendTabToBg-res', data)
    } catch (error) {
      console.error(error);
    }
  }

  const onSendToBg = async () => {
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
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener((info) => {
      console.log('popup.tsx-effect:', info, '--', info.type, info.text)
      if (info.type === 'event1') {
        // Todo
      }

      return true
    })

    getCurrentUrl()
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
