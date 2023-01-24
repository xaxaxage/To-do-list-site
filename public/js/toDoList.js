const alf = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","4","5","6","7","8","9"]

function shifr(word) {
    let add_PART = ""
    const add_NUM = Math.floor(Math.random() * 9) // Рандомная генерация кол-ва символов в конце
    for (let i = 0; i < add_NUM; i++) add_PART = add_PART + alf[Math.floor(Math.random() * alf.length)]// Генерация конечной части шифра
    const last_shifr = String(add_NUM) + word + add_PART // Конечное создание шифра
    return last_shifr  // Возврат шифра   
}

window.onload = () => {
    const tasksDiv = document.querySelector('.tasks')
    try {
        const storage = JSON.parse(localStorage.storage)
        const storageSuc = JSON.parse(localStorage.storageSuc)
        for (let i = 0; i < Object.keys(storage).length; i++) {

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

    if (!localStorage.getItem('storage')) localStorage.setItem('storage', JSON.stringify({}))
    if (!localStorage.getItem('storageSuc')) localStorage.setItem('storageSuc', JSON.stringify({}))
    if (!localStorage.getItem('shifr')) localStorage.setItem('shifr', JSON.stringify([]))

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
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(thingValue[0])) {
            alert('First letter can not be number!')
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
        
        // YYYY/MM/dd/hh/mm/ss
        const date = `${JSON.stringify(new Date()).substring(1, 11)}/${new Date().getHours() < 10 ? '0' + String(new Date().getHours()) : new Date().getHours()}:${new Date().getMinutes < 10 ? '0' + String(new Date().getMinutes()) : new Date().getMinutes()}:${new Date().getSeconds() < 10 ? '0' + String(new Date().getSeconds()) : new Date().getSeconds()}`

        const obj = JSON.parse(localStorage.storage)
        Object.keys(obj).includes(thingValue) 
        console.log(Object.keys(obj), thingValue)
        obj[`${thingValue}`] = date
        
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

            // YYYY/MM/dd/hh/mm/ss
            const date = `${JSON.stringify(new Date()).substring(1, 11)}/${new Date().getHours() < 10 ? '0' + String(new Date().getHours()) : new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + String(new Date().getMinutes()) : new Date().getMinutes()}:${new Date().getSeconds() < 10 ? '0' + String(new Date().getSeconds()) : new Date().getSeconds()}`

            let shifrStorage = JSON.parse(localStorage.shifr)
            const storage = JSON.parse(localStorage.storage)
            const obj = JSON.parse(localStorage.storageSuc)
                
            if (succesButtons[i].parentNode.children[2].textContent in obj) {
                const word = shifr(succesButtons[i].parentNode.children[2].textContent)
                obj[word] = `${storage[Object.keys(storage)[i]]} - ${date}`
                shifrStorage = [...shifrStorage, word]
            } else obj[succesButtons[i].parentNode.children[2].textContent] = `${storage[Object.keys(storage)[i]]} - ${date}`

            localStorage.storageSuc = JSON.stringify({...obj})
            localStorage.shifr = JSON.stringify([...shifrStorage])

            succesButtons[i].parentNode.remove()
            delete storage[Object.keys(storage)[i]]
            localStorage.storage = JSON.stringify(storage)
            window.location.reload()
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