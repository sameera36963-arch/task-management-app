const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();

// Register User

router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check existing user

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        // Encrypt password

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user

        const user = new User({

            name,
            email,
            password: hashedPassword

        });

        await user.save();

        res.status(201).json({

            message: "User Registered Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});
const jwt = require("jsonwebtoken");

// Login User

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find user

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({

                message: "User not found"

            });

        }

        // Check password

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({

                message: "Invalid Password"

            });

        }

        // Generate token

        const token = jwt.sign(

            { id: user._id },

            "mysecretkey",

            { expiresIn: "1d" }

        );

        res.json({

            message: "Login Successful",

            token

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});
module.exports = router;