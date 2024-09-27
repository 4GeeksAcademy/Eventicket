from flask_sqlalchemy import SQLAlchemy
from datetime import datetime,time

db = SQLAlchemy()

class Administrator(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    events = db.relationship("Event", backref="administrator", lazy=True)
    
    def __repr__(self):
        return f"<Admin Name {self.name}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
        }

            
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dni = db.Column(db.Integer, nullable=True)
    name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80),nullable=False)
    district = db.Column(db.String(20), nullable=True)
    phone = db.Column(db.String(12), nullable=True)
    date_of_birth = db.Column(db.Date, nullable=True)
    purchases = db.relationship("Purchase", backref="user", lazy=True)
    favourites = db.relationship("Favourite", backref="user", lazy=True)
    tickets = db.relationship("Ticket", backref="user", lazy=True)

    def __repr__(self):
        return f"<User {self.email}>"

    def serialize(self):
        return {
            "id": self.id,
            "dni": self.dni,
            "name": self.name,
            "last_name": self.last_name,
            "email": self.email,
            "district": self.district,
            "phone": self.phone,
            "date_of_birth": self.date_of_birth.isoformat() if self.date_of_birth else None,
            "purchases": list(map(lambda purchase: purchase.serialize(), self.purchases)),
            "favourites": list(map(lambda favourite: favourite.serialize(), self.favourites)),
            "tickets": list(map(lambda ticket: ticket.serialize(), self.tickets))
        }

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)  # Nuevo campo para la hora del evento
    location = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255))
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    administrator_id = db.Column(db.Integer, db.ForeignKey('administrator.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "category":self.category,
            "date": self.date.isoformat(),
            "time": self.time.isoformat(),
            "location": self.location,
            "image_url": self.image_url,
            "price": self.price,
            "stock": self.stock,
            "administrator_id": self.administrator_id
        }

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float, nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey("event.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    purchase_id = db.Column(db.Integer, db.ForeignKey("purchase.id"), nullable=False)

    def __repr__(self):
        return f"<Ticket ID {self.id}>"

    def serialize(self):
        return {
            "numero_ticket": self.id,
            "price": self.price,
            "event_id": self.event_id,
            "owner": self.user_id,
            "purchase_id": self.purchase_id
        }

class Favourite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey("event.id"), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "event_id": self.event_id,
            "user_id": self.user_id
        }

class Purchase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    purchase_date = db.Column(db.DateTime, default=datetime.utcnow)
    estado = db.Column(db.String(50), nullable=False, default='pendiente')
    tickets = db.relationship('Ticket', backref='purchase', lazy=True)

    def serialize(self):
        return {
            "id_compra": self.id,
            "user_id": self.user_id,
            "event_id": self.event_id,
            "quantity": self.quantity,
            "total_price": self.total_price,
            "purchase_date": self.purchase_date.isoformat(),
            "estado": self.estado,
            "tickets": list(map(lambda ticket: ticket.serialize(), self.tickets))
        }
