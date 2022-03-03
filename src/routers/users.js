import express from "express";
import User from "../models/users.js";
import { body, validationResult } from "express-validator"; //see docs.
import bcrypt from "bcryptjs";

const router = express.Router();

router.post(
  "/signup",
  [
    body("first_name").isLength({ min: 3 }),
    body("last_name").isLength({ min: 3 }),

    body("email", "enter valid email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ], //second parameters are for validation
  async (req, res) => {
    try {
      const errors = validationResult(req); //checking for error
      if (errors.isEmpty()) {
        const existedUser = await User.findOne({ email: req.body.email });
        if (existedUser) {
          return res.status(400).send("email already in use");
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = await User.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,

          email: req.body.email,
          password: hashedPassword,
        });

        const user = await User.findById(newUser._id).select("-password"); //select method on User for selecting all fields, for excluding password use "-password"

        return res.status(200).send(user);
      } else {
        return res.status(400).send(errors);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //console.log(user);
    if (!user) {
      return res.status(404).send({ error: "invalid credentials" });
    }
    const matchedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //console.log(matchedPassword);
    if (!matchedPassword) {
      return res.status(404).send({ error: "invalid credentials" });
    }

    const loggedUser = await User.findById(user._id).select("-password"); //select method on User for selecting all fields, for excluding password use "-password"

    return res.status(200).send(loggedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    // const query = req.query.q;
    // // console.log(query);
    // const keys = ["first_name", "last_name", "email"];
    // const search = (users) => {
    //   return users.filter((user) =>
    //   keys.some((key) => user[key].toLowerCase().includes(query))
    //   );
    // };
    const users = await User.find();
    res.status(201).send(users);
  } catch (error) {
    res.status(505).send(error);
  }
});

export default router;
