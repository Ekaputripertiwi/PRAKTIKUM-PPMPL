# flask_app.py
from flask import Flask, jsonify, request, abort

app = Flask(__name__)

# In-memory database of users (using a dictionary for simplicity)
users = {
    1: {"id": 1, "name": "Alice", "email": "alice@example.com"},
    2: {"id": 2, "name": "Bob", "email": "bob@example.com"},
    3: {"id": 3, "name": "Charlie", "email": "charlie@example.com"}
}

# Endpoint to retrieve all users
@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(list(users.values()))

# Endpoint to retrieve a specific user by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = users.get(user_id)
    if not user:
        abort(404, description="User not found")
    return jsonify(user)

# Endpoint to create a new user
@app.route('/users', methods=['POST'])
def create_user():
    if not request.json or 'name' not in request.json or 'email' not in request.json:
        abort(400, description="Name and email are required")
    new_id = max(users.keys()) + 1
    new_user = {
        "id": new_id,
        "name": request.json['name'],
        "email": request.json['email']
    }
    users[new_id] = new_user
    return jsonify(new_user), 201

# Endpoint to update an existing user
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = users.get(user_id)
    if not user:
        abort(404, description="User not found")
    if not request.json:
        abort(400, description="No update data provided")
    
    # Update only the fields provided in the request
    user['name'] = request.json.get('name', user['name'])
    user['email'] = request.json.get('email', user['email'])
    return jsonify(user)

# Endpoint to delete a user
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    if user_id not in users:
        abort(404, description="User not found")
    del users[user_id]
    return jsonify({"result": "User deleted"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Running on localhost port 5000
