import dotenv from 'dotenv';
import express from 'express';
import connection from './db.js'

dotenv.config();
const app = express();

connection();

const port = process.env.PORT || 8080;
app.listen(port, console.log(`포트 ${port}에 서버가 생성 되었습니다.`))
