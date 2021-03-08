var intervalId = window.setInterval(function () {
  datos();
}, 2000);
function datos() {
  let usser = document.getElementById("usser").value;
  let password = document.getElementById("password").value;

  if (!usser == "" && !password == "") {
    document.getElementById("log").removeAttribute("hidden");
    document.getElementById("log").classList.add("slide-in-right");
  } else {
  }
}
document.getElementById("log").addEventListener("click", () => {
  let us = document.getElementById("usser").value;
  let pas = document.getElementById("password").value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.responseText);
      for (let item of datos) {
        if (us == item.usser && pas == item.password) {
          sessionStorage.setItem("usser", us);
          location.href = "html/form.html";
        } else {
          document.getElementById("error").innerHTML =
            "Credenciales incorrectas";
          document.getElementById("forgot").removeAttribute("hidden");
          document.getElementById("forgot").classList.add("slide-in-bottom");
        }
      }
    }
  };
  xhttp.open("GET", "json/ussers.json", true);
  xhttp.send();
});
// olvide mis credenciales
document.getElementById("forgot").addEventListener("click", () => {
  location.href = "https://wa.link/v8wrrv";
});
