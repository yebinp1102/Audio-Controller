import express from 'express'
import {User, validate} from '../models/user.js'
import bcrypt from 'bcrypt'

const router = express.Router();

// create user
router.post('/', async(req, res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send({message: error.details[0].message});

  // 이미 해당 이메일로 가입한 유저가 있는 경우
  const user = await User.findOne({email: req.body.email})
  if(user) return res.status(403).send({message: "해당 이메일로 가입한 유저가 이미 존재합니다."})

  const salt = await bcrypt.genSalt(Number(process.env.SALT))
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  let newUser = await new User({
    ...req.body,
    password: hashPassword
  }).save();

  newUser.password = undefined;
  newUser.__v = undefined;

  res.status(200).send({data: newUser, message: "새로운 계정이 생성 되었습니다."})
})

export default router