# Security Configuration Justification

## Helmet.js Configuration

### Configuration Applied

```typescript
helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  referrerPolicy: { policy: "no-referrer" }
});

Justification
contentSecurityPolicy: false - Turned off because this API only returns JSON and does not use HTML.
crossOriginResourcePolicy: cross-origin - Allows the API to be used by frontend apps from different origins.
referrerPolicy: no-referrer - Stops sending extra request information to protect data.
Sources
https://helmetjs.github.io/
https://owasp.org/www-project-secure-headers/

CORS Configuration

Configuration Applied
cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
});

Justification

origin: http://localhost:3000
 - Only allows my frontend to access the API.
methods: GET, POST, PUT, DELETE - Only allows the methods my API uses.
allowedHeaders: Content-Type - Only allows needed headers.

Sources

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
https://owasp.org/www-community/attacks/CORS