import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import JoiPasswordComplexity from "joi-password-complexity";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  likedSongs: {
    type: [String],
    default: []
  },
  playlists: {
    type: [String],
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign(
    {_id: this._id, name: this.name, isAdmin: this.isAdmin},
    process.env.JWTPRIVATEKEY,
    {expiresIn: "7d"}
  )
  return token
}

export const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(10).required(),
    email: Joi.string().email().required(),
    password: JoiPasswordComplexity().required(),
  })
  return schema.validate(user);
}

export const User = mongoose.model("user", userSchema);

