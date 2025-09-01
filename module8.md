# Authentication Methods Explained

## 1. Basic Authentication

**What it is**: The simplest form of HTTP authentication where credentials are sent with every request.

**How it works**:

1. Client sends username and password encoded in Base64
2. Server decodes and verifies credentials
3. This happens on EVERY request

**Pros**:

- Simple to implement
- Supported by all browsers
- No server-side session management needed

**Cons**:

- Credentials sent with every request (security risk)
- Base64 is encoding, NOT encryption. While it's encoded, it's not encrypted. This makes it highly vulnerable to being intercepted. It's almost never used in modern web applications.
- No logout mechanism
- Vulnerable without HTTPS

**Use Case**: Internal tools, APIs with HTTPS, development environments

---

## 2. Cookie-Based Authentication

**What it is**: Traditional web authentication using server sessions and browser cookies.

**How it works**:

1. User logs in with credentials
2. The server verifies the credentials. If correct, the server creates a session (a file or database entry) to remember the user is logged in.
3. The server generates a unique session ID and sends it back to the client in a cookie.
4. For every subsequent request, the browser automatically sends the cookie with the session ID.
5. The server looks up the session ID in its storage to identify the user

Analogy: A hotel check-in. When you check in, you get a key card (the cookie). The front desk (the server) keeps a record of which room (the user) you have. You use the key card to open your room, and you don't need to show your ID again and again.

**Example Flow**:

```
1. POST /login → username/password
2. Server creates session_id="abc123"
3. Set-Cookie: session_id=abc123; HttpOnly; Secure
4. Future requests include: Cookie: session_id=abc123
```

**Pros**:

- Automatic cookie handling by browsers
- Server controls session lifecycle
- Can implement features like "Remember Me"
- Good for traditional web applications

**Cons**:

- Requires server-side session storage
- CSRF vulnerability (need CSRF tokens)
- Not ideal for APIs or mobile apps
- Scalability challenges with multiple servers

**Use Case**: Traditional web applications, server-rendered pages

---

## 3. Token Authentication (General)

**What it is**: Authentication using tokens instead of sessions.

**How it works**:

1. User logs in with credentials
2. The server verifies the credentials and, if correct, creates a cryptographic token.
3. The server sends this token back to the client. The server does not keep any record of the token.
4. The client stores the token (e.g., in local storage) and sends it with every subsequent request.
5. The server verifies the token's authenticity using a secret key. If it's valid, the user is authenticated.

Analogy: A concert ticket. When you get your ticket, it contains all the information you need, and a special stamp proves it's real. The gatekeeper at the concert doesn't need a list of everyone who bought a ticket; they just need to check the ticket's authenticity.

**Pros**:

- Stateless (server doesn't store sessions)
- Works well with APIs and mobile apps
- Better for microservices architecture
- No CSRF vulnerability

**Cons**:

- Client responsible for token storage
- Token theft risks
- Need secure token storage strategy

---

## 4. JWT (JSON Web Tokens)

**What it is**: A specific type of token that contains encoded user information, and used for token-based authentication. It is now the common industry standard.

**Structure**: Three parts separated by dots (.)

- **Header**: Tells you what type of token it is and what algorithm was used to sign it.
- **Payload**: Contains the claims, which are statements about the user (e.g., user ID, username, and their role like author).
- **Signature**: A unique hash created using the header, payload, and a secret key known only to the server. This is what makes the token verifiable and tamper-proof.

**Example JWT**:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**How it works**:

1. User logs in
2. Server creates JWT with user info and expiration and sends this to the frontend(client)
3. Client stores JWT
4. Client sends JWT with requests
5. Server validates JWT signature and expiration

**Pros**:

- Self-contained (no database lookup needed)
- Stateless
- Can include user information
- Standard format (RFC 7519)
- Works across different domains

**Cons**:

- Larger than simple tokens
- Cannot revoke individual tokens easily
- Sensitive data exposed in payload (though signed)
- Token size grows with claims

**Use Case**: APIs, SPAs, microservices, cross-domain authentication

---

## 5. OAuth

**What it is**: OAuth is fundamentally different from the methods above. It is not about authenticating a user with your own application. It's about getting permission to access a user's data on a third-party service. It's an authorization framework that allows third-party applications to access user resources without sharing passwords.

**Key Players**:

- **Resource Owner**: The user
- **Client**: The application wanting access
- **Authorization Server**: Issues tokens (e.g., Google)
- **Resource Server**: Holds the protected data

**Common Flow (Authorization Code)**:

1. Client redirects user to authorization server
2. User logs in and grants permission
3. Authorization server redirects back with authorization code
4. Client exchanges code for access token
5. Client uses access token to access protected resources

How it works:

Your application wants to access a user's Google Photos.

You redirect the user to a Google login page.

The user logs in with Google and approves the request to share their photos with your app.

Google sends your application a special token (an access token) that gives you permission to access the user's photos on their behalf.

**Pros**:

- Users don't share passwords with third parties
- Granular permissions (scopes)
- Standardized protocol
- Token refresh capabilities
- Supports multiple client types

**Cons**:

- Complex to implement correctly
- Multiple moving parts
- Security implications if misconfigured
- Requires understanding of flows

**Use Case**: "Login with Google/Facebook", API integrations, third-party app access

---

**My Analogy**:

- Basic Auth: Showing ID every time you enter a building
- Cookie Auth: Getting a wristband at an event
- JWT: A tamper-proof ID card with your info
- OAuth: Using your driver's license to prove identity at different places

---

## Key Security Considerations

- Always use HTTPS in production
- Implement proper token expiration
- Consider refresh token strategies
- Protect against XSS and CSRF
- Never store sensitive data in JWT payload
- Implement proper logout mechanisms
- Use secure cookie flags (HttpOnly, Secure, SameSite)
