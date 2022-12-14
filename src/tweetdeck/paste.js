const mr = document.createElement('script');
mr.src = 'https://unpkg.com/moduleraid/dist/moduleraid.umd.js';
document.head.appendChild(mr);

const s = document.createElement('script');
s.textContent = `
let jquery;
document.addEventListener('paste', (e) => {
    if (!jquery) {
        console.log('init');
        jquery = new moduleraid().findConstructor('jquery:')[0][1];
    }
    if (e.clipboardData.types[0] !== 'Files') return console.log('no');
    console.log('paste');
    const files = [e.clipboardData.items[0].getAsFile()];
    jquery(document).trigger('uiFilesAdded', { files });
});
`;
document.head.appendChild(s);
