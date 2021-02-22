//funciones del boton de carga
const carga = document.getElementById("real-file");
const btncarga = document.getElementById("botonAlternativo");
const cstTex = document.getElementById("custom-text");
btncarga.addEventListener("click", function () {
  carga.click();
});
//   informacion del elemento que cambia
carga.addEventListener("change", function () {
  if (carga.value) {
    cstTex.innerText = carga.value;
  } else {
    cstTex.innerText = "No has seleccionado un archivo, aun";
  }
});
// cargar imagen
const cargar = document.getElementById("cargarImagen");
cargar.addEventListener("click", cargarImagen);

// boton Ingresar datos

document.getElementById("generar").addEventListener("click", () => {
  // recoger informacion de cada input
  let numeroCotizacion = document.getElementById("ncotizacion").value;
  let informacionCliente = document.getElementById("cliente").value;
  let direccionCliente = document.getElementById("direccion").value;
  let cantidadProductos = document.getElementById("cantidad").value;
  let precioUnitario = document.getElementById("precioUnitario").value;
  let descripcionProducto = document.getElementById("descripcion").value;
  // informacion de descuento

  let select = document.getElementById("descuentoCliente").value;

  // sacar descuento
  let descuento = parseInt(select);
  let total1 = (precioUnitario * descuento) / 100;
  let fix1 = total1.toFixed(2);
  let precioDescuento = precioUnitario - fix1;
  let total2 = precioDescuento * cantidadProductos;
  let fix2 = total2.toFixed(2);

  Datos(
    numeroCotizacion,
    informacionCliente,
    direccionCliente,
    cantidadProductos,
    precioUnitario,
    fix2,
    descripcionProducto
  );
  SumaCotizaciones(fix2);
});

// objeto nueva cotizacion
function Datos(
  numeroC,
  cliente,
  direccion,
  cantidadProductos,
  precioUnitario,
  total,
  descripcion
) {
  var NuevaCotizacion = {
    numeroCotizacion: numeroC,
    cliente: cliente,
    direccion: direccion,
    cantidadProductos: cantidadProductos,
    precioUnitario: precioUnitario,
    total: total,
    descripcion: descripcion,
  };

  // fin de accion
  let divInfo = document.getElementById("info");
  divInfo.removeAttribute("hidden");
  let pInformacionCliente = (document.getElementById("clienteInfo").innerHTML =
    NuevaCotizacion.cliente);
  let tbody = (document.getElementById("tabla").innerHTML +=
    "<tr><td>" +
    NuevaCotizacion.cantidadProductos +
    "</td><td>" +
    NuevaCotizacion.descripcion +
    "</td><td>" +
    `<img src='${
      document.getElementById("img").src
    }' width='50' height='50' >` +
    "</td><td>" +
    NuevaCotizacion.precioUnitario +
    "</td><td>" +
    NuevaCotizacion.total +
    "</td></tr>");

  // array con los precios
}
/* carga de imagen */

function cargarImagen() {
  let archivo = document.getElementById("real-file").files[0];
  let reader = new FileReader();
  if (archivo) {
    reader.readAsDataURL(archivo);
    reader.onloadend = function () {
      let nube = document.getElementById("nube");
      nube.setAttribute("hidden", "hidden");
      document.getElementById("img").src = reader.result;
      let img = document.getElementById("img");
      img.removeAttribute("hidden");
    };
  }
}
// suma de cotizaciones
let totales = [];
function SumaCotizaciones(total) {
  let totalarray = total;
  totales.push(parseFloat(totalarray));
  let sumaTotales = totales.reduce((a, b) => a + b, 0);
  let mostrarTotal = document.getElementById("total");
  let sumaFormat = new Intl.NumberFormat().format(sumaTotales);
  mostrarTotal.innerHTML = "$" + sumaFormat;
  mostrarTotal.removeAttribute("hidden");
}

// Prueba con session Storaje;

let fina = document.getElementById("finalizar");
fina.addEventListener("click", finalizar);

function finalizar() {
  let cliente = document.getElementById("cliente").value;
  sessionStorage.setItem("cliente", cliente);
  let Ncoti = document.getElementById("ncotizacion").value;
  sessionStorage.setItem("numero", Ncoti);
  let dire = document.getElementById("direccion").value;
  sessionStorage.setItem("direcion", dire);
  let ftotal = document.getElementById("total").textContent;
  sessionStorage.setItem("total", ftotal);
  let tabla = document.getElementById("tablafinal");
  sessionStorage.setItem("tabla", tabla.outerHTML);

  let check = document.getElementById("flexCheckDefault").checked;
  if (check == true) {
    sessionStorage.setItem('iva','PRECIO INCLUYE IVA')
  } else {
    sessionStorage.setItem('iva','PRECIO NO INCLUYE IVA')
  }

  let Fpago = document.getElementById('FormaPago').value;
  sessionStorage.setItem("formapago", Fpago);

  location.href = "html/pdf.html";
}
