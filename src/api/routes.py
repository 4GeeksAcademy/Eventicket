"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Administrator,User,Event,Ticket,Favourite,Purchase
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import   create_access_token,get_jwt_identity,jwt_required,JWTManager
from flask_bcrypt import Bcrypt


api = Blueprint("api", __name__)
bcrypt = Bcrypt()
jwt = JWTManager()

# Allow CORS requests to this API
CORS(api)

#########################################################################################################
#########################################################################################################
#########################################################################################################
# ENDPOINTS DE  LECTURA DE EVENTOS
# CUALQUIERA PUEDE INGRESAR
#########################################################################################################
#########################################################################################################
#########################################################################################################
@api.route("/events", methods=["GET"])  
def handle_events():
    try:
        events = list(map(lambda event: event.serialize(), Event.query.all()))
        return jsonify(events), 200
    except Exception as e:
        return jsonify({"error": f"{e}"}), 400


# READ EVENTS in ID CUALQUIERA PUEDE INGRESAR
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


##############################################################################################
##############################################################################################
##############################################################################################
# CREATE USER
@api.route("/users", methods=["POST"])
def create_user():
    try:
        body = request.get_json()
        filter_user = User.query.filter_by(email=body.get("email")).first()
        
        if filter_user:
            return jsonify({"message": "User already exists"}), 400
        
        if  not body.get("name") or not body.get("email") or not body.get("password"):
            return jsonify({"message": "Error, all inputs must be completed"}), 400
        
        new_user = User(
            dni=body.get("dni"),
            name=body.get("name"),
            last_name=body.get("last_name"),
            email=body.get("email"),
            password=bcrypt.generate_password_hash(body.get("password")).decode('utf-8'),
            district=body.get("district"),
            phone=body.get("phone"),
            date_of_birth=datetime.fromisoformat(body.get("date_of_birth")),
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({"message": "New User Created", "user": new_user.serialize()}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


#Login de usuario ,paso 2,esto es despues de crearse una cuenta o cuando se vuelva a conectar,probado
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
            return jsonify({"error": "Contraseña incorrecta o usuario no existente"}),404

        access_token = create_access_token(identity=user.id)
        response={"access_token": access_token,
                   "id": user.id,
                   "dni": user.dni,
                   "name": user.name,
                   "last_name": user.last_name,
                   "email": user.email,
                   "password": user.password,
                   "district": user.district,
                   "phone": user.phone,
                   "date_of_birth": user.date_of_birth.isoformat()}
        return jsonify(response),200

    except Exception as e:
        return jsonify({"message": str(e)}), 500

#Este endpoint solo ingresara el user para poder ver sus datos estando logeado y nadie más pueda buscar su usuario por ID
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


#############################################################333
###############################################################3
###################################################################
###############################################################3333
##PARTE ADMIN##
############################################3
#######################################3333
@api.route("/loginadmin", methods=["POST"])
def log_in_admin():
    try:
        data=request.get_json()
        email=data.get("email")
        password=data.get("password")
        administrator=Administrator.query.filter_by(email=email).first()
        if administrator.email==email and administrator.password==password:
            access_token = create_access_token(identity=administrator.id)
            response={"access_token": access_token,
                   "id": administrator.id,
                   "name": administrator.name,
                   "last_name": administrator.last_name,
                   "email": administrator.email,
                   "password": administrator.password
                   }
        return jsonify(response),200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


#Este Endpoint unicamente puede ser para el administrador
# READ USERS
@api.route("/getusers", methods=["GET"])
@jwt_required()
def handle_users():
    try:
        current_admin = get_jwt_identity()
        administrator=Administrator.query.get(current_admin)
        if administrator:
            users = list(map(lambda event: event.serialize(), User.query.all()))
            return jsonify(users), 200
        else:
            return jsonify({"error": "Unauthorized"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# READ USER BY ID SOLO EL ADMINISTRADOR
@api.route("/users/<int:user_id>", methods=["GET"])
@jwt_required()
def read_user(user_id):
    try:
        user = User.query.get(user_id)
        current_admin = get_jwt_identity()
        administrator=Administrator.query.get(current_admin)
        if administrator:
            if user:
                return jsonify(user.serialize()), 200
            else:
                return jsonify({"error": "User not found"}), 404
        else:
            return jsonify({"error": "Unauthorized"}), 403   
    except Exception as e:
        return jsonify({"error": str(e)}), 400

##VALIDADO
# UPDATE USER ADMINISTRADOR y USUARIO LOGEADO NADA MÁS PUEDE INGRESAR
@api.route("/users/<int:user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id):
    try:
        body = request.get_json()
        user = User.query.get(user_id)
        current_admin = get_jwt_identity()
        administrator=Administrator.query.get(current_admin)
        if administrator:
            if user:
                user.dni = body.get("dni", user.dni)
                user.name = body.get("name", user.name)
                user.last_name = body.get("last_name", user.last_name)
                user.email = body.get("email", user.email)
                user.password = body.get("password", user.password)
                user.district = body.get("district", user.district)
                user.phone = body.get("phone", user.phone)
                user.date_of_birth = datetime.fromisoformat(body.get("date_of_birth"))
                db.session.commit()
            return jsonify(user.serialize()), 200
        else:
            return jsonify({"error": "Unauthorized"}), 403
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# DELETE USER ADMINISTRADOR NADA MÁS PUEDE INGRESAR
@api.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    try:
        current_admin = get_jwt_identity()
        administrator = Administrator.query.get(current_admin)
        if administrator:
            user = User.query.get(user_id)
            if user:
                db.session.delete(user)
                db.session.commit()
                return jsonify({"message": "User deleted successfully"}), 200
            else:
                return jsonify({"error": "User not found"}), 404
        else:
            return jsonify({"error": "Unauthorized"}), 403

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


###VALIDADOS"""2111
# CREATE EVENTS ADMINISTRADOR NADA MÁS PUEDE INGRESAR
@api.route("/events", methods=["POST"])
@jwt_required()
def create_event():
    try:
        current_admin = get_jwt_identity()
        administrator = Administrator.query.get(current_admin)
        if administrator:
            body = request.get_json()
            if (body.get("name") and body.get("date") and body.get("image_url") and body.get("place") and body.get("description") and body.get("category") and body.get("stock") and body.get("admin_id")):
                event_date = datetime.fromisoformat(body.get("date"))
                new_event = Event(
                    name=body.get("name"),
                    date=event_date,
                    image_url=body.get("image_url"),
                    place=body.get("place"),
                    description=body.get("description"),
                    category=body.get("category"),
                    stock=body.get("stock"),
                    admin_id=body.get("admin_id"),
                )
                
                db.session.add(new_event)
                db.session.commit()
                
                return jsonify({"message": "New Event Created", "event": new_event.serialize()}), 200
            else:
                return jsonify({"error": "Missing required fields"}), 400
        else:
            return jsonify({"error": "Unauthorized"}), 403
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# UPDATE EVENTS ADMINISTRADOR NADA MÁS PUEDE INGRESAR
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
            event.name = body.get("name", event.name)
            event.date = datetime.fromisoformat(body.get("date", event.date.isoformat()))
            event.image_url = body.get("image_url", event.image_url)
            event.place = body.get("place", event.place)
            event.description = body.get("description", event.description)
            event.category = body.get("category", event.category)
            event.stock = body.get("stock", event.stock)
            event.admin_id = body.get("admin_id", event.admin_id)
            db.session.commit()
            return jsonify(event.serialize()), 200
        else:
            return jsonify({"error": "Unauthorized"}), 403

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# DELETE EVENTS ADMINISTRADOR NADA MÁS PUEDE INGRESAR
@api.route("/events/<int:event_id>", methods=["DELETE"])
@jwt_required()
def delete_event(event_id):
    try:
        current_admin = get_jwt_identity()
        administrator = Administrator.query.get(current_admin)
        if administrator:
            event = Event.query.get(event_id)
            if event:
             db.session.delete(event)
             db.session.commit()
            return jsonify({"message": "Event deleted successfully"}), 200
        else:
            return jsonify({"error": "Unauthorized"}), 403
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
