const cheking = {
    rating: false,
    text: false
}

window.onload = () => {
    const optionsBtn = document.getElementById('options-btn')
    const panel = document.getElementsByClassName('panel')[0]
    const submitButton = document.getElementById('submit')

    submitButton.disabled = true
    submitButton.style.cursor = 'not-allowed'
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

        cheking.rating = true

        chekingf()
    })

    const input = document.getElementById('inp')

    input.addEventListener('keydown', (e) => {
        if (input.value.length > 150) {
            input.style.color = 'red' 
            input.style.textShadow = 'none'
            cheking.text = false
        }    
        
        else {
            input.style.color = 'white' 
            input.style.textShadow = '-1px 0px 0px black,1px 0px 0px black,0px -1px 0px black,0px 1px 0px black'
            cheking.text = true
        }

        chekingf()
    })

    const chekingf = () => {
        if (cheking.rating === true && cheking.text === true) {
            submitButton.disabled = false
            submitButton.style.cursor = 'pointer'
            submitButton.style.background = '#1aa34c'
            submitButton.style.opacity = '1'
        }

        else {
            submitButton.disabled = true
            submitButton.style.cursor = 'not-allowed'
            submitButton.style.background = '#40d276'  
            submitButton.style.opacity = '0.5'  
        }
    } 


}