A proxy in an Express backend is a server that acts as an intermediary for requests from clients. Instead of a client communicating directly with your Express server, it sends the request to the proxy, which then forwards the request to your server. The proxy can also handle the response from your server and send it back to the client.

Why Use a Proxy?
Proxies are commonly used to solve several key problems in web development:

Handling CORS (Cross-Origin Resource Sharing): When a frontend application on one domain (e.g., http://frontend.com) needs to make an API call to a backend on a different domain (e.g., http://backend.com), the browser's security policy blocks the request. A proxy can be set up on the same domain as the frontend to forward requests to the backend, bypassing this security restriction.

Load Balancing: A proxy can distribute incoming traffic across multiple backend servers to prevent a single server from being overwhelmed. This improves performance and reliability.

Security and Anonymity: A proxy can hide the identity and IP address of your backend server, adding a layer of security. It can also filter malicious requests before they reach your application.

Caching: Proxies can cache frequently requested data. When a new request comes in for the same data, the proxy can serve the cached response immediately, reducing the load on your backend server and speeding up response times.

The app.set('trust proxy', ...) setting in Express.js is used to configure how the application handles requests when it is deployed behind a reverse proxy or load balancer. By default, Express assumes it is directly facing the client, and req.ip and req.secure will reflect the IP address and protocol of the immediate connection.

When an application runs behind a proxy, the proxy forwards the client's request to the application. In this scenario, the application sees the proxy's IP address and not the original client's. To correctly identify the client's IP and determine if the connection is secure (HTTPS), the trust proxy setting needs to be enabled.

The trust proxy setting can be configured with various values:

- true: The client's IP address is considered the leftmost entry in the X-Forwarded-For header.
- false: (Default) The application is understood as directly facing the client, and the client's IP address is derived from req.connection.remoteAddress.
- Number: Trusts the specified number of proxies. For example, app.set('trust proxy', 1) trusts one proxy.
- IP address, subnet, or an array of IPs/subnets: Trusts the specified IP addresses or subnets as being reverse proxies. Pre-configured subnet names like loopback, linklocal, and uniquelocal can also be used.
- A custom function: Allows for more granular control over which proxies to trust.

JSON Schema validation - jsonschema
Escaping HTML & CSS - escape-html
