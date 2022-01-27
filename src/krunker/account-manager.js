const menuWindow = document.getElementById('menuWindow');

function getAccountsObject() {
    return JSON.parse(localStorage.getItem('accounts') || '{}');
}

function setAccountsObject(obj) {
    localStorage.setItem('accounts', JSON.stringify(obj));
}

function addAccount(username, password) {
    if (!username || !password) return;
    const accounts = getAccountsObject();
    accounts[username] = btoa(password);
    setAccountsObject(accounts);
}

function removeAccount(username) {
    if (!username) return;
    const accounts = getAccountsObject();
    delete accounts[username];
    setAccountsObject(accounts);
}

function createAccountListElement() {
    removeAccountListElement();

    const accountListElem = document.createElement('div');
    menuWindow.firstChild.appendChild(accountListElem);
    accountListElem.id = 'account-list';

    const accounts = getAccountsObject();
    Object.keys(accounts).forEach(username => {
        const itemElem = document.createElement('div');
        accountListElem.appendChild(itemElem);
        itemElem.style.display = 'flex';

        const usernameElem = document.createElement('div');
        itemElem.appendChild(usernameElem);
        usernameElem.appendChild(document.createTextNode(username));
        usernameElem.addEventListener('click', () => {
            document.getElementById('accName').value = username;
            document.getElementById('accPass').value = atob(accounts[username]);
        });

        const removeButton = document.createElement('div');
        itemElem.appendChild(removeButton);
        removeButton.classList.add('material-icons');
        removeButton.style.marginLeft = 'auto';
        removeButton.style.color = '#ed4242';
        removeButton.appendChild(document.createTextNode('delete_forever'));
        removeButton.addEventListener('click', () => {
            removeAccount(username);
            createAccountListElement();
        });
    });
}

function removeAccountListElement() {
    const elem = document.getElementById('account-list');
    if (elem) elem.remove();
}

function createAddButtonElement() {
    const addButton = document.createElement('div');
    menuWindow.firstChild.lastChild.appendChild(addButton);
    addButton.classList.add('accBtn', 'button', 'buttonG');
    addButton.appendChild(document.createTextNode('Add'));
    addButton.addEventListener('click', () => {
        const username = document.getElementById('accName').value;
        const password = document.getElementById('accPass').value;
        addAccount(username, password);
        createAccountListElement();
    });
}

const observer = new MutationObserver(() => {
    if (document.getElementById('windowHeader').innerText !== 'Account' || !menuWindow.firstChild.lastChild) return;
    createAddButtonElement();
    createAccountListElement();
});
observer.observe(menuWindow, { childList: true });