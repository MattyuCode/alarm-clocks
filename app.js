const selectMenu = document.querySelectorAll('select'),
    h1 = document.querySelector('h1'),
    h2 = document.querySelector('.fechas h2'),
    boton = document.querySelector('.container button'),
    content = document.querySelector(".contenido");

function opciones() {
    selectMenu[0].innerHTML = selectMenu[1].innerHTML = selectMenu[2].innerHTML = "";
    selectMenu[0].innerHTML = `<option value="Hora" selected disabled hidden>Hora</option>`;

    // para sacar la hora
    for (let i = 12; i > 0; i--) {
        i = i < 10 ? `0${i}` : i;
        let option = `<option value="${i}">${i}</option>`;
        selectMenu[0].firstElementChild.insertAdjacentHTML('afterend', option);
    }

    selectMenu[1].innerHTML = `<option value="Minutos" selected disabled hidden>Minutos</option>`;
    // para sacar los minutos
    for (let i = 59; i >= 0; i--) {
        i = i < 10 ? `0${i}` : i;
        let option = `<option value="${i}">${i}</option>`;
        selectMenu[1].firstElementChild.insertAdjacentHTML('afterend', option);
    }

    selectMenu[2].innerHTML = ` <option value="AM/PM" selected disabled hidden>AM/PM</option>`;
    // para sacar el AM-PM
    for (let i = 2; i > 0; i--) {
        let ampm = i == 1 ? "AM" : "PM";
        let option = `<option value="${ampm}">${ampm}</option>`;
        selectMenu[2].firstElementChild.insertAdjacentHTML('afterend', option);
    }
}
//llamanos la funcion que esta arriba
opciones();

let horaAlarma,
    configurarAlarma,
    sonido = new Audio("ringtone.mp3");

const viewDate = () => {
    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";

    if (h > 12) {
        h = h - 12;
        ampm = "PM";
    }

    h = h == 0 ? h = 12 : h; //si los valores de la hora son 0, establezca este valor en 12
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    h1.innerHTML = `${h}:${m}:${s} ${ampm}`;

    if (horaAlarma == `${h} ${m} ${ampm}`) {
        // console.log("Sonando");
        sonido.play();
        sonido.loop = true; //(loops) son utilizados para realizar tareas repetitivas y nos ayudara a repetir el audio
    }

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    let diasSemana = dias[date.getDay()];
    let dia = date.getDate();
    let mes = meses[date.getMonth()];
    let año = date.getFullYear()

    h2.innerHTML = `${diasSemana}, ${dia} de ${mes} de ${año}`;
}

setInterval(viewDate, 1000); // esto se tiene que ejecutar cada segundo


const establecerAlarma = () => {
    if (configurarAlarma) {
        horaAlarma = "";
        sonido.pause();
        // content.classList.remove("disabled");
        boton.innerText = "Activar Alarma";
        configurarAlarma = false;
        return opciones();
    }

    //obtentemos la hora y los minutos y el ampm con el valor seleccionado
    let tiempo = `${selectMenu[0].value} ${selectMenu[1].value} ${selectMenu[2].value}`;
    if (tiempo.includes("Hora") || tiempo.includes("Minutos") || tiempo.includes("AM/PM")) {
        //pasar el return para que no siga ejecutandose el codigo que esta abajo
        return alert("Por favor seleccione una hora válida para configurar la alarma")
    }

    configurarAlarma = true;
    horaAlarma = tiempo;
    // content.classList.add("disabled");
    boton.innerText = "Limpiar Alarma";
}

boton.addEventListener('click', establecerAlarma);