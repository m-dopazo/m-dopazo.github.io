const FORM = document.getElementsByTagName("form")[0];
const P1 = document.getElementById("p1");
const P2 = document.getElementById("p2");
const TYC = document.getElementById("tyc");
const BOX = document.getElementById("box");
const FORM2 = document.getElementsByTagName("form")[1];

//Cuando se envia el form
FORM.addEventListener("submit", (event)=>{

    matchPass();

    //Si el form no es valido, no enviar nada.
    if (FORM.checkValidity() && FORM2.checkValidity()) {
      alert("Formulario guardado con exito");
    } else {
      event.preventDefault()
      event.stopPropagation()
    }
    
    //Añadir la clase .was-validated para que aparezcan los msg de validacion
      FORM.classList.add('was-validated')
      FORM2.classList.add('was-validated')
})

//Si se modifica el form, chekear si coinciden las contras
FORM.addEventListener("input", ()=>{
    matchPass();
})

BOX.addEventListener("change", ()=>{
  if (!BOX.checked){
    BOX.setCustomValidity("No chekeado");
    TYC.setCustomValidity("MAL")
  } else {
    BOX.setCustomValidity("");
    TYC.setCustomValidity("")
  };
  FORM2.classList.add('was-validated');
})

//Coinciden las contraseñas? 
function matchPass (){
  P1.value.length < 8 ? P1.setCustomValidity("Contraseña corta") : P1.setCustomValidity("");
  P2.value == P1.value && P1.checkValidity() ? P2.setCustomValidity("") : P2.setCustomValidity("No coinciden"); 
  
}



