document.addEventListener('DOMContentLoaded', function () {
    const componentForm = document.getElementById('componentForm');
    const componentList = document.getElementById('componentList');
    const ubicacionSelect = document.getElementById('ubicacion');
    const nuevaUbicacionContainer = document.getElementById('nuevaUbicacionContainer');
    const nuevaUbicacionInput = document.getElementById('nuevaUbicacion');

    let componentes = [];

    // Mostrar campo para nueva ubicación si se selecciona "Otra"
    ubicacionSelect.addEventListener('change', function () {
        if (ubicacionSelect.value === 'Otra') {
            nuevaUbicacionContainer.style.display = 'block';
        } else {
            nuevaUbicacionContainer.style.display = 'none';
        }
    });

    // Agregar componentes al enviar el formulario
    componentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const dependencia = document.getElementById('dependencia').value;
        const procesador = document.getElementById('procesador').value;
        const memoria = document.getElementById('memoria').value;
        const marca = document.getElementById('marca').value;
        const serial = document.getElementById('serial').value;
        const discoDuro = document.getElementById('discoDuro').value;
        const board = document.getElementById('board').value;

        let ubicacion = ubicacionSelect.value;
        if (ubicacion === 'Otra') {
            ubicacion = nuevaUbicacionInput.value;
            if (!ubicacion) {
                alert("Por favor, ingrese una nueva ubicación.");
                return;
            }
        }

        // Agregar el componente a la lista de componentes
        const componente = {
            ubicacion,
            dependencia,
            procesador,
            memoria,
            marca,
            serial,
            discoDuro,
            board

        };

        componentes.push(componente);

        // Mostrar el listado de los componentes en pantalla
        const listItem = document.createElement('li');
        listItem.textContent = `Ubicación: ${ubicacion},dependencia: ${dependencia},Procesador: ${procesador}, Memoria: ${memoria} GB, Marca: ${marca}, Serial: ${serial}, Disco Duro: ${discoDuro} GB, Board: ${board} `;
        componentList.appendChild(listItem);

        // Limpiar el formulario
        componentForm.reset();
        nuevaUbicacionContainer.style.display = 'none';
    });

    // Finalizar selección y guardar en localStorage
    window.finalizarSelección = function () {
        localStorage.setItem('componentes', JSON.stringify(componentes));
        window.location.href = 'resumen.html'; // Redirigir a la página de resumen
    };
});