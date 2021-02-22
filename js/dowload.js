window.onload = function () {
  document.getElementById("pdf").addEventListener("click", () => {
    const invoice = this.document.getElementById("contenido");

    var opt = {
      margin: 0,
      filename: "Cotización.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(invoice).set(opt).save();
  });
};
datos();
function datos() {
  document.getElementById("nCotizacion").innerHTML =
    "N° DE COTIZACIÓN: " + sessionStorage.getItem("numero");
  document.getElementById("clientef").innerHTML =
    "CLIENTE: " +
    " " +
    sessionStorage.getItem("cliente") +
    "<br>" +
    "DIRECCIÓN: " +
    sessionStorage.getItem("direcion");
  document.getElementById("total").innerHTML = sessionStorage.getItem("total");
  let tabla = sessionStorage.getItem("tabla");
  document.getElementById("tabla").innerHTML = tabla;
  document.getElementById("iva").innerHTML = sessionStorage.getItem("iva");
  var d = new Date();
  let dia = d.getDate();
  let mes = d.getMonth() + 1;
  let anho = d.getFullYear();

  let fecha = dia + "/" + mes + "/" + anho;

  document.getElementById("fecha").innerHTML = "FECHA: " + fecha;
  document.getElementById("forma").innerHTML =
    "FORMAS DE PAGO: " + sessionStorage.getItem("formapago") ;
}
