import mongoose  from 'mongoose';

const Connection = async (username = 'usercode', password = 'codeforinterview') => {
    const URL = "mongodb+srv://kandhwaygunit:gunit123@cluster0.6f40r.mongodb.net"

    try {
        await mongoose.connect(URL);
        console.log('Database connected successfully');
    } catch (error) {   
        console.log('Error while connecting with the database ', error);
    }
}

export default Connection;