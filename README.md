<br> 

### Web-App Authentication, JWT token-based authentication with **Express.js
(Node.js)(Server Side)**

![](https://cdn-images-1.medium.com/max/1250/1*qsz9VkIvxuGSWNMGZkLSOg.png)

> Today, we are going to talk about the ‘behind the scenes’ of **web-app
> authentication** and how it’s done in the 21 Century .

<br> 

**Purpose of an article: **to give you Node.JS developers the **practical
tools** and the **theory **to implement authentication in your web-app.

### Brief History : Back then and now

we all know that almost every web-app uses authenticate.

Authentication is the process of verifying identity. A unique identifier is
associated with a user which was the username or userid. 

Traditionally, we use a combination of username and password to authenticate a
user, and we need to save this information locally in order to verify against
the server with **every HTTP Request message.**

### Stateful vs. stateless

> The state of an application (or anything else, really) is its condition or
> quality of being at a given moment in time — its state of being. Whether
something is stateful or stateless depends on how long the state of interaction
with it is being recorded and how that information needs to be stored.

<br> 

> **Statelessness **means that every HTTP request happens in complete isolation.
> When the client makes an HTTP request, it includes all information necessary for
the server to fulfill that request. The server never relies on information from
previous requests. If that information was important, the client would have sent
it again in this request.

<br> 

> **Stateful **applications and processes, however, are those that can be returned
> to again and again, like online banking or email. They’re performed with the
context of previous transactions and the current transaction may be affected by
what happened during previous transactions. For these reasons, stateful apps use
the same servers each time they process a request from a user.

> If a stateful transaction is interrupted, the context and history have been
> stored so you can more or less pick up where you left off. Stateful apps track
things like window location, setting preferences, and recent activity. You can
think of stateful transactions as an ongoing periodic conversation with the same
person.

> The majority of applications we use day to day are stateful, **but as technology
> advances, microservices and containers make it easier to build and deploy
applications in the cloud and the future moves towards Statelessness.**

### Problem — Client Side vs. Server Side and login credentials issue

Every modern web-app consists from **two **parts:

1.  Client-side
1.  Server-side

**Client-Side **is typically a** **[computer
application](https://en.wikipedia.org/wiki/Computer_application), such as a [web
browser](https://en.wikipedia.org/wiki/Web_browser), that runs on a
[user](https://en.wikipedia.org/wiki/User_(computing))’s local
[computer](https://en.wikipedia.org/wiki/Computer), that has limited resources
(is it logical that a client end-point computer will be **less** powerful than a
server).

The client-side application source code(JavaScript) will typically will be
exposed to **any one** with some basic knowledge on how to get it, vulnerable to
attacks that exploits client-side vulnerabilities.

In the older days, the developers who wrote client-side apps needed to save at
the browser local cache (of somewhere else) the **login credentials**(username &
password) in order to **verify each **HTTP request message that coming from the
client to the server (a.k.a user is at ‘logged in’ state). 

****Remember Server-side is ***Stateless***.*

### Solution —  JSON Web Tokens (JWT)

> Instead of saving the user login credentials(user & password) for amount of
> time, lets save a ‘Token’ on the client-side that is encoded from a data payload
using a secret.

![](https://cdn-images-1.medium.com/max/1250/0*Rv1O_ZyzOAztGP19.png)

> That way our app will be more secure, with** every** HTTP Request we are sending
> this token and that how we will verify our authentication with the remote app
server.

![](https://cdn-images-1.medium.com/max/1250/0*B8dmLjp4N8e2JmiZ.png)

JSON web tokens are **text strings** that can be used by client and server to
authenticate and share information easily. If you remember the necessary
authentication, we do write information to the client by writing the cookie as a
session variable. However, in JWT, a token is encoded from a data payload using
a secret. That token is passed to the client. Whenever the client sends that
token along with a request, the server validates it and sends back the response.

![](https://cdn-images-1.medium.com/max/1875/0*MSfdWUVGBmUCuUJA.png)
<span class="figcaption_hack">our sessionID now it is the JWT</span>

### Express.JS Middleware

Express is a routing and middleware web framework that has minimal functionality
of its own: An Express application is essentially a series of middleware
function calls.

**Middleware** functions are functions that have access to the [request
object](https://expressjs.com/en/4x/api.html#req) (`req`), the [response
object](https://expressjs.com/en/4x/api.html#res) (`res`), and the next
middleware function in the application’s request-response cycle. The next
middleware function is commonly denoted by a variable named `next`.

### Application-level middleware using express-jwt

Bind application-level middleware to an instance of the [app
object](https://expressjs.com/en/4x/api.html#app) by using the `app.use()` and
`app.METHOD()` functions, where `METHOD` is the HTTP method of the request that
the middleware function handles (such as GET, PUT, or POST) in lowercase.

> in this example we are using
> [express-jwt](https://github.com/auth0/express-jwt)** **library

    var jwt = require('express-jwt');
    //ALLOW PATHS WITHOUT TOKEN AUTHENTICATION 
    //Production : credentialsRequired: true 
    //Development : credentialsRequired: false

    app.use(expressJWT({ secret: secret, credentialsRequired: false }) 
    .unless({ 
             path: [ 
                   '/signup' 
                   ] 
             } 
    ));

> **meaning each time our credentails (JWT) are *invalid* we will redirct to
> sign-up \ login path**

Middleware functions can perform the many tasks and execute any code, we will
use the mechanism the check each incoming HTTP Request. See this diagram(s) for
a clear picture.

![](https://cdn-images-1.medium.com/max/1875/1*XJDKlxy4BYka3ifXz0c3Og.png)

![](https://cdn-images-1.medium.com/max/1250/1*SVMJk9PJuovUN0IaxCpOQA.png)

<br> 

[https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)


<br> 

### Wrap Up

Thanks for reading this article, don’t forget to clap if you got something out
of it!

Don’t hesitate to ping me if you have any questions about the article or ideas
for how to improve it.

Thank you.

<br> 
