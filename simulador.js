
function AplicarDescuento(precioFinal, descuento){
  if (descuento <= 1){
    const precioConDescuento = precioFinal * descuento;
    return precioConDescuento;
  } else{
    alert("El descuento debe ser un numero entre 0.1 y 0.9")
  }
}

function CalculoCuotas(precioFinal, nCuotas){
const cft = 0.65;
const cuotas = (precioFinal + precioFinal * cft) / nCuotas;
return cuotas;
}

function Validar(seleccion, array) {
while (seleccion < 1 || seleccion > array.length) {
  seleccion = parseInt(prompt("Opción inválida, ingrese nuevamente"));
}
return seleccion;
}

let servicios = [
  { nombre: "Revision técnica", precio: 5000 },
  { nombre: "Automatización industrial", precio: 15000 },
  { nombre: "Domoticá domiciliaría", precio: 2500 }
];
alert("Servicios disponibles:" + "\n1 -" + servicios[0].nombre + "\n2 -" + servicios[1].nombre + "\n3 -" + servicios[2].nombre);

let servicioSeleccionado = parseInt(prompt("Ingrese el número del servicio que desea comprar:"));

servicioSeleccionado = Validar(servicioSeleccionado, servicios)

alert("Ha seleccionado el servicio " + servicios[servicioSeleccionado - 1].nombre);

let metodosDePago = ["Crédito", "Débito/TB", "Efectivo"];

alert("Por favor seleccione un método de pago:" + "\n1 - Crédito"  + "\n2 - Débito/ transferencia bancaria" + "\n3 - Efectivo (20% off)");

let metodoDePagoSeleccionado = parseInt(prompt("Ingrese el número del método de pago que desea utilizar:"));

metodoDePagoSeleccionado = Validar(metodoDePagoSeleccionado, metodosDePago);

alert("Ha seleccionado el método de pago " + metodosDePago[metodoDePagoSeleccionado - 1]);

let precioFinal = servicios[servicioSeleccionado - 1].precio;

if (metodoDePagoSeleccionado === 3) {
  AplicarDescuento(precioFinal, 0.8); 
  alert("Se ha aplicado un descuento del 20% por pago en efectivo");
  alert("El precio final es $" + precioFinal);
} else if (metodoDePagoSeleccionado == 1) {
    let nCuotas = parseInt(prompt("Ingrese un numero de cuotas 3, 6 o 12"))
    const cuotas = CalculoCuotas (precioFinal, nCuotas);
    alert("Se ha aplicado el recargo correspondiente al CFT");
    alert("El precio en " + nCuotas +" cuotas es: " + cuotas);
} else {
  alert("El precio final es $" + precioFinal);
}
