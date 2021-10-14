import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    console.log('MongoDB is connected')
  } catch (err) {
    console.log(err.message)
    //Exit process with failure
    process.exit(1)
  }
}
export default connectDB
