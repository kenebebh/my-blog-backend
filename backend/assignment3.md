# 📝 Assignment: Role-Based Authorization in Express & Mongoose

In this assignment you will practice **middleware** and **role-based access control (RBAC)**  
by extending the provided `authorize` middleware in your `authMiddleware.js` file.

🎯 Your Tasks

1. Creating New Middleware
   Your first task is to use the authorize middleware to create two new middleware variables.

adminOnly: This middleware should allow access only to users with the admin role.

authorOrAdmin: This middleware should allow access to users with either the author or admin roles.

## expo:

```
export const adminOnly = authorize("admin");
export const authorOrAdmin = authorize("admin", "author");
```

just paste this line of code in your authMiddleware.js file, anywhere below the authorize function.
I hope you understand what we just did above

2. Protecting Routes
   Now, you will apply the adminOnly middleware to protect specific API endpoints. You need to ensure that the following routes are accessible only by an admin user.

getUsers: Protect the route that get all users. In a real world app, you dont want an ordinary user to be able to come and see every single user regitered on your database

getPosts: Protect the route that retrieves all posts.

updateUserRole: Protect the route that updates a user's role (only).

3. Modifying Controllers
   You need to create and write the entire code for the updateUserRole controller and also modify the existing updateUser controller.

- Create updateUserRole Controller: Create a new controller function that specifically handles updating a user's role. This controller function should be used with a route like api/users/:id/role.

- Modify the updateUser Controller:

Locate your existing updateUser/editUser controller function. Modify this controller to remove the ability to update the role field. This ensures that regular users cannot change their own roles, and only the dedicated updateUserRole route (protected by adminOnly) can perform this action.

Bonus Point: Advanced Logic
After you have successfully completed the main assignment, try to tackle this advanced challenge.

Prevent Self-Demotion: Modify your updateUserRole controller so that an admin cannot change their own role. In other words, an admin user should not be able to use this route to demote themselves to a reader or author role.
