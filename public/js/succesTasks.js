function unshifr(word) {
    let wordToUnshifr = ''
    for (let i = 1; i < word.length - Number(word[0]); i++) wordToUnshifr = wordToUnshifr + word[i]            
    return wordToUnshifr
}

function checking(word, p) {
    if (word.length > 8) {
        p.style.fontSize = '120px'
    }
    if (word.length > 10) {
        p.style.fontSize = '97px'
        p.style.top = '-55px'
    }
    if (word.length > 12) {
        p.style.fontSize = '85px'
        p.style.top = '-40px'
    }
}

window.onload = () => {
    const succesdiv = document.querySelector('.succesdiv')     
    try {
        const storageSuc = JSON.parse(localStorage.storageSuc)
        const storage = JSON.parse(localStorage.storage)
        const shifr = JSON.parse(localStorage.shifr)   

        for (let i = 0; i < Object.keys(storageSuc).length; i++) {
            const newDiv = document.createElement('div')
            const newP = document.createElement('p')
            const dates = `${storageSuc[Object.keys(storageSuc)[i]]}`
            const newPTime = document.createElement('p')
            const newDeleteButton = document.createElement('button')

            if (shifr.includes(Object.keys(storageSuc)[i])) {
                checking(unshifr(Object.keys(storageSuc)[i]), newP)
                newP.textContent = unshifr(Object.keys(storageSuc)[i])
            }
            else {
                checking(Object.keys(storageSuc)[i], newP)
                newP.textContent = Object.keys(storageSuc)[i]
            } 

            newDeleteButton.classList.add('deleteButton')
            newDeleteButton.textContent = '🗑️'
            newDiv.appendChild(newDeleteButton)
            newP.classList.add('newP')
            newPTime.textContent = dates
            newPTime.classList.add('newPTime')
            newDiv.appendChild(newPTime)
            newDiv.appendChild(newP)
            succesdiv.appendChild(newDiv)
        }
    } catch(err) {console.log(err)}

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

    const deleteButtons = document.getElementsByClassName('deleteButton')

    for (let i of deleteButtons) {
        i.onclick = () => {
            i.parentNode.remove()
            const storage = JSON.parse(localStorage.storageSuc)
            delete storage[i.parentNode.children[2].textContent]
            localStorage.storageSuc = JSON.stringify(storage)
        }
    }
}