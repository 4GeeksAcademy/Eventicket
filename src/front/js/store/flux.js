const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			events: [],
			users: [],
			ticket: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			getEvents: async () => {
				try {
					// Llamada al backend
					const response = await fetch(process.env.BACKEND_URL + '/api/events', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});

					// Verifica si la respuesta es correcta
					if (response.ok) {
						const events = await response.json();  // Parsear los eventos
						setStore({ events: [...events] });  // Guardar los eventos en el store
					} else {
						console.error("Error al obtener los eventos:", response.statusText);
					}
				} catch (error) {
					console.error("Error en la llamada fetch de eventos:", error);
				}
			},
			getUsers: async () => {
				try {
					// Llamada al backend
					const response = await fetch(process.env.BACKEND_URL + '/api/users', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});

					// Verifica si la respuesta es correcta
					if (response.ok) {
						const users = await response.json();  // Parsear los eventos
						setStore({ users: [...users] });  // Guardar los eventos en el store
					} else {
						console.error("Error al obtener los eventos:", response.statusText);
					}
				} catch (error) {
					console.error("Error en la llamada fetch de eventos:", error);
				}
			}
		}
	};
};

export default getState;
