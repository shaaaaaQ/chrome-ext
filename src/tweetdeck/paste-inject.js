let jquery;
document.addEventListener('paste', (e) => {
    if (!jquery) {
        jquery = new ModuleRaid().findConstructor('jquery:')[0][1];
    }
    if (e.clipboardData.types[0] !== 'Files') return;
    const files = [e.clipboardData.items[0].getAsFile()];
    jquery(document).trigger('uiFilesAdded', { files });
});