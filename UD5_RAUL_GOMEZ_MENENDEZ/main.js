// variable para guardar las preguntas del quiz

const preguntas = [
    {
        pregunta: "¿Cuándo es mejor tomar la creatina?",
        eleccion: ["Mañana","Noche"],
        respuesta: "Mañana"
    },
    {
        pregunta: "¿Mejor rutina para principiantes?",
        eleccion: ["Full body", "Weider"],
        respuesta: "Full body"
    },
    {
        pregunta: "¿Qué musculo trabajas en press banca?",
        eleccion: ["Pecho", "Espalda"],
        respuesta: "Pecho"
    },
    {
        pregunta: "¿Qué macronutriente sacia más?",
        eleccion: ["Proteina", "Carbohidrato"],
        respuesta: "Proteina"
    },
    {
        pregunta: "Para hipertrofia, ¿cuál es el rango de repeticiones ideal?",
        eleccion: ["1-5", "8-12"], 
        respuesta: "8-12"
    },
    {
        pregunta: "Para fuerza, ¿cuál es el rango de repeticiones ideal?",
        eleccion: ["1-5", "8-12"], 
        respuesta: "1-5"
    },
    {
        pregunta: "Para mantenimiento, ¿cuál es el rango de repeticiones ideal?",
        eleccion: ["1-5", "15-30"],
        respuesta: "15-30"
    },
    {
        pregunta: "Que músculo trabajas en jalones?",
        eleccion: ["Espalda", "Pecho"], 
        respuesta: "Espalda"
    },
    {
        pregunta: " Que son los ejercicios multiarticulares?",
        eleccion: ["Ejercicios que trabajan un solo musculo", "Ejercicios que trabajan varios musculos"],
        respuesta: "Ejercicios que trabajan varios musculos"
    },
    {
        pregunta: "Cuántos gramos de proteína se recomienda tomar por kilo de peso?",
        eleccion: ["1,5", "2"],
        respuesta: "2"
    },
];

// Variables para llevar el control de la pregunta actual y la puntuación
let preguntaActual = 0;
let puntuacion = 0;

//Funcion para iniciar el cuestionario
function iniciar() {
    document.getElementById("iniciar").classList.add("hidden");  // Oculta el botón de inicio
    document.getElementById("quiz").classList.remove("hidden");  // Muestra el cuestionario

    //LLama a la función para cargar la pregunta actual
    pregunta();
}
// Función para cargar la pregunta actual
function pregunta() {
    if (preguntaActual == preguntas.length) {
        document.getElementById("pregunta").innerText = "¡Has Terminado!";
        document.getElementById("eleccion").innerHTML = "";
        document.getElementById("resultado").innerText = `Has acertado ${puntuacion} / ${preguntas.length} preguntas.`;

        //Si acierta un detertminado numero de preguntas le aparece un mensaje u otro
        let mensaje = "";
        if (puntuacion <= 3) {
            mensaje = "Mal, vuelve a ver los videos anda";
        }
        else if (puntuacion >=4 && puntuacion <=6) {
            mensaje = "¡Regulin, Regulag!";
        }
        else if (puntuacion >=7 && puntuacion <=8) {
            mensaje = "No está mal, pero ve a por el sobresaliente";
        }
        else {
            mensaje = "¡Felicidades, te otorgo el diploma de Entrenador Personal!";
        }
        //Mostrar el mensaje final
        document.getElementById("mensajeFinal").innerText = mensaje;
        //Ocultar el contador
        document.getElementById("contador").innerText = "";
        // Ocultar el botón
        document.getElementById("siguiente").classList.add("hidden");
       
        return;
    }
    
    let preguntaObj = preguntas[preguntaActual];
    document.getElementById("pregunta").innerText = preguntaObj.pregunta;

    //Muestra el numero de la rpegunta actual
    document.getElementById("contador").innerText = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

    let opcionesDiv = document.getElementById("eleccion");
    opcionesDiv.innerHTML = "";
    
    preguntaObj.eleccion.forEach(opcion => {
        let button = document.createElement("button");
        button.innerText = opcion;
        button.className = "w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition";
        button.onclick = () => comprobacion(opcion, button);
        opcionesDiv.appendChild(button);
    });
}
//Funcion para comprobar la elección del usuario
function comprobacion(opcionSelect,buttonSelect) {
    let preguntaObj = preguntas[preguntaActual];
    let resultadoDiv = document.getElementById("resultado");
     // Deshabilitar el botón cuando se selecciona la respuesta
     let buttons = document.querySelectorAll("#eleccion button");
     buttons.forEach(button => button.disabled = true);

    //Esto hace una comprobacion de si es correcta o no, lanzar un aviso u otro.
    if (opcionSelect === preguntaObj.respuesta) {
        puntuacion++;
        resultadoDiv.innerText = "¡Olé, es correcto!";
        resultadoDiv.className = "text-green-500 font-bold";
        resultadoDiv.className = "text-green-500 font-bold";
    }
    else {
        buttonSelect.classList.add("bg-red-500");  
        resultadoDiv.innerText = " ¡No es correcto, lo siento!";
        resultadoDiv.className = "text-red-500 font-bold";
    }
    document.getElementById("siguiente").classList.remove("hidden");

    //como al aparecer el boton, queda más abajo de la pantalla, con esto hace scroll hacia el y evita tener que hacerlo el usuario
    document.getElementById("siguiente").scrollIntoView({ behavior: "smooth", block: "center" });
}

function siguientePregunta() {
    preguntaActual++;

    // Esta isntruccion oculta el botón hasta que el usuario marca una respuesta.
    document.getElementById("siguiente").classList.add("hidden");

    // Limpiar el resultado de la respuesta para que no salga al aparecer la siguiente pregunta
    document.getElementById("resultado").innerText = "";


    pregunta();
}

