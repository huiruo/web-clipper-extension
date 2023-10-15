import type { PlasmoCSConfig } from "plasmo"

import { useStorage } from "@plasmohq/storage/hook"
import { useEffect } from "react"
import { ACTIONS } from "~common/action"
import type { MsgRes } from "~types"
import { prepareContent } from "~content/prepare-content"

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
    console.log('===content.tsx-init====',)
    chrome.runtime.onMessage.addListener((request: MsgRes<keyof typeof ACTIONS, any>, sender, sendResponse) => {
      if (request.type === ACTIONS.GetContent) {
        console.log('%c=content2-GetContent:', 'color:red', request)
        prepareContent().then((content) => {
          console.log('GetContent:', content)
          sendResponse({ content })
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
