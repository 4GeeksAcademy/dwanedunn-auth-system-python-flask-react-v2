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

    # return jsonify(response_body), 200
