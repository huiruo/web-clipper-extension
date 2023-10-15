import type { PlasmoCSConfig } from "plasmo"

import { useStorage } from "@plasmohq/storage/hook"
import { useEffect } from "react"
import { ACTIONS } from "~common/action"
import type { MsgRes } from "~types"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

// Idea for an UI API, for popup, notification badge, or mounting UI
// Idea for static mount
// Idea for styling injection support (inline or with custom emotion cache)

// export const getRootContainer = () => {
//   return document.querySelector("body")
// }

const PlasmoOverlay = () => {
  const [openCount] = useStorage<number>("open-count")
  const [checked] = useStorage<boolean>("checked")
  const [serialNumber] = useStorage<string>("serial-number")

  useEffect(() => {
    console.log('===content.tsx-init====',)
    chrome.runtime.onMessage.addListener((request: MsgRes<keyof typeof ACTIONS,any>,sender, sendResponse) => {
      console.log('%c=content.tsx-evnet:','color:red',request)
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
  }, [])

  return (
    <span
      style={{
        padding: 12
      }}>
      <h1>HELLO WORLD ROOT CONTAINER</h1>
      <input
        type={"checkbox"}
        readOnly
        checked={checked === undefined ? true : checked}
      />
      <p>
        Open: {openCount}
        <i>#{serialNumber}</i>
      </p>
    </span>
  )
}

export default PlasmoOverlay
