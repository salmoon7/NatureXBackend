import express from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";

//SignUp Function
const signup = async (req, res) => {
  try {
    //Extracting the user data
    const { username, email, password } = req.body;

    //check if a user with the same email already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email alreaady in use" });
    }

    // //Hash user password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    //Create a new user
    const newUser = new User({ username, email, password });

    //save the new user
    await newUser.save();

    res.status(201).json({ message: " User registered successfully" });
  } catch (error) {
    console.error("User registration failed", error);
    res.status(500).json({ message: "User registration failed" });
  }
};

//Function for Login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Find user by thier email address
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Debugging output
    console.log("Stored hashed password:", user.password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed entered password:", hashedPassword);

    //compare the entered password with the stored password

    const isTheSame = await user.comparePassword(password.trim());
    if (!isTheSame) {
      return res.status(404).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Login successfully" });
  } catch (error) {
    console.error("Login failed", error);
    res.status(404).json({ message: "Login Failed" });
  }
};

export { signup, login };
