"use strict";
//Creamos array que funcionará como base de datos de los cohetes creados
var cohetesBBDD = [];
//Variable global, accesible desde cualquier función
var cohete;
/* ////////// Evento submit del formulario ////////// */
COHETE_FORM.addEventListener("submit", function (e) {
    //Variables
    var errores; //Para guardar el contador de errores de validación
    //Anulamos comportamiento por defecto del navegador por el evento submit. De esta forma no refrescará
    e.preventDefault();
    //Validamos llamando a la función correspondiente
    errores = coheteValidate();
    //Si errores es igual a 0, significa que el formulario está validado correctamente y podemos avanzar
    if (errores === 0) {
        //Creamos objeto Cohete
        crearCohete();
        //Mostrar objeto Cohete creado
        mostrarCohetes();
        //Limpiamos el formulario
        limpiarForm();
        console.log(cohetesBBDD);
    }
});
/* ////////// Botón de iniciar partida ////////// */
START_BUTTON.addEventListener("click", function (e) {
    //Variables
    //Primero comprobaremos que hay mínimo dos cohetes creados
    if (cohetesBBDD.length < 2) {
        alert("Para iniciar el juego deben generarse almenos 2 cohetes.");
    }
    else {
        //Primero ocultamos el formulario de cohetes y hacemos visible el menú de acciones
        cambiarSecciones();
        //Limpiamos la sección de Datos de Cohetes
        CONTAINER.innerText = "";
        //Añadir al select los códigos de los cohetes creados, para que podamos seleccionar el cohete en función de su código
        montarSelect();
    }
});
/* ////////// Botón de acelerar ////////// */
ACELERAR_BUTTON.addEventListener("click", function (e) {
    var errores;
    var codigo;
    //Validamos que hayamos seleccionado una opción válida en la select
    errores = selectValidate();
    if (errores == 0) {
        //Guardamos en una variable el código del cohete seleccionado en la select
        codigo = SELECT_COHETE.value;
        //Llamamos a la función acelerar cohete pasándole el código del cohete en cuestión
        acelerarCohete(codigo);
    }
});
/* ////////// Botón de frenar ////////// */
FRENAR_BUTTON.addEventListener("click", function (e) {
    var errores;
    var codigo;
    //Validamos que hayamos seleccionado una opción válida en la select
    errores = selectValidate();
    if (errores == 0) {
        //Guardamos en una variable el código del cohete seleccionado en la select
        codigo = SELECT_COHETE.value;
        //Llamamos a la función frenar cohete pasándole el código del cohete en cuestión
        frenamosCohete(codigo);
    }
});
/* ////////// Botón de mostrar un cohete concreto de la select ////////// */
MOSTRAR_BUTTON.addEventListener("click", function (e) {
    var errores;
    var codigo;
    //Validamos que hayamos seleccionado una opción válida en la select
    errores = selectValidate();
    if (errores == 0) {
        //Guardamos en una variable el código del cohete seleccionado en la select
        codigo = SELECT_COHETE.value;
        //Llamamos a la función de mostrar cohete seleccionado en la select
        mostrarCoheteSelec(codigo);
    }
});
/* ////////// Botón de mostrar todos los cohetes ////////// */
MOSTRAR_ALL_BUTTON.addEventListener("click", function (e) {
    //Llamamos a la función de mostrar todos los cohetes y todos los datos
    mostrarAllCohetes();
});
/* ////////// Botón de reiniciar ////////// */
RESET_BUTTON.addEventListener("click", function (e) {
    //Cambiamos formularios
    cambiarSeccionesReset();
    //Vaciamos container
    CONTAINER.innerText = "";
    //Vaciamos select (excepto la primera option) y volvemos a añadir la primera option
    var SELECT_OPTIONS = SELECT_COHETE.querySelectorAll("option");
    SELECT_OPTIONS.forEach(function (option) {
        if (option.value != "Selecciona un cohete") {
            option.remove();
        }
    });
    //Limpiamos array cohetes
    cohetesBBDD = [];
    //Limpiamos formulario
    limpiarForm();
});
