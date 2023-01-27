const letters = ['1','2','3','4','5','6','7','8','9','0','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M']

const cheking = {
   username: false,
   password: false
}

window.onload = () => {
   if (localStorage.user) {
      document.getElementsByClassName('formDiv')[0].style.display = 'none'
      document.querySelector('#message-div').style.display = 'block'
   }

   const submitButton = document.getElementById('submit')
   const username = document.getElementById('username')
   const password = document.getElementById('password')
   const passwordcheck = document.getElementById('passwordcheck')
   const p = document.getElementById('errorPassword')
   const pUser = document.getElementById('errorUser')

   submitButton.disabled = true
   submitButton.style.cursor = 'not-allowed'
   submitButton.style.background = '#40d276'


   passwordcheck.addEventListener('keyup', () => {
      try {
         if (password.value.length >= 4) {
            if (password.value.length <= 15) {
               for (let i of password.value) {
                  if (!letters.includes(i)) {
                     cheking.password = false
                     p.textContent = 'Password must be in english layout'
                     password.style.border = '2px solid rgb(255, 80, 80)'
                     return
                  }
               }

               if (passwordcheck.value === password.value) {
                  cheking.password = true   
                  password.style.border = '1px solid black'
                  p.textContent = ''
                  return
               }

               cheking.password = false
               p.textContent = 'Passwords are not same'
               password.style.border = '2px solid rgb(255, 80, 80)'
               return
            }

            cheking.password = false
            password.style.border = '2px solid rgb(255, 80, 80)'
            p.textContent = 'Password must be shorter than 16 symbols'
            return
         }

         cheking.password = false
         p.textContent = 'Password must be longer or equals 4 symbols'
         password.style.border = '2px solid rgb(255, 80, 80)'
         return
      } catch(err) {throw new Error(err)} finally {chekingf()}
   })

   const usedUsernames = document.getElementById('usedUsernames').textContent.split(',')

   username.addEventListener('keyup', () => {
      try {
         if (username.value.length > 3) {
            if (username.value.length < 16) {
               for (let i of username.value) {
                  if (!letters.includes(i)) {
                     cheking.username = false
                     pUser.textContent = 'Username must be in english layout'
                     username.style.border = '2px solid rgb(255, 80, 80)'
                     return
                  }
               }
               if (!usedUsernames.includes(username.value)) {
                  cheking.username = true   
                  username.style.border = '1px solid black'
                  pUser.textContent = ''
                  return
               }

               cheking.username = false
               username.style.border = '2px solid rgb(255, 80, 80)'
               pUser.textContent = 'Such nickname already exists'
               return
            }     
         }

         cheking.username = false
         username.style.border = '2px solid rgb(255, 80, 80)'
         pUser.textContent = 'Username must be from 4 to 15 symbols'
         return
      } catch(err) {throw new Error(err)} finally {chekingf()}
   })

   const chekingf = () => {

      // cheking if form inputs are valid

      if (cheking.username === true && cheking.password === true) {
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

   submitButton.addEventListener('click', () => {
         localStorage.user = username.value
         setTimeout(() => {window.location.reload()}, 200)  
   })
}