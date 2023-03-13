function AplicarDescuento(precioFinal, descuento){
  while (descuento < 0.1 || descuento > 0.9){
    descuento = parseFloat(prompt("El descuento debe ser un número entre 0.1 y 0.9"));
  }
  let precioConDescuento = precioFinal * descuento;
  return precioConDescuento;
}

function ValidarCuotas(nCuotas, array) {
  if (Array.isArray(array)){
    while (!array.includes(nCuotas)) {
      nCuotas = parseInt(prompt("Número de cuotas inválido, ingrese nuevamente"));
    }
  } else {
    alert("El valor ingresado es invalido")
  }
  return nCuotas;
}

function CalculoCuotas(precioFinal, nCuotas){
  const cft = 0.65;
  let cuotas = (precioFinal + precioFinal * cft) / nCuotas;
  return cuotas;
}

function Validar(seleccion, array) {
  if (Array.isArray(array)){
    while (seleccion < 1 || seleccion > array.length) {
      seleccion = parseInt(prompt("Opción inválida, ingrese nuevamente"));
    }
  } else {
    alert("El valor ingresado es invalido")
  }
  return seleccion;
}

function FiltrarCategorias(servicios, categoria) {

  if (Array.isArray(servicios)) {
    return servicios.filter(servicio => servicio.categoria === categoria);
  } else {
    return [];
  }
}

let servicios = [
  { nombre: "Instalacion domiciliaria básica", precio: 50000, categoria: "Domicilios"},
  { nombre: "Revisión por fallas o consumo exhesivo", precio: 5000, categoria: "Domicilios"},
  { nombre: "Estudio de factibilidad para automatizar procesos", precio: 40000, categoria: "Industrias"},
  { nombre: "Instalacion de portones eléctricos", precio: 20000, categoria: "Domótica"},
  { nombre: "Iluminación de locales/discotecas", precio: 30000, categoria: "Domótica" },
  { nombre: "Automatización industrial de proceso conocido", precio: 150000, categoria: "Industrias"},
  { nombre: "Domoticá domiciliaría", precio: 4500, categoria: "Domótica"}
];

let categorias = ["Domicilios", "Industrias", "Domótica"];
let metodosDePago = ["Crédito", "Débito/TB", "Efectivo"];
let nCuotasPosibles = [3, 6, 12];

let categoriaSeleccionada = parseInt(prompt(`Categorías disponibles:\n${categorias.map((categoria, index) => `${index+1} - ${categoria}`).join('\n')}\nIngrese el número de la categoría que desea ver:`));
categoriaSeleccionada = Validar(categoriaSeleccionada, categorias);
let serviciosFiltrados = FiltrarCategorias(servicios, categorias[categoriaSeleccionada - 1]);

alert(`Servicios disponibles en la categoría ${categorias[categoriaSeleccionada - 1]}:\n${serviciosFiltrados.map(servicio => `${servicio.nombre} - $${servicio.precio}`).join('\n')}`);

let servicioSeleccionado = parseInt(prompt(`Seleccione un servicio de la categoría ${categorias[categoriaSeleccionada - 1]}:`));
servicioSeleccionado = Validar(servicioSeleccionado, serviciosFiltrados.map((servicio, index) => index+1));
servicioSeleccionado = serviciosFiltrados[servicioSeleccionado - 1].nombre;
let metodoDePagoSeleccionado = parseInt(prompt("Por favor seleccione un método de pago:" + "\n1 - Crédito"  + "\n2 - Débito/ transferencia bancaria" + "\n3 - Efectivo (20% off)" + "\nIngrese el número del método de pago que desea utilizar:"));
metodoDePagoSeleccionado = Validar(metodoDePagoSeleccionado, metodosDePago);

let precioFinal = serviciosFiltrados.find(servicio => servicio.nombre === servicioSeleccionado).precio;
if (metodoDePagoSeleccionado === 3) {
  precioFinal = AplicarDescuento(precioFinal, 0.8); 
  alert("Ha seleccionado el método de pago " + metodosDePago[metodoDePagoSeleccionado - 1] + "\nSe ha aplicado un descuento del 20% por pago en efectivo\nEl precio final es $" + precioFinal);
} else if (metodoDePagoSeleccionado === 1) {
    let nCuotas = parseInt(prompt("Ingrese un numero de cuota: 3, 6 o 12"))
    nCuotas = ValidarCuotas(nCuotas, nCuotasPosibles)
    let cuotas = CalculoCuotas (precioFinal, nCuotas);
    alert("Ha seleccionado el método de pago " + metodosDePago[metodoDePagoSeleccionado - 1] + "\nSe ha aplicado el recargo correspondiente al CFT\nEl precio en " + nCuotas +" cuotas es: " + cuotas);
} else {
  alert("El precio final es $" + precioFinal);
}
