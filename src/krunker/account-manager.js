const menuWindow = document.getElementById('menuWindow');

function getAccountsObject() {
    return JSON.parse(localStorage.getItem('accounts') || '{}');
}

function addAccount(username, password) {
    if (!username || !password) return;
    const accounts = getAccountsObject();
    accounts[username] = btoa(password);
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

function createAccountListElement() {
    removeAccountListElement();

    const div = document.createElement('div');
    div.id = 'account-list';
    const accounts = getAccountsObject();
    Object.keys(accounts).forEach(username => {
        const usernameElem = document.createElement('div');
        usernameElem.appendChild(document.createTextNode(username));
        usernameElem.addEventListener('click', () => {
            document.getElementById('accName').value = username;
            document.getElementById('accPass').value = atob(accounts[username]);
        });
        div.appendChild(usernameElem);
    });

    menuWindow.firstChild.appendChild(div);
}

function removeAccountListElement() {
    const elem = document.getElementById('account-list');
    if (elem) elem.remove();
}

function createAddButtonElement() {
    const addButton = document.createElement('div');
    addButton.classList.add('accBtn', 'button', 'buttonG');
    addButton.appendChild(document.createTextNode('Add'));
    addButton.addEventListener('click', () => {
        const username = document.getElementById('accName').value;
        const password = document.getElementById('accPass').value;
        addAccount(username, password);
        createAccountListElement();
    });
    menuWindow.firstChild.lastChild.appendChild(addButton);
}

const observer = new MutationObserver(() => {
    if (document.getElementById('windowHeader').innerText !== 'Account' || !menuWindow.firstChild.lastChild) return;
    createAddButtonElement();
    createAccountListElement();
});
observer.observe(menuWindow, { childList: true });