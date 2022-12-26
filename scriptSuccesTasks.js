window.onload = () => {
    const succesdiv = document.querySelector('.succesdiv')     
    try {
        const storageSuc = JSON.parse(localStorage.storageSuc)
        const storage = JSON.parse(localStorage.storage)
        for (let i = 0; i < Object.keys(storageSuc).length; i++) {
            const newDiv = document.createElement('div')
            const newP = document.createElement('p')
            const dates = `${storageSuc[Object.keys(storageSuc)[i]]}`
            const newPTime = document.createElement('p')

            if (Object.keys(storageSuc)[i].length > 8) {
                newP.style.fontSize = '120px'
            }
            if (Object.keys(storageSuc)[i].length > 10) {
                newP.style.fontSize = '97px'
            }
            if (Object.keys(storageSuc)[i].length > 12) {
                newP.style.fontSize = '85px'
            }

            newP.textContent = Object.keys(storageSuc)[i]
            newP.classList.add('newP')
            newPTime.textContent = dates
            newPTime.classList.add('newPTime')
            newDiv.appendChild(newPTime)
            newDiv.appendChild(newP)
            succesdiv.appendChild(newDiv)
            console.log(dates)
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
}