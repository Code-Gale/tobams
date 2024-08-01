const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectDB = async (): Promise<void> => {
    try{
        await mongoose.connect(process.env.DBURI)
        console.log('Connected to Database...')
    }catch(err){
        console.log('Could not connect to Database...', err)
        process.exit(2)
    }
}

export default connectDB