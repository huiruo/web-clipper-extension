import { Storage } from '@plasmohq/storage';
import { ACTIONS } from '~common/action';
import type { MsgRes } from '~types';

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
      sendResponse({
        content: 'hello too',
      });
    }
  })();

  return true;
});
