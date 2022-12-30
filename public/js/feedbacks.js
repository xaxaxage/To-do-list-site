window.onload = () => {
    const optionsBtn = document.getElementById('options-btn')
    const panel = document.getElementsByClassName('panel')[0]
    const submitButton = document.getElementById('submit')
    submitButton.disabled = true
    submitButton.style.background = '#40d276'


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

    const rating = document.getElementById('rating')
    const stars = document.getElementsByClassName('stars')[0]

    rating.value = 0

    rating.addEventListener('change', () => {
        let text = ''

        for (let i = 0; i < 5; i++) {      
            if (i < rating.value) text += '★' 
            else text += '☆'  
        }  
        
        stars.textContent = text
        submitButton.disabled = false
        submitButton.style.background = '#1aa34c'
    })
}