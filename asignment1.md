# Assignment: Build CRUD Endpoints for Users

## 🎯 Goal

You have already learned how to create **CRUD (Create, Read, Update, Delete)** endpoints for blog posts.  
Now, your task is to **apply the same knowledge to users**. This will help you practice working with multiple collections and building your backend systems like a pro.

---

## 📌 User Schema

Each user should have the following fields:

- `name` (String, required) → the user’s full name
- `email` (String, required, unique) → must be unique for each user
- `password` (String, required) → hashed later, but for now store as plain text (we’ll secure it later)
- `role` (String, default: `"reader"`) → can be `"reader"` or `"author"`
- `createdAt` (Date, default: Date.now)

### Please learn how to validate your schema and how to specify required fields, unique fields,

you can refer to this article for a guide _[https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/]_

📌 Required Endpoints

1. Create User
   `POST /api/users`
   Request body should include: name, email, password, role.

2. Get All Users
   `GET /api/users`

3. Get User by ID
   `GET /api/users/:id`

4. Update User

`PATCH /api/users/:id`
Allow updating fields like name, email, role, password.

5. Delete User
   `DELETE /api/users/:id`

6. Search User by Name
   `GET /api/users/search?name=<username>`
   Example: `GET /api/users/search?name=John`
   Should return all users that match the given name (case-insensitive if possible).
