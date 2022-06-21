import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(
      `MongoDB connected on ${connect.connection.host}`.cyan.underline.bold
    )
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold)
    process.exit(1)
  }
}

export default connectDB
