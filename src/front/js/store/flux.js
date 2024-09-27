const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			events: [],
			users: [],
			ticket: [],
			currentUser: JSON.parse(localStorage.getItem('currentUser')) || false,
			accessToken: localStorage.getItem("access_token") || false,
			admin: localStorage.getItem("admin") || false,
			adminToken: localStorage.getItem("adminToken") || false,
			favourites: [{ user_id: "", event_id: "" }],
			favorites: [],
		},
		actions: {
			getEvents: async () => {
				try {
					const response = await fetch("https://eventicket-backend.onrender.com" + '/events', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});
					const events = await response.json();
					setStore({ events: [...events] });
					console.log("Eventos obtenidos exitosamente:", events);
					return "Eventos obtenidos exitosamente"
				} catch (error) {
					console.error("Error en la llamada fetch de eventos:", error);
					return "Error en la llamada fetch de eventos"
				}
			},

			getUsers: async () => {
				try {
					let adminToken = localStorage.getItem("adminToken")
					const response = await fetch("https://eventicket-backend.onrender.com" + "/getusers", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${adminToken}`
						}
					});
					const data = await response.json();
					setStore({ users: data });
					return "Usuarios Obtenidos de manera exitosa";
				} catch (error) {
					console.error("Error al obtener los usuarios", error);
					return "Error al obtener los usuarios";
				}
			},

			createUser: async (userData) => {
				try {
					const response = await fetch("https://eventicket-backend.onrender.com" + '/users', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(userData),
					});

					const data = await response.json();
					if (!response.ok) {
						console.log("error " + data.message)
						return false
					}
					return true;
				} catch (error) {
					console.error("Error en la solicitud para crear usuario:", error);
					return false;
				}
			},

			deleteUser: async (userId) => {
				let adminToken = localStorage.getItem("adminToken")
				try {
					const response = await fetch(`${"https://eventicket-backend.onrender.com"}/users/${userId}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${adminToken}`
						}
					});

					const data = await response.json();
					const store = getStore();
					const updatedUsers = store.users.filter(user => user.id !== userId);
					setStore({ users: updatedUsers });
					return data.message;
				} catch (error) {
					console.error("Error deleting user:", error);
					return "Error deleting user";
				}
			},

			loginUser: async (email, password) => {
				try {
					const response = await fetch("https://eventicket-backend.onrender.com" + '/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							email: email,
							password: password,
						}),
					});
					const data = await response.json();
					if (!response.ok) {
						return false
					}
					localStorage.setItem("access_token", data.access_token);
					localStorage.setItem("currentUser", JSON.stringify(data));
					setStore({ currentUser: data, accessToken: data.access_token })
					return "Usuario logueado exitosamente";
				} catch (error) {
					console.error("Error en la solicitud de inicio de sesión:", error);
					return false;
				}
			},


			// Acción para actualizar la información del usuario
			updateUser: async (user_id, updatedData) => {
				const accessToken = localStorage.getItem("access_token")
				//console.log(accessToken)
				try {
					const response = await fetch(`${"https://eventicket-backend.onrender.com"}/users/${user_id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
						body: JSON.stringify(updatedData),
					});
					if (response.ok) {
						const data = await response.json();
						setStore({ currentUser: data });
						console.log("Usuario actualizado exitosamente", data);
					} else {
						const error = await response.json();
						console.error("Error al actualizar usuario:", error);
					}
				} catch (error) {
					console.error("Error en la conexión con el servidor:", error);
				}
			},

			loginAdmin: async (email, password) => {
				try {
					const response = await fetch("https://eventicket-backend.onrender.com" + "/loginadmin", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					});
					const data = await response.json();
					if (!response.ok) {
						return false
					}
					localStorage.setItem("adminToken", data.access_token);
					localStorage.setItem("admin", JSON.stringify(data));
					return "Administrador logueado exitosamente";
				} catch (error) {
					console.log("Error de conexión con el servidor" + "" + error)
					return false;
				}
			},


			logout: () => {
				if (localStorage.getItem("currentUser")) {
					localStorage.removeItem("currentUser");
					localStorage.removeItem("access_token");
					setStore({ accessToken: false, currentUser: false })
					return "Usuario Deslogeado"
				} else if (localStorage.getItem("admin")) {
					localStorage.removeItem("admin");
					localStorage.removeItem("adminToken");
					setStore({ adminToken: false, admin: false })
					return "Administrador deslogeado"
				}
			},

			// Acción para crear un evento
			createEvent: async (eventData) => {
				let adminToken = localStorage.getItem("adminToken")
				try {
					const response = await fetch("https://eventicket-backend.onrender.com" + "/events", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${adminToken}`
						},
						body: JSON.stringify(eventData)
					});

					const data = await response.json();
					console.log(data)
					return "Evento creado con éxito";
				} catch (error) {
					console.error("Error al crear el evento", error);
					return error;
				}
			},

			getEventById: async (eventId) => {
				let adminToken = localStorage.getItem("adminToken");

				try {
					const response = await fetch(`${"https://eventicket-backend.onrender.com"}/events/${eventId}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${adminToken}`
						}
					});
					const data = await response.json();
					if (!response.ok) {
						console.error(data)
						return false
					}
					return data;
				} catch (error) {
					console.error("Error al obtener el evento", error);
					return null;
				}
			},

			deleteEvent: async (eventId) => {
				try {
					const adminToken = localStorage.getItem("adminToken")
					const response = await fetch(`${"https://eventicket-backend.onrender.com"}/events/${eventId}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${adminToken}`
						}
					});

					const data = await response.json();
					console.log(data.message);
					const store = getStore();
					const updatedEvents = store.events.filter(event => event.id !== eventId);
					setStore({ events: updatedEvents });

					return true;
				} catch (error) {
					console.error("Error en la solicitud para eliminar evento:", error);
					return false;
				}
			}, // Fin deleteEvent

			updateEvent: async (eventId, eventData) => {
				const adminToken = localStorage.getItem("adminToken")
				try {
					const response = await fetch(`${"https://eventicket-backend.onrender.com"}/events/${eventId}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${adminToken}`
						},
						body: JSON.stringify(eventData)
					});
					const updatedEvent = await response.json();
					if (response.ok) {
						const store = getStore();
						const updatedEvents = store.events.map(event =>
							event.id === eventId ? updatedEvent : event
						);
						setStore({ events: updatedEvents });

						return "Evento Actualizado Exitosamente";
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
			addFavourite: async (event_id) => {
				try {
					const token = localStorage.getItem("access_token");
					if (!token) {
						console.error("No access token available");
						return false;
					}

					// Realiza la llamada POST al backend para agregar el favorito
					const response = await fetch("https://eventicket-backend.onrender.com" + '/favourites', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`  // Agrega el token en el encabezado de autorización
						},
						body: JSON.stringify({ event_id: event_id })  // Enviamos solo el event_id
					});
					const favourite = await response.json();  // Obtener el favorito agregado
					console.log(favourite)
					if (response.ok) {
						const store = getStore();

						// Actualiza el store con el nuevo favorito
						setStore({ favorites: [...store.favorites, favourite.favourite] });
						console.log("Favorito agregado exitosamente:", favourite);
						return true;  // Indica que la acción fue exitosa
					} else {
						const errorData = await response.json();
						console.error("Error al agregar favorito:", errorData.error);
						return false;  // Indica que hubo un error en la acción
					}
				} catch (error) {
					console.error("Error en la solicitud para agregar favorito:", error);
					return false;  // Indica que hubo un error en la solicitud
				}
			},

			getFavourites: async () => {
				try {
					const token = localStorage.getItem("access_token");
					if (!token) {
						console.error("No access token available");
						return false;
					}

					// Realiza la llamada GET al backend para obtener los favoritos del usuario
					const response = await fetch("https://eventicket-backend.onrender.com" + "/favourites", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`  // Incluye el token en el encabezado de autorización
						}
					});

					if (response.ok) {
						const favourites = await response.json();
						const eventDetailsPromises = favourites.map(async (favourite) => {
							const eventResponse = await fetch("https://eventicket-backend.onrender.com" + `/events/${favourite.event_id}`, {
								method: "GET",
								headers: {
									"Content-Type": "application/json",
									"Authorization": `Bearer ${token}`  // Incluye el token
								}
							});
							return eventResponse.ok ? await eventResponse.json() : null;
						});

						// Esperamos todas las promesas para obtener los detalles de los eventos
						const eventDetails = await Promise.all(eventDetailsPromises);

						// Filtramos eventos válidos (no nulos)
						const validEventDetails = eventDetails.filter(event => event !== null);

						// Guardamos los detalles de los eventos en el store como favoritos
						setStore({ favorites: validEventDetails });
						console.log("Favoritos obtenidos exitosamente:", validEventDetails);
					} else {
						const errorData = await response.json();
						console.error("Error al obtener favoritos:", errorData.error);
					}
				} catch (error) {
					console.error("Error en la solicitud para obtener favoritos:", error);
				}
			},

			sendEmailToRecover: async (email) => {
				try {
					const data = await fetch("https://eventicket-backend.onrender.com" + '/recovery', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ "email": email })
					})
					const response = await data.json()
					return response
				} catch (error) {
					console.log(error)
				}
			},
			changepass: async (token, new_password) => {
				try {
					const data = await fetch("https://eventicket-backend.onrender.com" + '/changepass', {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify({ "new_password": new_password })
					})
					const response = await data.json()
					return response
				} catch (error) {
					console.log(error)
				}
			},
			createPurchase: async (event_id, state, quantity) => {
				try {
					const token = localStorage.getItem("access_token");
					if (!token) {
						console.error("No access token available");
						return false;
					}

					// Validamos que el estado sea "COMPLETED" antes de hacer la solicitud
					if (state !== "COMPLETED") {
						console.error("Purchase cannot be completed: Invalid status");
						return false;
					}

					// Realizamos la solicitud POST al backend
					const response = await fetch("https://eventicket-backend.onrender.com" + "/purchases", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}` // Token JWT
						},
						body: JSON.stringify({
							event_id: event_id,
							estado: state,
							quantity: quantity,
						}),
					});


					// Si la respuesta es exitosa, obtenemos la compra realizada
					if (response.ok) {
						const data = await response.json();
						console.log("Purchase created successfully:", data);
						return true;  // Indicamos que la compra fue exitosa
					} else {
						const errorData = await response.json();
						console.error("Error creating purchase:", errorData.error);
						return false;  // Indicamos que hubo un error en la compra
					}
				} catch (error) {
					console.error("Error in the purchase request:", error);
					return false;  // Indicamos que hubo un error general
				}
			},

			getTicketsByUser: async () => {
				try {
					const token = localStorage.getItem("access_token");
					const response = await fetch("https://eventicket-backend.onrender.com" + "/tickets/user", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					});

					if (!response.ok) {
						const errorData = await response.json();
						console.error("Error fetching tickets:", errorData.error);
						return null;
					}

					const data = await response.json();
					console.log("Tickets data:", data);
					return data;
				} catch (error) {
					console.error("Error in getTicketsByUser:", error);
					return null;
				}
			},

		}
	};
};

export default getState;
