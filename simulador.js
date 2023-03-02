
function AplicarDescuento(precioFinal, descuento){
  if (descuento <= 1){
    const precioConDescuento = precioFinal * descuento;
    return precioConDescuento;
  } else{
    console.log("El descuento debe ser un numero entre 0.1 y 0.9")
  }
}

function CalculoCuotas(precioFinal, nCuotas){
const cft = 0.65;
const cuotas = (precioFinal + precioFinal * cft) / nCuotas;
return cuotas;
}

function MostrarEnPantalla(array){
for (let i = 0; i < array.length; i++) {
  console.log (i + 1 + ". " + array[i]);
}
}

function Validar(seleccion, array) {
while (seleccion < 1 || seleccion > array.length) {
  seleccion = parseInt(prompt("Opción inválida"));
}
return seleccion;
}

let servicios = [
  { nombre: "Revision técnica", precio: 5000 },
  { nombre: "Automatización industrial", precio: 15000 },
  { nombre: "Domoticá domiciliaría", precio: 2500 }
];
MostrarEnPantalla(servicios.nombre);

let servicioSeleccionado = parseInt(prompt("Ingrese el número del servicio que desea comprar:"));

Validar(servicioSeleccionado, servicios)

console.log("Ha seleccionado el servicio " + servicios[servicioSeleccionado - 1].nombre);

let metodosDePago = ["Crédito", "Débito/TB", "Efectivo"];

MostrarEnPantalla(metodosDePago);

let metodoDePagoSeleccionado = parseInt(prompt("Ingrese el número del método de pago que desea utilizar:"));

Validar(metodoDePagoSeleccionado, metodosDePago);
console.log("Ha seleccionado el método de pago " + metodosDePago[metodoDePagoSeleccionado - 1]);

let precioFinal = servicios[servicioSeleccionado - 1].precio;

if (metodoDePagoSeleccionado === 3) {
  AplicarDescuento(precioFinal, 0.8); 
  console.log("Se ha aplicado un descuento del 20% por pago en efectivo");
  console.log("El precio final es $" + precioFinal);
} else if (metodoDePagoSeleccionado == 1) {
    let nCuotas = parseInt(prompt("Ingrese un numero de cuotas 3, 6 o 12"))
    const cuotas = CalculoCuotas (precioFinal, nCuotas);
    console.log("Se ha aplicado el recargo correspondiente al CFT");
    console.log("El precio en " + nCuotas +" cuotas es: " + cuotas);
} else {
  console.log("El precio final es $" + precioFinal);
}
