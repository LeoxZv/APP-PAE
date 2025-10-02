export async function fetchData(endpoint, selectId, valueKey, textKey) {
    try {
        // 🚨 LÍNEA FALTANTE REINSERTADA 🚨
        const response = await fetch(`http://localhost:3000/${endpoint}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        // 🚨 FIN DE LA LÍNEA FALTANTE 🚨

        if (!response.ok) {
            // Esta línea ahora puede acceder a 'response'
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); 
        
        // 🚨 CRÍTICO: Debugging de la data y el elemento
        console.groupCollapsed(`DEBUG: ${endpoint}`);
        console.log(`[1] selectId (Buscado): ${selectId}`);
        console.log(`[2] valueKey (ID): ${valueKey}`);
        console.log(`[3] textKey (Texto): ${textKey}`);
        console.log(`[4] Datos recibidos:`, data);
        
        const selectElement = document.getElementById(selectId);
        console.log(`[5] Elemento Select encontrado:`, selectElement);
        console.log(`[6] Data es array y no vacía: ${Array.isArray(data) && data.length > 0}`);
        console.groupEnd();
        // 🚨 FIN DEL DEBUGGING
        
        // ... (el resto de tu lógica para crear el defaultOption) ...
        selectElement.innerHTML = '';
        const defaultOption = document.createElement('option');
        
        const formattedEndpoint = endpoint.charAt(0).toUpperCase() + endpoint.slice(1).replace('_', ' ');
        defaultOption.textContent = `${formattedEndpoint}`;
        
        defaultOption.value = '';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);


        data.forEach(item => {
            const option = document.createElement('option');
            
            // 🚨 Añade un log aquí para verificar las claves
            if (item[valueKey] === undefined || item[textKey] === undefined) {
                 console.error(`ERROR: Clave no encontrada en ${endpoint}. Buscado: ${valueKey} y ${textKey}`, item);
            }
            
            option.value = item[valueKey];
            option.textContent = item[textKey];
            selectElement.appendChild(option);
        });
        
    } catch (error) {
        console.error(`Error al cargar los datos de ${endpoint}:`, error);
        alert(`Hubo un problema al cargar los datos.`);
    }
}

export async function obtenerEntidades(endpoint, buildTableFunction, user) { 
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
            buildTableFunction(entities, user);
        } else {
            alert('No pudimos obtener los datos. La respuesta del servidor es inesperada.');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al conectar con el servidor.');
    }
}