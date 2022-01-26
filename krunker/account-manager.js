const menuWindow = document.getElementById('menuWindow')

function addAccount(username, password) {
    if (!username || !password) return
    const accounts = JSON.parse(localStorage.getItem('accounts') || '{}')
    accounts[username] = btoa(password)
    localStorage.setItem('accounts', JSON.stringify(accounts))

    initAccountList()
}

function initAccountList() {
    const old = document.getElementById('account-list')
    if (old) old.remove()
    const div = document.createElement('div')
    div.id = 'account-list'
    const accounts = JSON.parse(localStorage.getItem('accounts') || '{}')
    Object.keys(accounts).forEach(username => {
        const usernameElem = document.createElement('div')
        usernameElem.appendChild(document.createTextNode(username))
        usernameElem.addEventListener('click', () => {
            document.getElementById('accName').value = username
            document.getElementById('accPass').value = atob(accounts[username])
        })
        div.appendChild(usernameElem)
    })

    menuWindow.firstChild.appendChild(div)
}

const observer = new MutationObserver(() => {
    if (document.getElementById('windowHeader').innerText !== 'Account') return

    // Add Button
    const addButton = document.createElement('div')
    addButton.classList.add('accBtn', 'button', 'buttonG')
    addButton.appendChild(document.createTextNode('Add'))
    addButton.addEventListener('click', () => {
        const username = document.getElementById('accName').value
        const password = document.getElementById('accPass').value
        addAccount(username, password)
    })
    menuWindow.firstChild.lastChild.appendChild(addButton)

    // Account List
    initAccountList()
})
observer.observe(menuWindow, { childList: true })