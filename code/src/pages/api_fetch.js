// api.js

export async function fetchData(endpoint, selectId, valueKey, textKey) {
    try {
        const response = await fetch(`http://localhost:3000/${endpoint}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); 
        const selectElement = document.getElementById(selectId);
        
        selectElement.innerHTML = '';
        const defaultOption = document.createElement('option');
        
        // This line is where the change happens
        const formattedEndpoint = endpoint.charAt(0).toUpperCase() + endpoint.slice(1).replace('_', ' ');
        defaultOption.textContent = `Selecciona ${formattedEndpoint}`;
        
        defaultOption.value = '';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);

        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item[valueKey];
            option.textContent = item[textKey];
            selectElement.appendChild(option);
        });
        
    } catch (error) {
        console.error(`Error al cargar los datos de ${endpoint}:`, error);
        alert(`Hubo un problema al cargar los datos.`);
    }
}

export async function obtenerEntidades(endpoint, buildTableFunction) {
    try {
        const response = await fetch(`http://localhost:3000/${endpoint}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const entities = data.message || data; 

        if (Array.isArray(entities)) {
            buildTableFunction(entities); 
        } else {
            alert('No pudimos obtener los datos. La respuesta del servidor es inesperada.');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al conectar con el servidor.');
    }
}