const mr = document.createElement('script');
mr.src = chrome.runtime.getURL('lib/moduleraid/moduleraid.iife.js');
document.head.appendChild(mr);

const s = document.createElement('script');
s.src = chrome.runtime.getURL('src/tweetdeck/paste-inject.js');
document.head.appendChild(s);