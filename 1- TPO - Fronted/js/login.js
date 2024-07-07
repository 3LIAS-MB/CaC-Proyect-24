document
  .getElementById('login-form')
  .addEventListener('submit', function (event) {
    event.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    console.log('Username:', username)
    console.log('Password:', password)

    if (username === '' || password === '') {
      document.getElementById('error-message').textContent =
        'Por favor, ingresa un nombre de usuario y una contraseña.'
    } else {
      console.log('Inicio de sesión exitoso. Redireccionando...')
      window.location.href = '../index.html'
    }
  })
