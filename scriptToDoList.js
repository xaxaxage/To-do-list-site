window.onload = () => {
    const tasksDiv = document.querySelector('.tasks')
    try {
        const storage = JSON.parse(localStorage.storage)
        const storageSuc = JSON.parse(localStorage.storageSuc)
        for (let i = 0; i < Object.keys(storage).length; i++) {
            if (Object.keys(storageSuc).includes(Object.keys(storage)[i])) continue

            const newDiv = document.createElement('div')
            const newP = document.createElement('p')
            const newSuccesButton = document.createElement('button')
            const newDeleteButton = document.createElement('button') 

            if (Object.keys(storage)[i].length > 8) {
                newP.style.fontSize = '120px'
                newP.style.top = '5px'
            }
            if (Object.keys(storage)[i].length > 10) {
                newP.style.fontSize = '97px'
                newP.style.top = '20px'
            }
            if (Object.keys(storage)[i].length > 12) {
                newP.style.fontSize = '85px'
                newP.style.top = '30px'
            }

            newSuccesButton.classList.add('succesButton')
            newSuccesButton.textContent = '✓'
            newDeleteButton.classList.add('deleteButton')
            newDeleteButton.textContent = '🗑️'
            newDiv.appendChild(newSuccesButton)
            newDiv.appendChild(newDeleteButton)
            newP.textContent = Object.keys(storage)[i]
            newP.classList.add('newP')
            newDiv.appendChild(newP)
            tasksDiv.appendChild(newDiv)
        }
    } catch(err) {console.log(err)}

    if (!localStorage.getItem('storage')) localStorage.setItem('storage', 'false')
    if (!localStorage.getItem('storageSuc')) localStorage.setItem('storageSuc', 'false')

    const addButton = document.getElementById('addButton')
    const thingToDo = document.getElementById('input')
    const succesButtons = document.getElementsByClassName('succesButton')
    const deleteButtons = document.getElementsByClassName('deleteButton')
    const divcap = document.getElementsByClassName('cap')[0]
    const div = document.getElementsByClassName('tasksdiv')[0]
    const divsuc = document.getElementsByClassName('succesdiv')[0]

    addButton.onclick = () => {
        const thingValue = thingToDo.value
        thingToDo.value = ''
        if (thingValue.length > 14) {
            alert('Text is too long!')
            return 
        }
        if (thingValue.length === 0) {
            alert('Type text!')
            return 
        }
        try { 
            if (thingValue in JSON.parse(localStorage.storage)) {
                alert('You are already have such thing')
                return
            }
        } catch {null}
        
        const newDiv = document.createElement('div')
        const newP = document.createElement('p')
        const newSuccesButton = document.createElement('button')
        const newDeleteButton = document.createElement('button')

        if (thingValue.length > 8) {
            newP.style.fontSize = '120px'
            newP.style.top = '5px'
        }
        if (thingValue.length > 10) {
            newP.style.fontSize = '97px'
            newP.style.top = '20px'
        }
        if (thingValue.length > 12) {
            newP.style.fontSize = '85px'
            newP.style.top = '30px'
        }

        newSuccesButton.classList.add('succesButton')
        newSuccesButton.textContent = '✓'
        newDeleteButton.classList.add('deleteButton')
        newDeleteButton.textContent = '🗑️'
        newDiv.appendChild(newSuccesButton)
        newDiv.appendChild(newDeleteButton)
        newP.textContent = thingValue
        newP.classList.add('newP')
        newDiv.appendChild(newP)
        tasksDiv.appendChild(newDiv)

        const date = (new Date().getDate()) < 10 ? '0' + new Date().getDate() : new Date().getDate() 
        const s = (new Date().getSeconds()) < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
        const m = (new Date().getMinutes()) < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
        const h = (new Date().getHours()) < 10 ? '0' + new Date().getHours() : new Date().getHours()  
        const month = (new Date().getMonth()) < 10 ? '0' + new Date().getMonth() : new Date().getMonth()   
        const dateDate = `${month}/${date}/${h}:${m}:${s}`

        if (localStorage.storage === 'false') localStorage.storage = JSON.stringify({...{}})

        const obj = JSON.parse(localStorage.storage)
        Object.keys(obj).includes(thingValue) 
        console.log(Object.keys(obj), thingValue)
        obj[`${thingValue}`] = dateDate
        
        localStorage.storage = JSON.stringify({...obj})
        console.log(obj, thingValue)
        window.location.reload()
    }

    for (let i of deleteButtons) {
        i.onclick = () => {
            i.parentNode.remove()
            const storage = JSON.parse(localStorage.storage)
            delete storage[i.parentNode.children[2].textContent]
            localStorage.storage = JSON.stringify(storage)
        }
    }

    for (let i = 0; i < succesButtons.length; i++) {
        succesButtons[i].onclick = () => {    
            const date = (new Date().getDate()) < 10 ? '0' + new Date().getDate() : new Date().getDate() 
            const s = (new Date().getSeconds()) < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
            const m = (new Date().getMinutes()) < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
            const h = (new Date().getHours()) < 10 ? '0' + new Date().getHours() : new Date().getHours()  
            const month = (new Date().getMonth()) < 10 ? '0' + new Date().getMonth() : new Date().getMonth()   
            const dateDate = `${month}/${date}/${h}:${m}:${s}` 

            const storage = JSON.parse(localStorage.storage)

            if (localStorage.storageSuc === 'false') {
                const obj = {}
                obj[succesButtons[i].parentNode.children[2].textContent] = `${storage[Object.keys(storage)[i]]} - ${dateDate}` 
                localStorage.storageSuc = JSON.stringify({...obj})
            } else {
                const obj = JSON.parse(localStorage.storageSuc)
                obj[succesButtons[i].parentNode.children[2].textContent] = `${storage[Object.keys(storage)[i]]} - ${dateDate}`
                localStorage.storageSuc = JSON.stringify({...obj})
            }
            succesButtons[i].parentNode.remove()
            delete storage[Object.keys(storage)[i]]
            localStorage.storage = JSON.stringify(storage)
        }
    }

    const optionsBtn = document.getElementById('options-btn')
    const panel = document.getElementsByClassName('panel')[0]

    optionsBtn.onclick = () => {
        if (optionsBtn.textContent === '🠈') {
            panel.style.left = '-170px'
            optionsBtn.textContent = '≡'
            optionsBtn.style.background = '#2eb832'
        } else {
            panel.style.left = '0px'
            optionsBtn.textContent = '🠈'
            optionsBtn.style.background = '#f73123'
        }
    }
}