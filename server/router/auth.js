const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');

require('../db/conn');
const User = require("../models/userSchema");

router.get('/', (req, res) => {
    res.send('Hello World from the Server router.js');

});


router.post('/signup', async (req, res) => {

    const { name, email,  password, cpassword } = req.body;
    if (!name || !email ||  !password || !cpassword) {
        return res.status(422).json({ error: "Plz fill all the field" });
    }

    try {


        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "Paswword does not match" });
        }

        else {
            const user = new User({ name, email, password, cpassword });

            await user.save();
            res.status(201).json({ message: "User registered successfully" });
        }
    }
    catch (err) {
        console.log(err);
    }

});

router.post('/login', async (req, res) => {
    
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Plz fill the data" });
        }

        const userLogin = await User.findOne({ email: email });


       
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });



            if (!isMatch) {

                res.status(400).json({ error: "Invalid Credientials pass" });
            }
            else {
                res.json({ message: 'Signed In Successfully' });
            }
        } else {
            res.status(400).json({ error: "Invalid Credientials" });
        }


    } catch (err) {
        console.log(err);
    }

})
module.exports = router;