import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

//middlewares
app.use(bodyParser.json())
app.use(cors())

//routes
import routeAlumns from './src/routes/alumns'
import routeCourses from './src/routes/courses'
import routeClasses from './src/routes/classes'

app.use('/alumns',routeAlumns)
app.use('/courses',routeCourses)
app.use('/classes',routeClasses)


//errror middlewares
import { 
  log_errors,
  wrap_error,
  client_error,
  handler_error,
  not_found
 } from './src/middlewares/error'

 app.use(not_found)
 app.use(log_errors)
 app.use(wrap_error)
 app.use(client_error)
 app.use(handler_error)

//server init
const PORT = process.env.PORT || 8000
app.listen(PORT,() => console.log(`server listen http://localhost:${PORT}`))
