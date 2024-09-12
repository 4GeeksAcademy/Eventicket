"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Event
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
def handle_users():
    if request.method == 'GET':
        users = User.query.all()  
        users_serialized = [user.serialize() for user in users]  
        return jsonify(users_serialized), 200
    
#EVENTS
#READ EVENTS
@api.route('/events', methods=['GET'])
def handle_events():
    if request.method == 'GET':
        events = Event.query.all()  
        events_serialized = [event.serialize() for event in events]  
        return jsonify(events_serialized), 200
    
#READ EVENTS in ID 
@api.route('/events/<int:event_id>', methods=['GET'])
def read_event(event_id):
    event = Event.query.get(event_id)
    if event:
        return jsonify(event.serialize()), 200
    else:
        return jsonify({"error": "Event not found"}), 404
        
#CREATE EVENTS
@api.route('/events', methods=['POST'])
def create_event():
    body = request.get_json()
    try:
        new_event = Event(
            name=body.get('name'),
            date=datetime.fromisoformat(body.get('date')),
            image_url=body.get('image_url'),
            place=body.get('place'),
            description=body.get('description'),
            category=body.get('category'),
            stock=body.get('stock'),
            admin_id=body.get('admin_id')
        )
        db.session.add(new_event)
        db.session.commit()
        return jsonify(new_event.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

#UPDATE EVENTS
@api.route('/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    body = request.get_json()
    event = Event.query.get(event_id)
    if event:
        try:
            event.name = body.get('name', event.name)
            event.date = datetime.fromisoformat(body.get('date', event.date.isoformat()))
            event.image_url = body.get('image_url', event.image_url)
            event.place = body.get('place', event.place)
            event.description = body.get('description', event.description)
            event.category = body.get('category', event.category)
            event.stock = body.get('stock', event.stock)
            event.admin_id = body.get('admin_id', event.admin_id)

            db.session.commit()
            return jsonify(event.serialize()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "Event not found"}), 404

#DELETE EVENTS
@api.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Event.query.get(event_id)
    if event:
        try:
            db.session.delete(event)
            db.session.commit()
            return jsonify({"message": "Event deleted successfully"}), 204
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "Event not found"}), 404
    
#USERS
# READ USER
@api.route('/users', methods=['GET'])
def handle_users():
    if request.method == 'GET':
        users = User.query.all()  
        users_serialized = [user.serialize() for user in users]  
        return jsonify(users_serialized), 200
    
# READ USER BY ID
@api.route('/users/<int:user_id>', methods=['GET'])
def read_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({"error": "User not found"}), 404
    
# CREATE USER
@api.route('/users', methods=['POST'])
def create_user():
    body = request.get_json()
    try:
        new_user = User(
            dni=body.get('dni'),
            name=body.get('name'),
            last_name=body.get('last_name'),
            email=body.get('email'),
            password=body.get('password'),
            district=body.get('district'),
            phone=body.get('phone'),
            date_of_birth=datetime.fromisoformat(body.get('date_of_birth')) if body.get('date_of_birth') else None
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# UPDATE USER
@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    body = request.get_json()
    user = User.query.get(user_id)
    if user:
        try:
            user.dni = body.get('dni', user.dni)
            user.name = body.get('name', user.name)
            user.last_name = body.get('last_name', user.last_name)
            user.email = body.get('email', user.email)
            user.password = body.get('password', user.password)
            user.district = body.get('district', user.district)
            user.phone = body.get('phone', user.phone)
            user.date_of_birth = datetime.fromisoformat(body.get('date_of_birth')) if body.get('date_of_birth') else user.date_of_birth
            db.session.commit()
            return jsonify(user.serialize()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "User not found"}), 404

# DELETE USER
@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        try:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"message": "User deleted successfully"}), 204
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "User not found"}), 404