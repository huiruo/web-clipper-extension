import { Storage } from '@plasmohq/storage';

export { }

// Newly install or refresh the plug-in
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Quick wiki for %s",
    contexts: ['selection'],
    id: 'myIdIsSoCool'
  })
})

// Receive and process events from each page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	(async () => {
		if (request.type === 'getShortUrl') {
			const data = await API.getShortUrl(request.url);
			sendResponse({
				content: data?.content ?? '',
			});
		}
	})();

	return true;
});

// storage
/*
// set
chrome.storage.local.set({
  equation: '',
  result: ''
}).then(()=>{

})

// get
chrome.storage.local.get([
  'equation',
  'result'
]).then((res)=>{
  console.log('res:',res)
})
*/
