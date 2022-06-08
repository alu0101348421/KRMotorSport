import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js'
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js'

$('#output').hide()

const firebaseConfig = {measurementId: "G-MEASUREMENT_ID",
  apiKey: "AIzaSyBni1-zY1UHysl3wDnPXuGRkaAyjj8bCVI",
  authDomain: "fndus-1480b.firebaseapp.com",
  databaseURL: "https://fndus-1480b.firebaseio.com",
  projectId: "fndus-1480b",
  storageBucket: "fndus-1480b.appspot.com",
  messagingSenderId: "34558392188",
  appId: "1:34558392188:web:a867c52c8c1480de9816f9"
};

const app = initializeApp(firebaseConfig);

export function sendData() {
  var name = $('#name').val();
  var dni = $('#dni').val();
  var email = $('#email').val();
  var phone = $('#phone').val();
  var address = $('#address').val();

  var viaEmail = $('#email-checkbox').is(':checked');
  var viaMail = $('#mail-checkbox').is(':checked');

  if (!dni || !name || !email || !phone || !address) {
    $('#output').show()
    $('#output').html('<div class="card-panel red lighten-1 alert alert-danger">Todos los campos son obligatorios</div>')
    return
  }

  if (validateDni(dni) == false) {
    $('#output').show()
    $('#output').html('<div class="card-panel red lighten-1 alert alert-danger">DNI inválido</div>')
    return
  }

  if (!validateEmail(email)) {
    $('#output').show()
    $('#output').html('<div class="card-panel red lighten-1 alert alert-danger">Email inválido</div>')
    return
  }

  if (!validatePhone(phone)) {
    $('#output').show()
    $('#output').html('<div class="card-panel red lighten-1 alert alert-danger">Teléfono inválido</div>')
    return
  }

  if (!viaEmail && !viaMail) {
    $('#output').show()
    $('#output').html('<div class="card-panel red lighten-1 alert alert-danger">Debe seleccionar al menos una forma de contacto</div>')
    return
  }

  var data = {
    name: name,
    dni: dni,
    email: email,
    phone: phone,
    address: address
  };

  const db = getDatabase(app);
  set(ref(db, 'client/' + dni), data);
  $('#output').show()
  $('#output').html('<div class="card-panel green lighten-1 alert alert-success">Datos guardados</div>')
}

$('#sendBTN').on('click', function(event) {
  event.preventDefault();
  sendData();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function validateDni(dni) {
  var numero, letr, letra;
  var expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
  if(expresion_regular_dni.test (dni) == true){
      numero = dni.substr(0,dni.length-1);
      letr = dni.substr(dni.length-1,1);
      numero = numero % 23;
      letra='TRWAGMYFPDXBNJZSQVHLCKET';
      letra=letra.substring(numero,numero+1);
      if (letra!=letr.toUpperCase()) {
          return false;
      }
      else{
          return true;
      }
  }
  else{
      return false;
  }
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  var re = /^\d{9}$/;
  return re.test(String(phone));
}