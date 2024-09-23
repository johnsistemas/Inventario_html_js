document.addEventListener('DOMContentLoaded', function () {
    const resumenList = document.getElementById('resumenList');
    const filtroUbicacion = document.getElementById('filtroUbicacion');
    const componentes = JSON.parse(localStorage.getItem('componentes')) || [];

    /* Mostrar todas las ubicaciones únicas en el filtro*/
    const ubicaciones = [...new Set(componentes.map(c => c.ubicacion))];
    ubicaciones.forEach(ubicacion => {
        const option = document.createElement('option');
        option.value = ubicacion;
        option.textContent = ubicacion;
        filtroUbicacion.appendChild(option);
    });

    /* Mostrar la lista de componentes filtrados*/
    function mostrarComponentes(filtro = 'Todos') {
        resumenList.innerHTML = '';
        const componentesFiltrados = filtro === 'Todos' ? componentes : componentes.filter(c => c.ubicacion === filtro);

        componentesFiltrados.forEach(componente => {
            const listItem = document.createElement('li');
            listItem.textContent = `Ubicación: ${componente.ubicacion},Dependencia: ${componente.dependencia}, Procesador: ${componente.procesador}, Memoria: ${componente.memoria} GB, Marca: ${componente.marca}, Serial: ${componente.serial}, Disco Duro: ${componente.discoDuro} GB, Board: ${componente.board};`
            resumenList.appendChild(listItem);
        });
    }

    filtroUbicacion.addEventListener('change', function () {
        mostrarComponentes(filtroUbicacion.value);
    });

    /* Mostrar todos los componentes al cargar*/
    mostrarComponentes();

    /* Exportar a PDF*/
    document.getElementById('exportarPDF').addEventListener('click', function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        let componentesFiltrados = filtroUbicacion.value === 'Todos' ? componentes : componentes.filter(c => c.ubicacion === filtroUbicacion.value);

        /* Agregar título*/
        doc.setFontSize(16);
        doc.text('Resumen de Componentes', 10, 10);

        /* Espaciado inicial*/
        let yPosition = 20;

        componentesFiltrados.forEach((componente, index) => {

            doc.setFont('helvetica', 'bold');  // Establecer en negrita
            doc.setFontSize(12);
            doc.text(`Componente ${index + 1}:`, 10, yPosition);

            // Agregar el contenido con los labels principales en negrita
            yPosition += 10;
            // Espacio antes de la primera línea de detalles

            doc.setFont('helvetica', 'bold');
            doc.text('Ubicación: ', 10, yPosition);
            doc.setFont('helvetica', 'normal');
            doc.text(componente.ubicacion, 40, yPosition);
            yPosition += 20;

            doc.setFont('helvetica', 'bold');
            doc.text('Ubicación: ', 10, yPosition);
            doc.setFont('helvetica', 'normal');
            doc.text(componente.dependencia, 40, yPosition);
            yPosition += 20;

            doc.setFont('helvetica', 'bold');
            doc.text('Procesador: ', 10, yPosition);
            doc.setFont('helvetica', 'normal');
            doc.text(componente.procesador, 40, yPosition);
            yPosition += 10;

            doc.setFont('helvetica', 'bold');
            doc.text('Memoria: ', 10, yPosition);
            doc.setFont('helvetica', 'normal');
            doc.text(`${componente.memoria}GB`, 40, yPosition);
            yPosition += 10;

            doc.setFont('helvetica', 'bold');
            doc.text('Marca: ', 10, yPosition);
            doc.setFont('helvetica', 'normal');
            doc.text(componente.marca, 40, yPosition);
            yPosition += 10;

            doc.setFont('helvetica', 'bold');
            doc.text('Serial: ', 10, yPosition);
            doc.setFont('helvetica', 'normal');
            doc.text(componente.serial, 40, yPosition);
            yPosition += 10;

            doc.setFont('helvetica', 'bold');
            doc.text('Disco Duro: ', 10, yPosition);
            doc.setFont('helvetica', 'normal');
            doc.text(`${componente.discoDuro}GB`, 40, yPosition);
            yPosition += 10;

            doc.setFont('helvetica', 'bold');
            doc.text('Board: ', 10, yPosition);
            doc.setFont('helvetica', 'normal');
            doc.text(componente.board, 40, yPosition);
            yPosition += 10;


            // Espacio adicional antes del siguiente componente

            // Controlar que no se salga de la página
            if (yPosition > 280) {
                doc.addPage();
                yPosition = 20;
            }
        });

        // Descargar el archivo PDF
        doc.save('resumen-componentes.pdf');
    });
});