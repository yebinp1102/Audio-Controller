import express from 'express'
import {User} from '../models/user.js'
import bcrypt from 'bcrypt'

const router = express.Router();

router.post("/", async(req, res) => {
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send({message: "존재하지 않는 이메일 정보입니다."})
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword) return res.status(400).send({message: "적절하지 않은 비밀번호입니다."})

  const token = await user.generateAuthToken();
  res.status(200).send({data: token, message: "로그인에 성공했습니다."})
})

export default router