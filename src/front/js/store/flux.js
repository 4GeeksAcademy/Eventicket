const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			events: [],
			users: [],
			usersError: null,
			ticket: [],
			currentUser: null,
			accessToken: null,
			admin: null,
			adminToken: null,
			adminError: null,
			events: [],
			eventCreationMessage: null,
			eventCreationError: null
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
				const store = getStore();
				let adminToken=localStorage.getItem("adminToken")
				try {
					console.log("llamando a getusers")
					const response = await fetch(process.env.BACKEND_URL + "/api/getusers", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${adminToken}`  // Agrega el token de autenticación
						}
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(`Error: ${errorData.error || response.statusText}`);
					}

					const data = await response.json();
					setStore({ users: data });
					return true;
				} catch (error) {
					console.error("Error al obtener los usuarios", error);
					setStore({ usersError: "Error al obtener los usuarios" });
					return false;
				}
			},

			createUser: async (userData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/users', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(userData),
					});

					if (response.ok) {
						const data = await response.json();
						console.log("Usuario creado exitosamente:", data);
						return true; // Indica que el usuario fue creado correctamente
					} else {
						const errorData = await response.json();
						console.error("Error al crear usuario:", errorData.message);
						return false; // Indica que hubo un error
					}
				} catch (error) {
					console.error("Error en la solicitud para crear usuario:", error);
					return false; // Indica que hubo un error en la solicitud
				}
			},

			deleteUser: async (userId) => {
				const store = getStore();  // Asumiendo que el token JWT está almacenado en localStorage
				let adminToken=localStorage.getItem("adminToken")
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/${userId}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${adminToken}`
						}
					});

					if (response.ok) {
						const data = await response.json();
						console.log(data.message);

						// Actualizar la lista de usuarios en el store
						const store = getStore();
						const updatedUsers = store.users.filter(user => user.id !== userId);
						setStore({ users: updatedUsers });

						return true;
					} else {
						const errorData = await response.json();
						console.error(errorData.error);
						return false;
					}
				} catch (error) {
					console.error("Error deleting user:", error);
					return false;
				}
			},

			loginUser: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							email: email,
							password: password,
						}),
					});

					if (response.ok) {
						const data = await response.json();
						setStore({
							currentUser: data, // Guardar los datos del usuario en el store
							accessToken: data.access_token, // Guardar el token de acceso
						});

						// Si prefieres guardar el token en localStorage:
						localStorage.setItem("access_token", data.access_token);

						console.log("Usuario logueado exitosamente:", data);
						return true; // Indica que el login fue exitoso
					} else {
						const errorData = await response.json();
						console.error("Error al iniciar sesión:", errorData.error);
						return false; // Indica que hubo un error
					}
				} catch (error) {
					console.error("Error en la solicitud de inicio de sesión:", error);
					return false; // Indica que hubo un error en la solicitud
				}
			},

			logoutUser: () => {
				// Acción para cerrar la sesión del usuario
				setStore({ currentUser: null, accessToken: null });
				localStorage.removeItem("access_token");
				console.log("Usuario deslogueado");
			},

			// Obtener el token almacenado en localStorage al iniciar la app
			loadAccessToken: () => {
				const token = localStorage.getItem("access_token");
				if (token) {
					setStore({ accessToken: token });
				}
			},

			// Acción para login del administrador
			loginAdmin: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/loginadmin", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					});

					if (response.ok) {
						const data = await response.json();
						// Guarda el token y los datos del administrador en el store
						localStorage.setItem("adminToken", data.access_token);
						setStore({
							admin: data,
							adminToken: data.access_token,
							adminError: null // Limpia cualquier error previo
						});
						return true; // Devuelve éxito
					} else {
						const errorData = await response.json();
						setStore({ adminError: errorData.message || "Error en el inicio de sesión" });
						return false; // Devuelve fallo
					}
				} catch (error) {
					setStore({ adminError: "Error de conexión con el servidor" });
					return false;
				}
			},

			// Método para verificar si el administrador está autenticado
			isAdminAuthenticated: () => {
				const store = getStore();
				return !!store.adminToken; // Retorna true si hay un token en el store
			},

			// Método para logout del administrador
			logoutAdmin: () => {
				localStorage.removeItem("adminToken");
				setStore({
					admin: null,
					adminToken: null,
					adminError: null
				});
			},

			// Acción para crear un evento
			createEvent: async (eventData) => {
				const store = getStore();  // Obtén el store actual
				let adminToken=localStorage.getItem("adminToken")

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/events", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${adminToken}`  // Agrega el token de autenticación
						},
						body: JSON.stringify(eventData)
					});

					// if (!response.ok) {
					// 	const errorData = await response.json();
					// 	throw new Error(`Error: ${errorData.error || response.statusText}`);
					// }

					const data = await response.json();
					console.log(data)
					setStore({ eventCreationMessage: "Evento creado con éxito" });
					return true;
				} catch (error) {
					console.error("Error al crear el evento", error);
					setStore({ eventCreationError: "Error al crear el evento" });
					return false;
				}
			},

			deleteEvent: async (eventId) => {
				const store = getStore();  // Asumiendo que el token JWT está almacenado en localStorage

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.adminToken || store.accessToken}`
						}
					});

					if (response.ok) {
						const data = await response.json();
						console.log(data.message);

						// Actualizar la lista de eventos en el store
						const store = getStore();
						const updatedEvents = store.events.filter(event => event.id !== eventId);
						setStore({ events: updatedEvents });

						return true;
					} else {
						const errorData = await response.json();
						console.error("Error al eliminar evento:", errorData.message);
						return false;
					}
				} catch (error) {
					console.error("Error en la solicitud para eliminar evento:", error);
					return false;
				}
			}, // Fin deleteEvent

			updateEvent: async (eventId, eventData) => {
				const store = getStore();  // Asumiendo que el token JWT está almacenado en localStorage

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.adminToken || store.accessToken}`
						},
						body: JSON.stringify(eventData)
					});

					if (response.ok) {
						const updatedEvent = await response.json();
						console.log("Event updated successfully:", updatedEvent);

						// Actualizar la lista de eventos en el store
						const store = getStore();
						const updatedEvents = store.events.map(event =>
							event.id === eventId ? updatedEvent : event
						);
						setStore({ events: updatedEvents });

						return true;
					} else {
						const errorData = await response.json();
						console.error("Error al actualizar evento:", errorData.message);
						return false;
					}
				} catch (error) {
					console.error("Error en la solicitud para actualizar evento:", error);
					return false;
				}
			}, // Fin updateEvent
		}
	};
};

export default getState;
