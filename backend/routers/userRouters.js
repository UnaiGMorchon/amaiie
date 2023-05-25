import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { isAuth, generateToken, isAdmin } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
import upload from "../middlewares/multer.js";
import Product from "../models/productModel.js";
const userRouter = express.Router();
userRouter.get("/", async (req, res) => {
  //usuarios
  const users = await User.find();
  res.send(users); //usuarios en formato JSON
});
userRouter.get(
  "/username/:username",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
userRouter.get(
  "/:username/products",
  expressAsyncHandler(async (req, res) => {
    const username = req.params.username;
    console.log(username);
    const products = await Product.find({ user: username });
    console.log(products);
    res.send(products);
  })
);
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // bcrypt.compareSync compara la contraseña ingresada con la contraseña encriptada en la base de datos
        res.send({
          _id: user._id,
          username: user.username,
          email: user.email,
          image: user.image,
          description: user.description,
          isAdmin: user.isAdmin,
          isArtist: user.isArtist,
          token: generateToken(user),
        });
        return; // si la contraseña es correcta, se envia la respuesta y se termina la funcion
      }
    }
    res.status(401).send({ message: "Invalid username or password" });
  })
);
userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      isArtist: req.body.isArtist,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      username: user.username,
      email: user.email,
      image: user.image,
      description: user.description,
      isAdmin: user.isAdmin,
      isArtist: user.isArtist,
      token: generateToken(user),
    });
  })
);
userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        image: updatedUser.image,
        description: updatedUser.description,
        isAdmin: updatedUser.isAdmin,
        isArtist: updatedUser.isArtist,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);
userRouter.put(
  "/editprofile",
  [isAuth, upload.single("image")],
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.description = req.body.description || user.description;
      if (req.file) {
        console.log(req.file);
        user.image = req.file.filename; // Asigna la ruta de la imagen guardada a 'user.image'
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        image: updatedUser.image,
        description: updatedUser.description,
        isAdmin: updatedUser.isAdmin,
        isArtist: updatedUser.isArtist,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);
userRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "admin@example.com") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      await user.deleteOne();
      res.send({ message: "User Deleted" });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
userRouter.get(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
userRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
export default userRouter;
