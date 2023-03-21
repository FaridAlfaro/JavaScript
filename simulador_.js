function AplicarDescuento(precioFinal, descuento) {
  while (descuento < 0.1 || descuento > 0.9) {
    descuento = parseFloat(
      prompt("El descuento debe ser un número entre 0.1 y 0.9")
    );
  }
  let precioConDescuento = precioFinal * descuento;
  return precioConDescuento;
}

function ValidarCuotas(nCuotas, array) {
  if (Array.isArray(array)) {
    while (!array.includes(nCuotas)) {
      nCuotas = parseInt(
        prompt("Número de cuotas inválido, ingrese nuevamente")
      );
    }
  } else {
    alert("El valor ingresado es invalido");
  }
  return nCuotas;
}

function CalculoCuotas(precioFinal, nCuotas) {
  const cft = 0.65;
  let cuotas = (precioFinal + precioFinal * cft) / nCuotas;
  return cuotas;
}

let nCuotasPosibles = [3, 6, 12];
const servicioSelect = document.getElementById("Servicio");
const metodoPagoSelect = document.getElementById("MetodoPago");
const cotizarButton = document.getElementById("card__button");
const categoriaSelect = document.getElementById("Categoria");

fetch("opciones.json")
  .then((response) => response.json())
  .then((data) => {
    // Agregado
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
      if (metodoPagoSeleccionado === "Efectivo") {
        infoPagoDiv.innerHTML =
          "Se aplica un descuento del 20% por pago en efectivo";
      } else if (metodoPagoSeleccionado === "Tarjeta de crédito") {
        infoPagoDiv.innerHTML = "Se aplica el recargo correspondiente al CFT";
      } else {
        infoPagoDiv.innerHTML =
          "El pago por transferencia bancaria utiliza el precio de lista";
      }
    });
    cotizarButton.addEventListener("click", () => {
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
        let nCuotas = parseInt(prompt("Ingrese un numero de cuota: 3, 6 o 12"));
        nCuotas = ValidarCuotas(nCuotas, nCuotasPosibles);
        let cuotas = CalculoCuotas(precioSeleccionado, nCuotas);
        resultadoDiv.innerHTML =
          "El precio en " + nCuotas + " cuotas es: <br/>$" + cuotas + " por mes";
      } else {
        resultadoDiv.innerHTML = "El precio final es $" + precioSeleccionado;
      }
    });
  });
