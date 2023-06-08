import jwt from 'jsonwebtoken'

export default (req,res, next) => {
  const token = req.header("x-auth-token");
  if(!token) return res.status(400).send({message: "접근이 거절되어 토큰이 생성되지 않았습니다."})

  jwt.verify(token, process.env.JWTPRIVATEKEY, (error, validToken) => {
    if(error) return res.status(400).send({message: "올바르지 않은 토큰입니다."})
    else{
      req.user = validToken;
      next();
    }
  })
}