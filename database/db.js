import mongoose  from 'mongoose';

const Connection = async (username = 'usercode', password = 'codeforinterview') => {
    const URL = `mongodb+srv://ps431352:lE88zs3LlxVWObQz@cluster0.0cpfvui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    try {
        await mongoose.connect(URL);
        console.log('Database connected successfully');
    } catch (error) {   
        console.log('Error while connecting with the database ', error);
    }
}

export default Connection;