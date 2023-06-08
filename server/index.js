import dotenv from 'dotenv';
import express from 'express';
import connection from './db.js'
import cors from 'cors'
import 'express-async-errors'
import bodyParser from 'body-parser';

// routes
import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'


dotenv.config();
const app = express();

connection();
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);




const port = process.env.PORT || 8080;
app.listen(port, console.log(`포트 ${port}에 서버가 생성 되었습니다.`))
