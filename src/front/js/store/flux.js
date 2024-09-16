const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			events: [],
			users: [],
			ticket: [],
			currentUser: null,
			accessToken: null,
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
			}, createUser: async (userData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + 'api/users', {
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
			}, loginUser: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + 'api/login', {
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
		}
	};
};

export default getState;
