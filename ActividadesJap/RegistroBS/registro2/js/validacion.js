const FORM = document.getElementsByTagName("form")[0];
const P1 = document.getElementById("p1");
const P2 = document.getElementById("p2");

//Cuando se envia el form
FORM.addEventListener("submit", (event)=>{
    matchPass()
    //Si el form no es valido, no enviar nada.
    if (!FORM.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        alert("Formulario guardado con exito")
      }
    //Añadir la clase .was-validated para que aparezcan los msg de validacion
      FORM.classList.add('was-validated')
})

//Si se modifica el form, chekear si coinciden las contras
FORM.addEventListener("input", ()=>{
    matchPass();
})

//Coinciden las contraseñas?
function matchPass (){
    P1.value != P2.value ? P2.setCustomValidity("Las contraseñas no coinciden") : P2.setCustomValidity("");
}

