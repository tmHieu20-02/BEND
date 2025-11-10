# BEND_App Backend (Express)

This is a minimal Express backend scaffold with routers and controllers so you can call APIs locally.

Quick start (Windows PowerShell):

```powershell
cd C:\Users\toh90\HTML\BEND_App
npm install
npm start
```

APIs:
- GET /api/health -> health check
- GET /api/users -> list users
- GET /api/users/:id -> get user by id
- POST /api/users -> create user (JSON body: {"name":"...","email":"..."})
- PUT /api/users/:id -> update user
- DELETE /api/users/:id -> delete user

You can test with curl or Postman. Example:

```powershell
curl http://localhost:3000/api/health
```
