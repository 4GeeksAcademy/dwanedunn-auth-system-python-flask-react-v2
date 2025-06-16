"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

# https://flask-jwt-extended.readthedocs.io/en/stable/basic_usage.html
# Flask_JWT_Extended_Imports - ??
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# Create the JWT


@api.route('/token', methods=['POST'])
def create_token():
    data = request.get_json()
    email_value = data.get("email")
    password_value = data.get("password")
    if not email_value or not password_value:
        return jsonify({"msg": "Bad email or password"}), 401
    find_user = User.query.filter_by(email=email_value).first()
    if not find_user:
        return jsonify({"message": "Invalid login"}), 401
    if find_user.password != password_value:
        return jsonify({"message": "Invalid password"}), 401
    access_token = create_access_token(identity=email_value)
    return jsonify(access_token=access_token), 200

# Todo: Build the create user endpoint

# first get the email and password from the request
# use the email to check if the user already exists
# if the user exists, return a message that the user already exists
# if the user does not exist, create a new user and return the user data
# hash the password before saving it to the database
# return a message that the user was created successfully
# return the user data in the response


@api.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    email_value = data.get("email")
    password_value = data.get("password")
    if not email_value or not password_value:
        return jsonify({"msg": "Bad email or password"}), 401
    find_user = User.query.filter_by(email=email_value).first()
    if find_user:
        return jsonify({"message": "User already exists"}), 401
    new_user = User(email=email_value, password=password_value, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def get_protected_page():
    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    if user:
        return jsonify(logged_in_as=user.email), 200
    else:
        return jsonify({"message": "user not found"}), 401
