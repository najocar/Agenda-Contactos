const nombre = document.getElementById("nombre");
const telefono = document.getElementById("telefono");
const btnagregar = document.querySelector(".agregar-contacto");
const contactos = document.getElementById("lista-contactos");

const db = window.localStorage;

btnagregar.onclick = () => {
    if (nombre.value !== "" && telefono.value !== "") {
        if (nombre.value.length < 15) {
            if (telefono.value.length < 13) {
                let contacto = {
                    id: Math.random(1,100),
                    nombre: nombre.value,
                    telefono: telefono.value,
                }
                guardarContacto(db, contacto)
            } else {
                alert("El telefono es demasiado largo");
                window.location.href = '/Agenda-Contactos';
            }

        } else {
            alert("El nombre es demasiado largo");
            window.location.href = '/Agenda-Contactos';
        }

    } else {
        alert("faltan datos");
        window.location.href = '/Agenda-Contactos';
    }

}

const guardarContacto = (db, contacto) => {
    db.setItem(contacto.id, JSON.stringify(contacto));
    window.location.href = '/Agenda-Contactos';
}

const cargarContactos = (db, parentNode) => {
    let claves = Object.keys(db);
    for (clave of claves) {
        let contacto = JSON.parse(db.getItem(clave));
        crearcontacto(parentNode, contacto, db)
    }
}

const crearcontacto = (parentNode, contacto, db) => {
    let divContacto = document.createElement('div');
    let iconoNombre = document.createElement('span');
    let nombreContacto = document.createElement('h3');
    let iconoTelefono = document.createElement('span');
    let telefonoContacto = document.createElement('h3');
    let iconoBorrar = document.createElement('span')

    iconoNombre.innerHTML = '<i class="fa fa-user usuario"></i>';
    nombreContacto.innerHTML = contacto.nombre;
    iconoTelefono.innerHTML = '<i class="fa fa-phone"></i>';
    telefonoContacto.innerHTML = contacto.telefono;
    iconoBorrar.innerHTML = '<i class="fa fa-times-circle-o"></i>'

    divContacto.classList.add('contacto')
    iconoNombre.classList.add('iconoNombre')
    iconoTelefono.classList.add('iconoNombre')
    iconoBorrar.classList.add('iconoBorrar')

    iconoBorrar.onclick = () => {
        db.removeItem(contacto.id);
        window.location.href = '/Agenda-Contactos';
    }

    divContacto.appendChild(iconoNombre);
    divContacto.appendChild(nombreContacto);
    divContacto.appendChild(iconoTelefono);
    divContacto.appendChild(telefonoContacto);
    divContacto.appendChild(iconoBorrar);

    parentNode.appendChild(divContacto);
}

cargarContactos(db, contactos);