/*

const mr = document.createElement('script');
mr.src = 'https://unpkg.com/moduleraid@6.0.0/dist/moduleraid.iife.js';
document.head.appendChild(mr);

const s = document.createElement('script');
s.textContent = `
let jquery;
document.addEventListener('paste', (e) => {
    if (!jquery) {
        jquery = new ModuleRaid().findConstructor('jquery:')[0][1];
    }
    if (e.clipboardData.types[0] !== 'Files') return;
    const files = [e.clipboardData.items[0].getAsFile()];
    jquery(document).trigger('uiFilesAdded', { files });
});
`;
document.head.appendChild(s);
*/
const mr = document.createElement('script');
mr.src = chrome.runtime.getURL('node_modules/moduleraid/dist/moduleraid.iife.js');
document.head.appendChild(mr);

const s = document.createElement('script');
s.src = chrome.runtime.getURL('src/tweetdeck/paste-inject.js');
document.head.appendChild(s);