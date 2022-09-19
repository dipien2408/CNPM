const express = require("express");
const path = require('path')
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')

const errorHandler = require('./middleware/error')

const DBConnection = require('./config/db')

dotenv.config({ path: './config/.env' })

DBConnection()

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const categoryRoutes = require('./routes/categories')
const postRoutes = require('./routes/posts')
const commentRoutes = require('./routes/comments')
const replyRoutes = require('./routes/replies')
const feelingRoutes = require('./routes/feelings')
const searchRoutes = require('./routes/search')


app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Enable CORS
app.use(cors({
  origin: true, //included origin as true
  credentials: true, //included credentials as true
}))

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 mins
//   max: 100 // 100 request per 10 mins
// })

// app.use(limiter)

// Prevent http param pollution
app.use(hpp())
app.use(express.static(path.join(__dirname, 'public')))
// app.use((req, res, next) => {
//   setTimeout(() => {
//     next()
//   }, 1000)
// })

const versionOne = (routeName) => `/api/v1/${routeName}`

app.use(versionOne('auth'), authRoutes)
app.use(versionOne('users'), userRoutes)
app.use(versionOne('categories'), categoryRoutes)
app.use(versionOne('posts'), postRoutes)
app.use(versionOne('comments'), commentRoutes)
app.use(versionOne('replies'), replyRoutes)
app.use(versionOne('feelings'), feelingRoutes)
app.use(versionOne('search'), searchRoutes)

app.use(errorHandler)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(
    `We are live on ${process.env.NODE_ENV} mode on port ${PORT}`
  )
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  server.close(() => process.exit(1))
})