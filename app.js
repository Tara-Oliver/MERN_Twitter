const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World!!"));
// const User = require('./models/User');

app.use(passport.initialize());
require('./config/passport')(passport);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/tweets", tweets);

// app.get("/", (req, res) => {
//     const user = new User({
//         handle:'guest',
//         email:'guest@gmail.com',
//         password:'appleapple'
//     })
//     user.save();
//     res.send('Hello world!');
// });



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));