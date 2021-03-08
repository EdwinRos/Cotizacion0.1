//funciones del boton de carga
window.onload = function () {
  if (sessionStorage.getItem("usser") == null) {
    location.href = "../index.html";
  } else {
    let user = sessionStorage.getItem("usser");
    document.getElementById("usse").innerHTML = "Bienvenid@" + user;
  }
};

const carga = document.getElementById("real-file");
const btncarga = document.getElementById("botonAlternativo");
const cstTex = document.getElementById("custom-text");
document.getElementById("eliminar").addEventListener("click", deleteLaselemet);
btncarga.addEventListener("click", function () {
  carga.click();
});
//   informacion del elemento que cambia
carga.addEventListener("change", function () {
  if (carga.value) {
    cstTex.innerText = carga.value;
    let btnCarga = document.getElementById("cargarImagen");
    btnCarga.removeAttribute("disabled");
    btnCarga.classList.add("jello-horizontal");
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
  document.getElementById("finalizar").removeAttribute("disabled");
  document.getElementById("finalizar").classList.add("jello-horizontal");
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

  //@ aparicion de btn delete
  let eliminar = document.getElementById("eliminar");
  eliminar.classList.remove("scale-out-hor-left");
  eliminar.removeAttribute("hidden");
  eliminar.classList.add("focus-in-expand");
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
  document.getElementById("cargarImagen").classList.toggle("jello-horizontal");
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

// Delete fuction
function deleteLaselemet() {
  let tbodyPadre = document.getElementById("tabla");
  let contador = tbodyPadre.childElementCount;
  let last = tbodyPadre.lastChild;
  totales.pop();
  let resta = parseFloat(last.lastChild.textContent);
  let total1 = document.getElementById("total").textContent;
  let dato = parseFloat(total1.substring(1, 10));
  let newtotal = dato - resta;
  document.getElementById("total").innerHTML = "$" + newtotal;
  tbodyPadre.removeChild(tbodyPadre.lastChild);
  if (contador == 1) {
    let btndelete = document.getElementById("eliminar");
    btndelete.classList.remove("focus-in-expand");
    btndelete.classList.add("scale-out-hor-left");
    setTimeout(function () {
      btndelete.setAttribute("hidden", "hidden");
    }, 850);
  } else {
  }
}

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
    sessionStorage.setItem("iva", "PRECIO INCLUYE IVA");
  } else {
    sessionStorage.setItem("iva", "PRECIO NO INCLUYE IVA");
  }

  let Fpago = document.getElementById("FormaPago").value;
  sessionStorage.setItem("formapago", Fpago);

  location.href = "pdf.html";
}
