function AplicarDescuento(precioFinal, descuento) {
  while (descuento < 0.1 || descuento > 0.9) {
    descuento = parseFloat(
      prompt("El descuento debe ser un número entre 0.1 y 0.9")
    );
  }
  let precioConDescuento = precioFinal * descuento;
  return precioConDescuento;
}

function ValidarTarjeta(numeroTarjeta) {
  if (/^5[1-5]/.test(numeroTarjeta)) {
    result = 'mastercard';
  } else if (/^4/.test(numeroTarjeta)) {
    result = 'visa';
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Tarjeta invalida',
      text: 'Solo se aceptan Visa y Mastercard',
      footer: '<a href="https://faradaysmart.netlify.app/ayuda">Ayuda</a>'
    })
    result = 'unknown';
  }
  return result;
}

function CalculoCuotas(precioFinal, nCuotas) {
  const cft = 0.65;
  let cuotas = (precioFinal + precioFinal * cft) / nCuotas;
  return cuotas;
}

const nCuotasPosibles = document.getElementById("Cuotas");
const tarjetaCredito = document.getElementById("Tarjeta");
const servicioSelect = document.getElementById("Servicio");
const metodoPagoSelect = document.getElementById("MetodoPago");
const cotizarButton = document.getElementById("card__button");
const categoriaSelect = document.getElementById("Categoria");
nCuotasPosibles.style.display = "none";
tarjetaCredito.style.display = "none";

fetch("opciones.json")
  .then((response) => response.json())
  .then((data) => {

    data.metodosPago.forEach((metodo) => {
      const option = document.createElement("option");
      option.text = metodo;
      metodoPagoSelect.add(option);
      categoriaSelect.addEventListener("click", () => {
      servicioSelect.innerHTML = "";
    data.servicios.forEach((servicio) => {
      if (categoriaSelect.value === servicio.categoria) {
        const option = document.createElement("option");
        option.text = servicio.nombre;
        servicioSelect.add(option);
        }});
      });
    });

    servicioSelect.addEventListener("change", () => {
      const servicioSeleccionado = servicioSelect.value;
      const infoServicioDiv = document.getElementById("infoServicio");
      let servicioEncontrado = data.servicios.find(
        (servicio) => servicio.nombre === servicioSeleccionado
      );
      let descripcionServicio = servicioEncontrado.descripcion;
      infoServicioDiv.innerHTML = descripcionServicio;
    });
    metodoPagoSelect.addEventListener("change", () => {
      const metodoPagoSeleccionado = metodoPagoSelect.value;
      const infoPagoDiv = document.getElementById("infoPago");
      tarjetaCredito.style.display = "none";
      nCuotasPosibles.style.display = "none";
      if (metodoPagoSeleccionado === "Efectivo") {
        infoPagoDiv.innerHTML =
          "Se aplica un descuento del 20% por pago en efectivo";
      } else if (metodoPagoSeleccionado === "Tarjeta de crédito") {
        
        tarjetaCredito.style.display = "";
        nCuotasPosibles.style.display = "";
        infoPagoDiv.innerHTML = "Algunas tarjetas disponen de ahora 12 y ahora 18. Al restante se aplica el recargo correspondiente al CFT";
      } else {
        tarjetaCredito.style.display = "none";
        nCuotasPosibles.style.display = "none";
        infoPagoDiv.innerHTML =
          "El pago por transferencia bancaria utiliza el precio de lista";
      }
    });
    cotizarButton.addEventListener("click", () => {
      if (servicioSelect.value == ""){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debes elegir un servicio primero',
          footer: '<a href="https://faradaysmart.netlify.app/ayuda">Ayuda</a>'
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Exelente',
          text: 'Gracias por usar el cotizador automático',
          footer: '<a href="https://faradaysmart.netlify.app/ayuda">Ayuda</a>'
        })
        const servicioSeleccionado = servicioSelect.value;
      const metodoPagoSeleccionado = metodoPagoSelect.value;
      let servicioEncontrado = data.servicios.find(
        (servicio) => servicio.nombre === servicioSeleccionado
      );
      let precioSeleccionado = servicioEncontrado.precio;

      const resultadoDiv = document.getElementById("resultado");

      if (metodoPagoSeleccionado === "Efectivo") {
        precioSeleccionado = AplicarDescuento(precioSeleccionado, 0.8);
        resultadoDiv.innerHTML =
          "El precio con descuento es: $" + precioSeleccionado;
      } else if (metodoPagoSeleccionado === "Tarjeta de crédito") {
        nCuotas = nCuotasPosibles.value;
        let cuotas = CalculoCuotas(precioSeleccionado, nCuotas);
        resultadoDiv.innerHTML =
          "El precio en " + nCuotas + " cuotas es: <br/>$" + cuotas + " por mes";
      } else {
        resultadoDiv.innerHTML = "El precio final es $" + precioSeleccionado;
      }
      }
    });
  });


  const visa = document.querySelectorAll(".visa"); 
  const mastercard = document.querySelectorAll(".mastercard");
  for (let i = 0; i < visa.length; i++) {
    visa[i].style.display = "none";
  }
  
  for (let i = 0; i < mastercard.length; i++) {
    mastercard[i].style.display = "none";
  }
  

  document.querySelectorAll('.input_cart_number').forEach(function (input) {
    input.addEventListener('keyup', function (event) {
      var t = event.target;
      if (t.value.length > 3) {
        t.nextElementSibling.focus();
      }
      var cardNumber = '';
      document.querySelectorAll('.input_cart_number').forEach(function (input) {
        cardNumber += input.value + ' ';
        if (input.value.length == 4) {
          input.nextElementSibling.focus();
        }
      });
      document.querySelector('.credit_card_box .number').innerHTML = cardNumber;
    });
  });
  
  document.querySelector('#card_holder').addEventListener('keyup', function (event) {
    var t = event.target;
    document.querySelector('.credit_card_box .card_holder div').innerHTML = t.value;
  });
  
  document.querySelector('#card_expiration_month').addEventListener('change', function (event) {
    var m = event.target.options.selectedIndex;
    m = (m < 10) ? '0' + m : m;
    var y = document.querySelector('#card_expiration_year').value.substr(2, 2);
    document.querySelector('.card_expiration_date div').innerHTML = m + '/' + y;
  });
  
  document.querySelector('#card_expiration_year').addEventListener('change', function (event) {
    var m = document.querySelector('#card_expiration_month').options.selectedIndex;
    m = (m < 10) ? '0' + m : m;
    var y = event.target.value.substr(2, 2);
    document.querySelector('.card_expiration_date div').innerHTML = m + '/' + y;
  });
  
  document.querySelector('#card_ccv').addEventListener('focus', function () {
    document.querySelector('.credit_card_box').classList.add('hover');
  });
  
  document.querySelector('#card_ccv').addEventListener('blur', function () {
    document.querySelector('.credit_card_box').classList.remove('hover');
  });
  
  document.querySelector('#card_ccv').addEventListener('keyup', function (event) {
    document.querySelector('.ccv div').innerHTML = event.target.value;
  });
  
  setTimeout(function () {
    document.querySelector('#card_ccv').focus();
    setTimeout(function () {
      document.querySelector('#card_ccv').blur();
    }, 1000);
  }, 500);
  document.querySelector('#card_number').addEventListener('change', function (event) {
    if (ValidarTarjeta(event.target.value) == 'visa'){
      for (let i = 0; i < visa.length; i++) {
        visa[i].style.display = "";
      }
      
      for (let i = 0; i < mastercard.length; i++) {
        mastercard[i].style.display = "none";
      }
    } else if (ValidarTarjeta(event.target.value) == 'mastercard'){
      for (let i = 0; i < visa.length; i++) {
        visa[i].style.display = "none";
      }
      
      for (let i = 0; i < mastercard.length; i++) {
        mastercard[i].style.display = "";
      }
    } else{
      for (let i = 0; i < visa.length; i++) {
        visa[i].style.display = "none";
      }
      
      for (let i = 0; i < mastercard.length; i++) {
        mastercard[i].style.display = "none";
      }
    };
  });
  