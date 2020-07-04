const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');

const app = express();
const port = 3000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
users = {};
//Root


app.use((err, req, res, next) => {
    res.status(err.status)
        .json({
            status: err.status,
            message: err.message
        });
});
/* CODE IN BETWEEN */
//SECRET FOR JSON WEB TOKEN
let secret = 'some_secret';

//ALLOW PATHS WITHOUT TOKEN AUTHENTICATION
//Production : credentialsRequired: true
//Development : credentialsRequired: false
app.use(expressJWT({ secret: secret, credentialsRequired: false })
    .unless(
    {
        path: [
            '/signup'
        ]
    }
    ));


app.post('/signup', (req, res) => {
    user = req.body.user;
    console.log(user)

    if (users[user.username] === undefined) {
        users[user.username] = user.password;
        let token = jwt.sign(user, secret, { expiresIn: '30000s' })
        res.json({ status: 'success', token: token });

    } else {
        res.json({ status: 'fail', code: 401, message: 'already exists in db' });
    }

});


app.post('/login', (req, res) => {
    user = req.body.user;
    console.log(user)

    if (users[user.username] === undefined || user.password !== users[user.username]) {
        console.log("does not exist- need to register")
        res.json({ status: 'fail', code: 401, message: 'already exists in db' });
    } else {
        let token = jwt.sign(user, secret, { expiresIn: '30000s' })
        res.json({ status: 'success', token: token });

    }

});


app.listen(port, function () {
    console.log("Listening to " + port);
});
