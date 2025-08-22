
const ejemplo_data = [
	{
		"nombre_estudiante": "Juan",
		"apellido_estudiante": "Perez",
		"password_user": "",
		"numero_documento": "123456789",
        "grado": "10",
        "jornada": "Mañana",
		"tipo_doc": {
			"id_doc": 1,
			"nombre": "Cedula",
			"siglas": "CC"
		},
		"rol": {
			"id_rol": 1,
			"nombre_rol": "aseador"
		},
		"colegio": {
			"id_colegio": 1,
			"nombre_colegio": "Colegio Central",
			"direccion_colegio": "Calle 123 #45-67"
		}
	},
	{
		"nombre_estudiante": "mariana",
		"apellido_estudiante": "Perez",
		"password_user": "mariana123",
		"numero_documento": "2222222",
        "grado": null,
        "jornada": "Mañana",
		"tipo_doc": {
			"id_doc": 1,
			"nombre": "Cedula",
			"siglas": "CC"
		},
		"rol": {
			"id_rol": 1,
			"nombre_rol": "aseador"
		},
		"colegio": {
			"id_colegio": 1,
			"nombre_colegio": "Colegio Central",
			"direccion_colegio": "Calle 123 #45-67"
		}
	}
]

function construir_tabla(data){
/*     let tabla = document.getElementById("tabla_estudiantes");
    let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
    
    estudiantes.forEach(estudiante => {
        let fila = tabla.insertRow();
        fila.insertCell(0).innerText = estudiante.nombre;
        fila.insertCell(1).innerText = estudiante.documento;
        fila.insertCell(2).innerText = estudiante.curso;
        fila.insertCell(3).innerText = estudiante.sede;
    }); */

    let tabla = document.getElementById("cuerpo_tabla");

    for (i= 0; i < data.length; i++) {
        var fila = `<tr>
                        <td>${data[i].nombre_estudiante}</td>
                        <td>${data[i].apellido_estudiante}</td>
                        <td>${data[i].tipo_doc.siglas}</td>
                        <td>${data[i].numero_documento}</td>
                        <td>${data[i].grado}</td>
                        <td>${data[i].jornada}</td>
                        <td>${data[i].colegio.nombre_colegio}</td>

                    </tr>`;
        tabla.innerHTML += fila;
    }
}

construir_tabla(ejemplo_data);