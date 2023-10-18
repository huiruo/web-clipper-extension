import { Storage } from '@plasmohq/storage';
import { ACTIONS } from '~common/action';
import { parsePreparedContent } from '~common/parser';
import type { MsgRes, TabInfo } from '~types';

async function setMessageToFrontEnd(type: keyof typeof ACTIONS | string, payload: any) {
  try {
    console.log('setMessageToFrontEnd', { type, payload })
    const data = await chrome.runtime.sendMessage(
      {
        type,
        payload,
      },
    );

    console.log('setMessageToFrontEnd', data)
    return data
  } catch (error) {
    console.log('send msg error', error)
  }
}

/**
 * Newly install or refresh the plug-in
 * */
chrome.runtime.onInstalled.addListener(() => {
  // TODO: test
  chrome.contextMenus.create({
    title: "Quick wiki for %s",
    contexts: ['selection'],
    id: 'myIdIsSoCool'
  })

  console.log('bgjs-start-',)
})

// not working when set pop.html
chrome.action.onClicked.addListener(() => {
  console.log('chrome.action.onClicked-->',)
})

/**
 * Receive and process events from each page
*/
chrome.runtime.onMessage.addListener((request: MsgRes<keyof typeof ACTIONS, any>, sender, sendResponse) => {
  (async () => {
    console.log('%c=onMessage.addListener', 'color:red', request)
    if (request.type === ACTIONS.QueryTab) {
      // const data = await API.getShortUrl(request.url);
      extensionSaveCurrentPage(request.payload)
      sendResponse({
        content: 'hello too',
      });
    }
  })();

  // return true;
});

async function extensionSaveCurrentPage(tabInfo: TabInfo) {
  /* clear any previous timers on each click */
  //  clearPreviousIntervalTimer(tabInfo.id) 
  console.log('extensionSaveCurrentPage', tabInfo)
  if (tabInfo.status !== 'complete') {
    // show message to user on page yet to complete load
    setMessageToFrontEnd(ACTIONS.TabNotComplete, {
      text: 'Page loading...',
    })
  } else {
    await savePage(tabInfo)
  }
}

async function savePage(tabInfo: TabInfo) {
  try {
    const res = await chrome.tabs.sendMessage(tabInfo.id, {
      type: ACTIONS.GetContent,
      payload: {},
    })

    console.log('%c=savePage 1:', 'color:green', { url:tabInfo.url, document:res.document })
    const document = await parsePreparedContent(tabInfo.url, res.document)
    console.log('%c=savePage document-2:', 'color:green', { document,content:document.content })
  } catch (error) {
    console.log('set tabs msg err:', error)
  }
}