const express = require("express")
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDb = require("./config/db");
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')

require('dotenv').config()
connectDb()

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

// app.use(cors())

// This is bank
// app.use(cors())

app.use(express.json())
app.use(cookieParser())

app.use("/user", userRoute);
app.use("/admin", adminRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);