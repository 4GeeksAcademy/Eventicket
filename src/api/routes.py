"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Administrator, User, Event, Ticket, Favourite, Purchase
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route("/users", methods=["GET"])
def handle_users():
    try:
        users = User.query.all()
        users_serialized = list(map(lambda user: user.serialize(), users))
        return jsonify(users_serialized), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 404


@api.route("/events", methods=["GET"])
def handle_events():
    try:
        events = Event.query.all()
        events_serialized = list(map(lambda event: event.serialize(), events))
        return jsonify(events_serialized), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 404


# READ EVENTS in ID
@api.route("/events/<int:event_id>", methods=["GET"])
def read_event(event_id):
    try:
        event = Event.query.get(event_id)
        if event:
            return jsonify(event.serialize()), 200
        else:
            return jsonify({"error":f"event {event_id} does not exist"}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# CREATE EVENT
@api.route("/events", methods=["POST"])
def create_event():
    body = request.get_json()
    try:
        new_event = Event(
            name=body.get("name"),
            date=datetime.fromisoformat(body.get("date")),
            image_url=body.get("image_url"),
            place=body.get("place"),
            description=body.get("description"),
            category=body.get("category"),
            stock=body.get("stock"),
            admin_id=body.get("admin_id"),
        )
        db.session.add(new_event)
        db.session.commit()

        return jsonify(new_event.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# UPDATE EVENTS
@api.route("/events/<int:event_id>", methods=["PUT"])
def update_event(event_id):
    try:
        body = request.get_json()
        event = Event.query.get(event_id)
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
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# DELETE EVENTS
@api.route("/events/<int:event_id>", methods=["DELETE"])
def delete_event(event_id):
    try:
        event = Event.query.get(event_id)
        if event:
            db.session.delete(event)
            db.session.commit()
        else:
            return jsonify({"error":f"event {event_id} does not exist,can´t delete this"}), 404
        
        return jsonify({"message": "Event deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
