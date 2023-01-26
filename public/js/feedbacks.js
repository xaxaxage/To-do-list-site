const cheking = {
    rating: false,
    text: false,
    signedUp: false
}

window.onload = () => {
    if (localStorage.user) {
        cheking.signedUp = true
        document.getElementById('user').value = localStorage.user
    } else {
        const confirmValue = confirm('If you want to leave a feedbacks you must pass authorization')

        if (confirmValue) location.href = '/sign-up'
    }


    const sort = document.getElementById('select-sort')
    const feedbacks = document.getElementById('feedbacks').textContent.split('}')
    feedbacks.pop()

    const parsedFeedbacks = []

    
    feedbacks.forEach(unparsed_elem => {
        const parsed_elem = JSON.parse(unparsed_elem + '}')
        parsedFeedbacks.push(parsed_elem)
    })   

    let parsedAndSortedFeedbacks = []

    // function to sort feedbacks
    function sorting() {
        parsedAndSortedFeedbacks = []

// -------------length sort--------------------------------------------------------      

        if (sort.value === 'length') {
            let lengths = {}
        
            parsedFeedbacks.forEach(parsed_elem => {
                lengths[parsed_elem.username + parsed_elem.date] = parsed_elem.feedback.length
            })   
            

            const lengthsArr = Object.values(lengths).sort((a, b) => b - a)

            lengthsArr.forEach((elem_l, index_l) => {
                Object.keys(lengths).forEach((elem, index) => {
                    if (elem_l === lengths[elem]) {
                        parsedAndSortedFeedbacks.push(parsedFeedbacks[index])
                    }
                })
            })
        }
    
// ------------------------------------------------------------------------------------

// -------------rating sort--------------------------------------------------------       

        if (sort.value === 'rating') {
            let ratings = {}

            parsedFeedbacks.forEach(parsed_elem => {
                ratings[parsed_elem.username + parsed_elem.date] = parsed_elem.rating
            })   
            

            const ratingsArr = Object.values(ratings).sort((a, b) => b - a)

            ratingsArr.forEach((elem_l, index_l) => {
                Object.keys(ratings).forEach((elem, index) => {
                    if (elem_l === ratings[elem]) {
                        parsedAndSortedFeedbacks.push(parsedFeedbacks[index])
                    }
                })
            })
        }

// ------------------------------------------------------------------------------------

// -------------date sort--------------------------------------------------------       

        if (sort.value === 'date') {
            let dates = {}

            parsedFeedbacks.forEach(parsed_elem => {
                dates[parsed_elem.username + parsed_elem.date] = new Date(parsed_elem.date)
            })   
            

            const datesArr = Object.values(dates).sort((a, b) => b - a)

            datesArr.forEach((elem_l, index_l) => {
                Object.keys(dates).forEach((elem, index) => {
                    if (elem_l === dates[elem]) {
                        parsedAndSortedFeedbacks.push(parsedFeedbacks[index])
                    }
                })
            })
        }

// ------------------------------------------------------------------------------------
    }


    function placeFeedbacks() {
        parsedAndSortedFeedbacks.forEach(parsed_elem => {
            const feedbacksdiv = document.getElementsByClassName('feedbacksdiv')[0]
            const newDiv = document.createElement('div')
            const flexDiv = document.createElement('div')
            const feedbackDiv = document.createElement('div')
            const usernameP = document.createElement('p')
            const feedbackP = document.createElement('p')
            const feedbackDate = document.createElement('p')
            const ratingP = document.createElement('p')
            const img = new Image()
            const mainDiv = document.getElementsByClassName('main-div')[0]
    
            // start adding delete button //-----------------------------------------------------------------
            const deleteButton = document.createElement('input')
            const deleteButtonForm = document.createElement('form')
            const deleteButtonInputDate = document.createElement('input')
            const deleteButtonInputUsername = document.createElement('input')
    
            deleteButton.classList.add('deleteButton')
    
            deleteButton.type = 'submit' 
            deleteButtonForm.method = 'post'
            deleteButtonForm.action = '/formPost'
            deleteButton.value = '🗑️'
            deleteButtonInputDate.type = 'text'
            deleteButtonInputDate.value = parsed_elem.date
            deleteButtonInputDate.style.display = 'none'
            deleteButtonInputDate.name = 'date'
            deleteButtonInputUsername.type = 'text'
            deleteButtonInputUsername.value = parsed_elem.username
            deleteButtonInputUsername.style.display = 'none'
            deleteButtonInputUsername.name = 'username'
    
            deleteButtonForm.appendChild(deleteButton)
            deleteButtonForm.appendChild(deleteButtonInputDate)
            deleteButtonForm.appendChild(deleteButtonInputUsername)
            // end adding delete button //-------------------------------------------------------------------
    
            feedbackDiv.classList.add('feedbackDiv')
            flexDiv.classList.add('flexDiv')
            ratingP.classList.add('ratingP')
            usernameP.classList.add('usernameP')
            feedbackP.classList.add('feedbackP')
            feedbackDate.classList.add('feedback-date')
            newDiv.classList.add('newDiv')
            img.classList.add('image')
    
            const todayDate = JSON.stringify(new Date(parsed_elem.date)).substring(1, 11)
    
            img.src = '/public/Images/user.jpg'  
            usernameP.textContent = parsed_elem.username
            feedbackP.innerHTML = parsed_elem.feedback
            feedbackDate.textContent = todayDate
            let text = ''
            for (let i = 0; i < 5; i++) {      
                if (i < parsed_elem.rating) text += '★' 
                else text += '☆'  
            }
            ratingP.textContent = text
    
            flexDiv.appendChild(img)
            flexDiv.appendChild(usernameP)
            flexDiv.appendChild(ratingP)
            if (parsed_elem.username === localStorage.user) flexDiv.appendChild(deleteButtonForm)
            feedbackDiv.appendChild(feedbackP)
            newDiv.appendChild(flexDiv)
            newDiv.appendChild(feedbackDiv)
            newDiv.appendChild(feedbackDate)
            mainDiv.appendChild(newDiv)
            feedbacksdiv.appendChild(mainDiv)
        })
    }


    function mainDiv() {
        const mainDiv = document.createElement('div')
        mainDiv.classList.add('main-div')

        const feedbacksDiv = document.getElementsByClassName('feedbacksdiv')[0]
        feedbacksDiv.appendChild(mainDiv)
    }


    mainDiv()
    sorting()
    placeFeedbacks() 


    sort.addEventListener('change', () => {
        const feedbacksToDelete = document.getElementsByClassName('main-div')[0]
        feedbacksToDelete.remove()

        mainDiv()
        sorting()
        placeFeedbacks()
    })


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

    if (localStorage.feedbacksAbility === 'false') {
        alert('You have to wait 24 hours before leaving second feedback or you can delete your previous feedback')
        localStorage.feedbacksAbility = true
    }

    const rating = document.getElementById('rating')
    const stars = document.getElementsByClassName('stars')[0]

    rating.value = 3

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

        if (input.value.length < 15) cheking.text = false

        chekingf()
    })

    const chekingf = () => {
        if (cheking.rating === true && cheking.text === true && cheking.signedUp === true) {
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
    
    submitButton.addEventListener('click', (e) => {
        try {
            feedbacks.forEach(unparsed_elem => {
                const parsed_elem = JSON.parse(unparsed_elem + '}')

                if (parsed_elem.username === localStorage.user) {
                    if (new Date(parsed_elem.date) > new Date() - 86400000) {
                        localStorage.feedbacksAbility = "false"
                        e.preventDefault()
                    }
                }
            })   
        } catch(err) {console.error(err)}

        finally {
            setTimeout(() => {
                window.location.reload()
            }, 200)     
        }
        
        
    })

    const deleteButtons = document.getElementsByClassName('deleteButton')

    for (let i of deleteButtons) {
        i.onclick = () => {
            localStorage.feedbacksAbility = "true"
            setTimeout(() => {
                window.location.reload()
            }, 200)        
        }
    }
}