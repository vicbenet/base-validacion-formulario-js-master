const firebaseConfig = {
  apiKey: "AIzaSyAsnBfALzJRQTU9zMAg7-hlopueT2-BPr0",
  authDomain: "base-validacion-formular-2abe8.firebaseapp.com",
  projectId: "base-validacion-formular-2abe8",
  storageBucket: "base-validacion-formular-2abe8.appspot.com",
  messagingSenderId: "501998975583",
  appId: "1:501998975583:web:7435b73350fe37915039ea",
  measurementId: "G-5B40H671QD"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore(app);

function submitForm(event) {
  event.preventDefault();

  // VALIDAR NOMBRE
  let entradaNombre = document.getElementById('name');
  let errorNombre = document.getElementById('nameError');
  if (entradaNombre.value.trim() === '') {
    errorNombre.textContent = 'Por favor, introducir su nombre';
    errorNombre.classList.add('error-message');
  } else {
    errorNombre.textContent = '';
    errorNombre.classList.remove('error-message');
  }

  // VALIDAR CORREO
  let emailEntrada = document.getElementById('email');
  let emailError = document.getElementById('emailError');
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let emailValido = emailPattern.test(emailEntrada.value);
  if (!emailValido) {
    emailError.textContent = 'Por favor, introduzca un correo válido';
    emailError.classList.add('error-message');
  } else {
    emailError.textContent = '';
    emailError.classList.remove('error-message');
  }

  // VALIDAR CONTRASEÑA
  // VALIDAR CONTRASEÑA
  let contrasenaEntrada = document.getElementById('password');
  let contrasenaError = document.getElementById('passwordError');
  let contrasenaPattern = /^(?=.*[0-9])(?=.*[\p{Punctuation}])(?=.*[A-Z])(?=.*[a-z])\w{8,16}$/;
// Utilizar [\p{Punctuation}] en lugar de \p{Punct}
  if (!contrasenaPattern.test(contrasenaEntrada.value)) {
  contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, Mayúscula, Minúscula, Números y Símbolo';
  contrasenaError.classList.add('error-message');
  } else {
  contrasenaError.textContent = '';
  contrasenaError.classList.remove('error-message');
  }


  // SI TODOS LOS CAMPOS SON VÁLIDOS ENVIAR FORMULARIO
  if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
    // BACKEND QUE RECIBA LA INFORMACIÓN
    // ** IMPLEMENTACIÓN DEL BACKEND AQUÍ **
    
    // Aquí deberías manejar el envío de datos al backend (por ejemplo, usando fetch o axios)

    db.collection('users').add({
      Nombre: entradaNombre.value,
      Email: emailEntrada.value,
      Password: contrasenaEntrada.value,
    })
    .then(() => {
      alert('El formulario ha sido enviado con éxito');
      document.getElementById('formulario').reset();
    })
    .catch((error) => {
      console.error('Error al enviar el formulario:', error);
      alert('Ocurrió un error al enviar el formulario');
    });
  }
}

document.getElementById('formulario').addEventListener('submit', submitForm);
