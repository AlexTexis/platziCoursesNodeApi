import { Router  } from 'express'
const route = Router()
import { Students } from '../services/students'
import { schema_validation } from '../middlewares/data_validation'
import { schemaId,schemaStudent,schemaStudentUpdate } from '../schemas/index'
import { authenticateJwt } from '../middlewares/authenticateJwt'

route.get('/',async (req,res,next) => {
  let students
  let filter
  const { query } = req
  try 
  {
    filter = query
    students = await new Students().getAll(filter)
    return res.status(200).json({
      data : students
    })
  }
  catch(e)
  {
    next(e)
  }
})

route.get('/:id',
schema_validation(schemaId,'params'),
async (req,res,next) => {
  const { id } = req.params
  let student
  try 
  {
    student = await new Students().getOne(id)
    res.status(200).json({
      data :  student
    })
  }
  catch(e)
  {
    next(e)
  }
})

route.post('/',
authenticateJwt,
schema_validation(schemaStudent,'body'),
async (req,res,next) => {
  let { body } = req
  let newStudent
 try 
 {  
  newStudent = await new Students().create(body)
  res.status(201).json({
    data : newStudent
  })
 }
 catch(e)
 {
   next(e)
 }
})

route.put('/:id',
authenticateJwt,
schema_validation(schemaId,'params'),
schema_validation(schemaStudentUpdate,'body'),
async (req,res,next) => {
  let updatedStudent 
  const { body } = req
  const { id } = req.params
  try 
  {
    updatedStudent = await new Students().update({
      id,
      input : body
    })

    res.status(200).json({
      data : {...updatedStudent,...body}
    })
  }
  catch(e)
  {
    next(e)
  }
})

route.delete('/:id',
authenticateJwt,
schema_validation(schemaId,'params'),
async (req,res,next) => {
  let studentRemoved 
  const { id } = req.params
  try 
  {
    studentRemoved = await new Students().delete(id)
    res.status(200).json({
      data : { studentRemoved }
    })
  }
  catch(e)
  {
    next(e)
  }
})

export default route