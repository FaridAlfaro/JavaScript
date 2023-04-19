function StorageRe() {
  const cargarButton = document.createElement("a");
  cargarButton.id = "cargar__button";
  cargarButton.classList.add("card__button");
  cargarButton.textContent = "Cargar Método de pago anterior";

  cotizarButton.parentNode.insertBefore(
    cargarButton,
    cotizarButton.nextSibling
  );

  cargarButton.addEventListener("click", () => {
    // const categoriaSelect = localStorage.getItem("categoriaSelect");
    // categoriaSelect.value = categoriaSelect;
    const servicioSeleccionado = localStorage.getItem("servicioSeleccionado");
    const metodoPagoSeleccionado = localStorage.getItem(
      "metodoPagoSeleccionado"
    );
    servicioSelect.value = servicioSeleccionado;
    metodoPagoSelect.value = metodoPagoSeleccionado;
    servicioSelect.dispatchEvent(new Event("change"));
    metodoPagoSelect.dispatchEvent(new Event("change"));
  });
}

function AplicarDescuento(precioFinal, descuento) {
  while (descuento < 0.1 || descuento > 0.9) {
    descuento = parseFloat(
      conole.log("El descuento debe ser un número entre 0.1 y 0.9")
    );
  }
  let precioConDescuento = precioFinal * descuento;
  return precioConDescuento;
}

function ValidarTarjeta(numeroTarjeta) {
  if (/^5[1-5]/.test(numeroTarjeta)) {
    let result = "mastercard";
    return result;
  } else if (/^4/.test(numeroTarjeta)) {
    let result = "visa";
    return result;
  } else {
    Swal.fire({
      icon: "error",
      title: "Tarjeta invalida",
      text: "Solo se aceptan Visa y Mastercard",
      footer: '<a href="https://faradaysmart.netlify.app/ayuda">Ayuda</a>',
    });
    let result = "unknown";
    return result;
  }
}

function CalculoCuotas(precioFinal, nCuotas) {
  const cft = 0.65;
  let cuotas = (precioFinal + precioFinal * cft) / nCuotas;
  return cuotas;
}

function CalculoCuotas(precioFinal, nCuotas) {
  const cft = 0.65;
  let cuotas = (precioFinal + precioFinal * cft) / nCuotas;
  return cuotas;
}

const nCuotasPosibles = document.querySelector("#Cuotas");
const tarjetaCredito = document.querySelector("#Tarjeta");
const servicioSelect = document.querySelector("#Servicio");
const metodoPagoSelect = document.querySelector("#MetodoPago");
const cotizarButton = document.querySelector("#card__button");
const categoriaSelect = document.querySelector("#Categoria");
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
          }
        });
      });
    });

    servicioSelect.addEventListener("change", () => {
      const servicioSeleccionado = servicioSelect.value;
      const infoServicioDiv = document.querySelector("#infoServicio");
      let servicioEncontrado = data.servicios.find(
        (servicio) => servicio.nombre === servicioSeleccionado
      );
      let descripcionServicio = servicioEncontrado.descripcion;
      infoServicioDiv.innerHTML = descripcionServicio;
    });
    metodoPagoSelect.addEventListener("change", () => {
      const metodoPagoSeleccionado = metodoPagoSelect.value;
      const infoPagoDiv = document.querySelector("#infoPago");
      tarjetaCredito.style.display = "none";
      nCuotasPosibles.style.display = "none";
      if (metodoPagoSeleccionado === "Efectivo") {
        infoPagoDiv.innerHTML =
          "Se aplica un descuento del 20% por pago en efectivo";
      } else if (metodoPagoSeleccionado === "Tarjeta de crédito") {
        tarjetaCredito.style.display = "";
        nCuotasPosibles.style.display = "";
        infoPagoDiv.innerHTML =
          "Algunas tarjetas disponen de ahora 12 y ahora 18. Al restante se aplica el recargo correspondiente al CFT";
      } else {
        tarjetaCredito.style.display = "none";
        nCuotasPosibles.style.display = "none";
        infoPagoDiv.innerHTML =
          "El pago por transferencia bancaria utiliza el precio de lista";
      }
    });
    cotizarButton.addEventListener("click", () => {
      if (servicioSelect.value == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Debes elegir un servicio primero",
          footer: '<a href="https://faradaysmart.netlify.app/ayuda">Ayuda</a>',
        });
      } else {
        let timerInterval;
        Swal.fire({
          title: "Exelente",
          html: "Gracias por usar el cotizador automático",
          timer: 600,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
        const servicioSeleccionado = servicioSelect.value;
        const metodoPagoSeleccionado = metodoPagoSelect.value;
        let servicioEncontrado = data.servicios.find(
          (servicio) => servicio.nombre === servicioSeleccionado
        );
        let precioSeleccionado = servicioEncontrado.precio;

        const resultadoDiv = document.querySelector("#resultado");

        if (metodoPagoSeleccionado === "Efectivo") {
          precioSeleccionado = AplicarDescuento(precioSeleccionado, 0.8);
          resultadoDiv.innerHTML =
            "El precio con descuento es: $" + precioSeleccionado;
        } else if (metodoPagoSeleccionado === "Tarjeta de crédito") {
          let nCuotas = nCuotasPosibles.value;
          let cuotas = CalculoCuotas(precioSeleccionado, nCuotas);
          resultadoDiv.innerHTML =
            "El precio en " +
            nCuotas +
            " cuotas es: <br/>$" +
            cuotas +
            " por mes";
        } else {
          resultadoDiv.innerHTML = "El precio final es $" + precioSeleccionado;
        }
        localStorage.setItem("servicio", servicioSelect.value);
        localStorage.setItem("metodoPago", metodoPagoSelect.value);
        categoriaSelect.setItem("categoriaSelect", categoriaSelect.value);
      }
    });
    StorageRe();
  });

const visa = document.querySelectorAll(".visa");
const mastercard = document.querySelectorAll(".mastercard");
for (const element of visa) {
  element.style.display = "none";
}

for (const element of mastercard) {
  element.display = "none";
}

document.querySelectorAll(".input_cart_number").forEach(function (input) {
  input.addEventListener("keyup", function (event) {
    let t = event.target;
    if (t.value.length > 3) {
      t.nextElementSibling.focus();
    }
    let cardNumber = "";
    document.querySelectorAll(".input_cart_number").forEach(function (input) {
      cardNumber += input.value + " ";
      if (input.value.length == 4) {
        input.nextElementSibling.focus();
      }
    });
    document.querySelector(".credit_card_box .number").innerHTML = cardNumber;
  });
});

document
  .querySelector("#card_holder")
  .addEventListener("keyup", function (event) {
    let t = event.target;
    document.querySelector(".credit_card_box .card_holder div").innerHTML =
      t.value;
  });

document
  .querySelector("#card_expiration_month")
  .addEventListener("change", function (event) {
    let m = event.target.options.selectedIndex;
    m = m < 10 ? "0" + m : m;
    let y = document.querySelector("#card_expiration_year").value.substr(2, 2);
    document.querySelector(".card_expiration_date div").innerHTML = m + "/" + y;
  });

document
  .querySelector("#card_expiration_year")
  .addEventListener("change", function (event) {
    let m = document.querySelector("#card_expiration_month").options
      .selectedIndex;
    m = m < 10 ? "0" + m : m;
    let y = event.target.value.substr(2, 2);
    document.querySelector(".card_expiration_date div").innerHTML = m + "/" + y;
  });

document.querySelector("#card_ccv").addEventListener("focus", function () {
  document.querySelector(".credit_card_box").classList.add("hover");
});

document.querySelector("#card_ccv").addEventListener("blur", function () {
  document.querySelector(".credit_card_box").classList.remove("hover");
});

document.querySelector("#card_ccv").addEventListener("keyup", function (event) {
  document.querySelector(".ccv div").innerHTML = event.target.value;
});

setTimeout(function () {
  document.querySelector("#card_ccv").focus();
  setTimeout(function () {
    document.querySelector("#card_ccv").blur();
  }, 1000);
}, 500);
document
  .querySelector("#card_number")
  .addEventListener("change", function (event) {
    if (ValidarTarjeta(event.target.value) == "visa") {
      for (const element of visa) {
        element.style.display = "";
      }

      for (const element of mastercard) {
        element.style.display = "none";
      }
    } else if (ValidarTarjeta(event.target.value) == "mastercard") {
      for (const element of visa) {
        element.style.display = "none";
      }

      for (const element of mastercard) {
        element.style.display = "";
      }
    } else {
      for (const element of visa) {
        element.style.display = "none";
      }

      for (const element of mastercard) {
        element.style.display = "none";
      }
    }
  });
