"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Administrator, User, Event, Ticket, Favourite, Purchase
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
from datetime import timedelta
import os

api = Blueprint("api", __name__)
bcrypt = Bcrypt()
jwt = JWTManager()
mail = Mail()  # Inicializar Mail sin configuraciones

# Allow CORS requests to this API
CORS(api)


#OBTENER LOS EVENTOS (TODOS)
@api.route("/events", methods=["GET"])
def handle_events():
    try:
        events = list(map(lambda event: event.serialize(), Event.query.all()))
        return jsonify(events), 200
    except Exception as e:
        return jsonify({"error": f"{e}"}), 400


# LEER EVENTOS POR ID (TODOS)
@api.route("/events/<int:event_id>", methods=["GET"])
def read_event(event_id):
    try:
        event = Event.query.get(event_id)
        if event:
            return jsonify(event.serialize()), 200
        else:
            return jsonify({"error": "Event not found"}), 404
    except Exception as e:
        return jsonify({"error": f"{e}"}), 400


#CREAR USUARIOS (TODOS)
@api.route("/users", methods=["POST"])
def create_user():
    try:
        body = request.get_json()
        filter_user = User.query.filter_by(email=body.get("email")).first()
        if filter_user:
            return jsonify({"message": "User already exists"}), 400

        if not body.get("name") or not body.get("email") or not body.get("password"):
            return jsonify({"message": "Error, name, email, and password must be completed"}), 400

        new_user = User(
            dni=body.get("dni", None),
            name=body.get("name"),
            last_name=body.get("last_name", ""),
            email=body.get("email"),
            password=bcrypt.generate_password_hash(body.get("password")).decode('utf-8'),
            district=body.get("district", None),
            phone=body.get("phone", None),
            date_of_birth=body.get("date_of_birth")
        )

        db.session.add(new_user)
        db.session.commit()
        return jsonify({
            "message": "New User Created",
            "user": new_user.serialize()
        }), 200

    except Exception as er:
        db.session.rollback()
        return jsonify({"error": str(er)}), 400


#LOGEARSE COMO USUARIO (USUARIO)
@api.route("/login", methods=["POST"])
def log_in_user():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "data have to be complete"}), 400
        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        user_password = user.password

        checking_password = bcrypt.check_password_hash(user_password, password)

        if not checking_password:
            return jsonify({"error": "Contraseña incorrecta o usuario no existente"}), 404

        access_token = create_access_token(identity=user.id)
        response = {
            "access_token": access_token,
            "id": user.id,
            "dni": user.dni,
            "name": user.name,
            "last_name": user.last_name,
            "email": user.email,
            "password": user.password,
            "district": user.district,
            "phone": user.phone
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500

#LEER DATOS DE UN USUARIO LOGEADO (USUARIO)
@api.route("/user/", methods=["GET"])
@jwt_required()
def read_user_data():
    try:
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        if user:
            return jsonify({"user_data": user.serialize()}), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400


#LOGEARSE COMO ADMINISTRADOR (ADMIN)
@api.route("/loginadmin", methods=["POST"])
def log_in_admin():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        administrator = Administrator.query.filter_by(email=email).first()
        if administrator:
            access_token = create_access_token(identity=administrator.id)
            response = {
                "access_token": access_token,
                "id": administrator.id,
                "name": administrator.name,
                "last_name": administrator.last_name,
                "email": administrator.email,
                "password": administrator.password
            }
            return jsonify(response), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    except Exception as e:
        return jsonify({"message": str(e)}), 500


# MOSTRAR USUARIOS REGISTRADOS (ADMIN)
@api.route("/getusers", methods=["GET"])
@jwt_required()
def handle_users():
    try:
        current_admin = get_jwt_identity()
        administrator = Administrator.query.get(current_admin)
        if administrator:
            users = list(map(lambda user: user.serialize(), User.query.all()))
            return jsonify(users), 200
        else:
            return jsonify({"error": "Unauthorized"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# OBTENER USUARIO POR ID (ADMIN)
@api.route("/users/<int:user_id>", methods=["GET"])
@jwt_required()
def read_user(user_id):
    try:
        user = User.query.get(user_id)
        current_admin = get_jwt_identity()
        administrator = Administrator.query.get(current_admin)
        user_logged = User.query.get(current_admin)

        if administrator and not user_logged:
            if user:
                return jsonify(user.serialize()), 200
            else:
                return jsonify({"error": "User not found"}), 404
        else:
            return jsonify({"error": "Unauthorized"}), 403
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ACTUALIZAR USUARIO (ADMIN/USUARIO)
@api.route("/users/<int:user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id):
    try:
        body = request.get_json()
        user = User.query.get(user_id)
        current_admin = get_jwt_identity()
        administrator = Administrator.query.get(current_admin)
        if administrator or current_admin == user_id:
            if user:
                user.dni = body.get("dni", user.dni)
                user.name = body.get("name", user.name)
                user.last_name = body.get("last_name", user.last_name)
                user.email = body.get("email", user.email)
                user.password = bcrypt.generate_password_hash(body.get("password")).decode('utf-8') if body.get("password") else user.password
                user.district = body.get("district", user.district)
                user.phone = body.get("phone", user.phone)
                user.date_of_birth = body.get("date_of_birth",user.date_of_birth)
                db.session.commit()
                return jsonify(user.serialize()), 200
            else:
                return jsonify({"error": "User not found"}), 404
        else:
            return jsonify({"error": "Unauthorized"}), 403
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# BORRAR USUARIO (ADMIN)
@api.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    try:
        current_admin = get_jwt_identity()
        administrator = Administrator.query.get(current_admin)
        user_logged=User.query.get(current_admin)
        if not administrator and user_logged:
            return jsonify({"error": "Unauthorized"}), 403
        elif administrator and not user_logged:
            user = User.query.get(user_id)
            if user:
                db.session.delete(user)
                db.session.commit()
                return jsonify({"message": "User deleted successfully"}), 200
            else:
                return jsonify({"error": "User not found"}), 404


    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# CREAR EVENTOS (ADMIN)
@api.route("/events", methods=["POST"])
@jwt_required()
def create_event():
    try:
        current_admin = get_jwt_identity()
        administrator = Administrator.query.get(current_admin)
        #user_logged = User.query.get(current_admin)
        #and not user_logged

        if administrator :
            body = request.get_json()
            print(body)
            new_event = Event(
            title=body.get("title"),
            description=body.get("description"),
            date=body.get("date"),
            time=body.get("time"),
            location=body.get("location"),
            image_url=body.get("image_url"),
            price=float(body.get("price")),  
            stock=int(body.get("stock")),
            category=body.get("category"),
            administrator_id=body.get("administrator_id")
            )

            db.session.add(new_event)
            db.session.commit()
            return jsonify({"message": "Event created", "event": new_event.serialize()}), 201
        else:
            return jsonify({"error": "Unauthorized"}), 403

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# ACTUALIZAR EVENTOS (ADMIN)
@api.route("/events/<int:event_id>", methods=["PUT"])
@jwt_required()
def update_event(event_id):
    try:
        current_admin = get_jwt_identity()
        administrator = Administrator.query.get(current_admin)

        if administrator:     
            body = request.get_json()
            event = Event.query.get(event_id)
            if event:
                event.title = body.get("title", event.title)
                event.description = body.get("description", event.description)
                event.date = body.get("date",event.date)
                event.time=body.get("time",event.time)
                event.location = body.get("location", event.location)
                event.category= body.get("category", event.category)
                event.image_url = body.get("image_url", event.image_url)
                event.price = body.get("price", event.price)
                event.stock = body.get("stock", event.stock)

                db.session.commit()
                return jsonify(event.serialize()), 200
            else:
                return jsonify({"error": "Event not found"}), 404
        else:
            return jsonify({"error": "Unauthorized"}), 403

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# BORRAR EVENTOS (ADMIN)
@api.route("/events/<int:event_id>", methods=["DELETE"])
@jwt_required()
def delete_event(event_id):
    try:
        current_admin = get_jwt_identity()
        administrator = Administrator.query.get(current_admin)
        user_logged = User.query.get(current_admin)

        if administrator and not user_logged:
            event = Event.query.get(event_id)
            if event:
                db.session.delete(event)
                db.session.commit()
                return jsonify({"message": "Event deleted successfully"}), 200
            else:
                return jsonify({"error": "Event not found"}), 404
        else:
            return jsonify({"error": "Unauthorized"}), 403
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# OBTENER TODOS LOS TICKETS (ADMIN)
@api.route("/tickets", methods=["GET"])
@jwt_required()
def handle_tickets():
    try:
        current_admin = get_jwt_identity()
        administrator = Administrator.query.get(current_admin)
        user_logged = User.query.get(current_admin)
        if administrator and not user_logged:
            tickets = list(map(lambda ticket: ticket.serialize(), Ticket.query.all()))
        return jsonify(tickets), 200
    except Exception as e:
        return jsonify({"error": f"{e}"}), 400


# OBTENER TICKET POR ID (ADMIN / USUARIO)
@api.route("/tickets/user", methods=["GET"])
@jwt_required()
def read_tickets_by_user():
    try:
        current_user_id = get_jwt_identity()
        administrator = Administrator.query.get(current_user_id)
        user_logged = User.query.get(current_user_id)

        if administrator:
            tickets = Ticket.query.all()  # Si es administrador, obtiene todos los tickets
            if tickets:
                return jsonify([ticket.serialize() for ticket in tickets]), 200
            else:
                return jsonify({"error": "No tickets found"}), 404
        elif user_logged:
            tickets = Ticket.query.filter_by(user_id=current_user_id).all()  # Solo obtiene los tickets del usuario autenticado
            if tickets:
                return jsonify([ticket.serialize() for ticket in tickets]), 200
            else:
                return jsonify({"error": "No tickets found for this user"}), 404
        else:
            return jsonify({"error": "Unauthorized"}), 403
            
    except Exception as e:
        return jsonify({"error": str(e)}), 400



# OBTENER ELIMINAR TICKET POR ID (ADMIN)
@api.route("/tickets/<int:ticket_id>", methods=["DELETE"])
@jwt_required()
def delete_ticket(ticket_id):
    try:
        current_admin = get_jwt_identity()
        administrator = Administrator.query.get(current_admin)
        user_logged = User.query.get(current_admin)
        if administrator and not user_logged:
            ticket = Ticket.query.get(ticket_id)
            if ticket:
                db.session.delete(ticket)
                db.session.commit()
                return jsonify({"message": f"Your Ticket {ticket.id} wa deleted successfully"}), 200
            else:
                return jsonify({"error": "Ticket not found"}), 404
    except Exception as e:
        return jsonify({"error": f"{e}"}), 400



#CREAR UN FAVORITOS DE UN USUARIO LOGUEADO (USER)
@api.route("/favourites", methods=["POST"])
@jwt_required()
def create_favourite():
    try:
        current_user = get_jwt_identity()
        body = request.get_json()
        user_logged = User.query.get(current_user)
        event=Event.query.filter_by(id=body.get("event_id")).first()
        favourite_added=Favourite.query.filter_by(user_id=current_user,event_id=event.id).first()

        if not user_logged or not body.get("event_id") or not event:
            return jsonify({"error": "you must to add an exist event or be loggued to add"}), 400
        
        if not favourite_added:
            new_favourite = Favourite(
            user_id=current_user,
            event_id=body.get("event_id"))
            db.session.add(new_favourite)
            db.session.commit()
            return jsonify({"message": "Favourite added", "favourite": new_favourite.serialize()}), 201

        return jsonify({"error": f"Event {event.title} has beend added previusly"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

#LEER EVENTOS FAVORITOS DE UN USUARIO LOGEADO (USER)
@api.route("/favourites", methods=["GET"])
@jwt_required()
def handle_favourites():
    try:
        current_user = get_jwt_identity()
        user_logged = User.query.get(current_user)

        if not current_user or not user_logged:
            return jsonify({"error": f"You need to be loggued as a user"}), 400
        favourites = Favourite.query.filter_by(user_id=current_user).all()
        favourites_list = list(map(lambda fav: fav.serialize(), favourites))
        return jsonify(favourites_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

#LEER EVENTOS FAVORITOS POR ID DE UN USUARIO LOGEADO (USER)
@api.route("/favourites/<int:favourite_id>", methods=["GET"])
@jwt_required()
def read_favourite(favourite_id):
    try:
        current_user = get_jwt_identity()
        favourite = Favourite.query.filter_by(id=favourite_id, user_id=current_user).first()
        if favourite:
            return jsonify(favourite.serialize()), 200
        else:
            return jsonify({"error": "Favourite not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Borrar Un elemento de favorito POR ID(user)
@api.route("/favourites/<int:favourite_id>", methods=["DELETE"])
@jwt_required()
def delete_favourite(favourite_id):
    try:
        current_user = get_jwt_identity()
        favourite = Favourite.query.filter_by(id=favourite_id, user_id=current_user).first()
        if favourite:
            db.session.delete(favourite)
            db.session.commit()
            return jsonify({"message": "Favourite deleted successfully"}), 200
        else:
            return jsonify({"error": "Favourite not found"}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400



# Crear Compra con tickets asignados (USER)
@api.route("/purchases", methods=["POST"])
@jwt_required()
def create_purchase():
    try:
        current_user = get_jwt_identity()
        body = request.get_json()
        estado=body.get("estado")

        if not estado=="COMPLETED":
            return jsonify({"error": "Purchase Cannot be Completed"}), 400

        event = Event.query.get(body.get("event_id"))
        if not event:
            return jsonify({"error": "Event not found"}), 404

        quantity = body.get("quantity")
        if event.stock < quantity:
            return jsonify({"error": "Not enough tickets available"}), 400

        total_price = event.price * quantity

        new_purchase = Purchase(
            user_id=current_user,
            event_id=event.id,
            quantity=quantity,
            total_price=total_price,
            estado=estado
        )

        event.stock -= quantity

        db.session.add(new_purchase)
        db.session.commit()

        # Crear tickets
        for _ in range(quantity):
            ticket = Ticket(
                price=event.price,
                event_id=event.id,
                user_id=current_user,
                purchase_id=new_purchase.id
            )
            db.session.add(ticket)

        db.session.commit()

        return jsonify({"message": "Purchase created", "purchase": new_purchase.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# OBTENER COMPRAS DE UN USUARIO LOGEADO (USUARIO)
@api.route("/purchases", methods=["GET"])
@jwt_required()
def handle_purchases():
    try:
        current_user = get_jwt_identity()
        purchases = Purchase.query.filter_by(user_id=current_user).all()
        result = list(map(lambda purchase: purchase.serialize(), purchases))
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# LEER COMPRA POR ID DE UN USUARIO LOGEADO (USUARIO)
@api.route("/purchases/<int:purchase_id>", methods=["GET"])
@jwt_required()
def read_purchase(purchase_id):
    try:
        current_user = get_jwt_identity()
        purchase = Purchase.query.filter_by(id=purchase_id, user_id=current_user).first()
        if purchase:
            purchase_data = purchase.serialize()
            purchase_data["tickets"] = list(map(lambda ticket: ticket.serialize(), purchase.tickets))
            return jsonify(purchase_data), 200
        else:
            return jsonify({"error": "Purchase not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400



# BORRAR COMPRA (ADMIN)
@api.route("/purchases/<int:purchase_id>", methods=["DELETE"])
@jwt_required()
def delete_purchase(purchase_id):
    try:
        current_admin = get_jwt_identity()
        administrator = Administrator.query.get(current_admin)
        purchase = Purchase.query.filter_by(id=purchase_id).first()

        if not administrator:
            return jsonify({"error": "You are not an admin"}), 404

        if purchase:
            # Eliminar tickets asociados
            for ticket in purchase.tickets:
                db.session.delete(ticket)

            # Eliminar la compra
            db.session.delete(purchase)
            db.session.commit()
            return jsonify({"message": "Purchase deleted successfully"}), 200
        else:
            return jsonify({"error": "Purchase not found"}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


#ENVIAR CORREO DE RECUPERACION DE CONTRASEÑA (USER)
@api.route("/recovery", methods=['POST'])
def recovery_password():
    try:
        body = request.get_json()
        email = body.get("email")
        user = User.query.filter_by(email=email).first()
        if not user or not email:
            return jsonify({"Error":f"{email} does not exist"})
        
        access_token = create_access_token(identity=user.id,expires_delta=timedelta(minutes=10))
        msg = Message(subject="Password Recovery",
                      recipients=[email])
        msg.body = f"Click en el siguiente enlace para recuperar tu contraseña:\n" \
                   f"{os.getenv('FRONTEND_URL')}/restablecer?token={access_token}"

        mail.send(msg)
        return jsonify({"msg": f"Recovery email sent to {email}"}), 200
    except Exception as e:
        return jsonify({"Error":f"{email} does not exist"})

#ACTUALIZAR CONTRASEÑA POST VALIDACION (USER)
@api.route("/changepass",methods=['PUT'])
@jwt_required()
def modify_password():
    try:        
        current_user = get_jwt_identity()
        user=User.query.filter_by(id=current_user).first()
        if not current_user or not user:
            return jsonify({"Error":f"Just Happened this error:{e}"})

        body=request.get_json()
        new_password=body.get("new_password")
        hashed_password=bcrypt.generate_password_hash(new_password).decode('utf-8'),
        user.password=hashed_password
        db.session.commit()
        return jsonify({"Message":f"The User:{user.name} has updated his password to:{new_password}"})
    except Exception as e:
        return jsonify({"Error":f"Just Happened this error:{e}"})
    




####################################################################################################################################################
###################################################################################################################################################
#ENDPOINTS EXTRA
####################################################################################################################################################
###################################################################################################################################################

   
                        
# # ENDPOINT PARA CREAR TICKETS
# @api.route('/tickets', methods=['POST'])
# @jwt_required()
# def create_ticket():
#     body = request.get_json()
#     try:
#         user_id = body.get('user_id')
#         event_id = body.get('event_id')
#         quantity = body.get('quantity')

#         if not user_id or not event_id or not quantity:
#             return jsonify({"error": "user_id, event_id, and quantity are required"}), 400

#         event = Event.query.get(event_id)
#         if not event:
#             return jsonify({"error": "Event not found"}), 404

#         if event.stock < quantity:
#             return jsonify({"error": "Not enough tickets available"}), 400

#         new_ticket = Ticket(
#             user_id=user_id,
#             event_id=event_id,
#             quantity=quantity
#         )
#         event.stock -= quantity
#         db.session.add(new_ticket)
#         db.session.commit()
#         return jsonify({"message": "Tickets purchased successfully", "ticket": new_ticket.serialize()}), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 400



# # ENDPOINT PARA ELIMINAR UN TICKET
# @api.route('/tickets/<int:ticket_id>', methods=['DELETE'])
# @jwt_required()
# def delete_ticket(ticket_id):
#     try:
#         ticket = Ticket.query.get(ticket_id)
#         if ticket:
#             event = Event.query.get(ticket.event_id)
#             event.stock += ticket.quantity
#             db.session.delete(ticket)
#             db.session.commit()
#             return jsonify({"message": "Ticket canceled successfully"}), 200
#         else:
#             return jsonify({"error": "Ticket not found"}), 404
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 400




# # READ PURCHASES
# @api.route('/purchases', methods=['GET'])
# def handle_purchases():
#     purchases = Purchase.query.all()
#     return jsonify(list(map(lambda purchase: purchase.serialize(), purchases))), 200

# # READ PURCHASE BY ID
# @api.route('/purchases/<int:purchase_id>', methods=['GET'])
# def read_purchase(purchase_id):
#     purchase = Purchase.query.get(purchase_id)
#     if purchase:
#         return jsonify(purchase.serialize()), 200
#     else:
#         return jsonify({"error": "Purchase not found"}), 404

# # CREATE PURCHASE
# @api.route('/purchases', methods=['POST'])
# def create_purchase():
#     body = request.get_json()
#     try:
#         new_purchase = Purchase(
#             user_id=body.get('user_id'),
#             event_id=body.get('event_id')
#         )
#         db.session.add(new_purchase)
#         db.session.commit()
#         return jsonify(new_purchase.serialize()), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 400

# # UPDATE PURCHASE
# @api.route('/purchases/<int:purchase_id>', methods=['PUT'])
# def update_purchase(purchase_id):
#     body = request.get_json()
#     purchase = Purchase.query.get(purchase_id)
#     if purchase:
#         try:
#             purchase.user_id = body.get('user_id', purchase.user_id)
#             purchase.event_id = body.get('event_id', purchase.event_id)
#             db.session.commit()
#             return jsonify(purchase.serialize()), 200
#         except Exception as e:
#             db.session.rollback()
#             return jsonify({"error": str(e)}), 400
#     else:
#         return jsonify({"error": "Purchase not found"}), 404

# # DELETE PURCHASE
# @api.route('/purchases/<int:purchase_id>', methods=['DELETE'])
# def delete_purchase(purchase_id):
#     purchase = Purchase.query.get(purchase_id)
#     if purchase:
#         try:
#             db.session.delete(purchase)
#             db.session.commit()
#             return jsonify({"message": "Purchase deleted successfully"}), 204
#         except Exception as e:
#             db.session.rollback()
#             return jsonify({"error": str(e)}), 400
#     else:
#         return jsonify({"error": "Purchase not found"}), 404


# # ENDPOINT PARA AGREGAR FAVORITOS
# @api.route('/favorites', methods=['POST'])
# @jwt_required()
# def add_favorite():
#     body = request.get_json()
#     try:
#         user_id = body.get('user_id')
#         event_id = body.get('event_id')
        
#         if not user_id or not event_id:
#             return jsonify({"error": "user_id and event_id are required"}), 400
        
#         existing_favorite = Favourite.query.filter_by(user_id=user_id, event_id=event_id).first()
#         if existing_favorite:
#             return jsonify({"message": "Event already in favorites"}), 400
        
#         new_favorite = Favourite(user_id=user_id, event_id=event_id)
#         db.session.add(new_favorite)
#         db.session.commit()
#         return jsonify({"message": "Favorite added successfully", "favorite": new_favorite.serialize()}), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 400

