import mongoose from "mongoose";

const connection = async() => {
  try{
    await mongoose.connect(process.env.DB);
    console.log('DB에 성공적으로 연결 되었습니다.')
  }catch(err){
    console.log('DB 연결에 실패했습니다.')
    console.log(err);
  }
}

export default connection;