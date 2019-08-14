import { Router  } from 'express'
const route = Router()
import { Courses } from '../services/courses'
import { schema_validation } from '../middlewares/data_validation'
import { 
  schemaId,schemaCourse,
  schemaCourseUpdate,
  schemaIdCourseClass,
  schemaIdCourseStudent,
  schemaIdsDeleteClass,
  schemaIdsDeleteStudent
 } from '../schemas/index'

route.get('/',async (req,res,next) => {
  let courses
  try 
  {
    courses = await new Courses().getAll()
    return res.status(200).json({
      data : courses
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
  let course
  try 
  {
    course = await new Courses().getOne(id)
    res.status(200).json({
      data :  course 
    })
  }
  catch(e)
  {
    next(e)
  }
})

route.post('/',
schema_validation(schemaCourse,'body'),
async (req,res,next) => {
  let { body } = req
  let newCourse
 try 
 {  
  newCourse = await new Courses().create(body)
  res.status(201).json({
    data :  newCourse
  })
 }
 catch(e)
 {
   next(e)
 }
})

route.put('/:id',
schema_validation(schemaId,'params'),
schema_validation(schemaCourseUpdate,'body'),
async (req,res,next) => {
  let updateCourse 
  const { body } = req
  const { id } = req.params
  try 
  {
    updateCourse = await new Courses().update({
      id,
      input : body
    })

    res.status(200).json({
      data : {...updateCourse,...body}
    })
  }
  catch(e)
  {
    next(e)
  }
})

route.delete('/:id',
schema_validation(schemaId,'params'),
async (req,res,next) => {
  let courseRemoved
  const { id } = req.params
  try 
  {
    courseRemoved = await new Courses().delete(id)
    res.status(200).json({
      data : {
        courseRemoved
      }
    })
  }
  catch(e)
  {
    next(e)
  }
})


// CLASS ENDPOINTS
route.post('/:id/class',
schema_validation(schemaId,'params'),
schema_validation(schemaIdCourseClass,'body'),
async (req,res,next) => {
  let classAdd 
  const { body } = req
  const { id } = req.params
  try 
  {
    classAdd = await new Courses().addClass({
      idRef:id,
      input : body
    })

    res.status(200).json({
      data : classAdd
    })
  }
  catch(e)
  {
    next(e)
  }
})

route.delete('/:id/class/:idClass',
schema_validation(schemaIdsDeleteClass,'params'),
async (req,res,next) => {
  let classRemoved 
  const { id,idClass } = req.params
  try 
  {
    classRemoved = await new Courses().removeClass({
      idRef:id,
      idClass
    })

    res.status(200).json({
      data : classRemoved
    })
  }
  catch(e)
  {
    next(e)
  }
})


// STUDENTS ENDPOINTS
route.post('/:id/students',
schema_validation(schemaId,'params'),
schema_validation(schemaIdCourseStudent,'body'),
async (req,res,next) => {
  let studentAdd 
  const { body } = req
  const { id } = req.params
  try 
  {
    studentAdd = await new Courses().addStudent({
      idRef:id,
      idStudent : body
    })

    res.status(200).json({
      data : studentAdd
    })
  }
  catch(e)
  {
    next(e)
  }
})

route.delete('/:id/students/:idStudent',
schema_validation(schemaIdsDeleteStudent,'params'),
async (req,res,next) => {
  let studentRemoved 
  const { id,idStudent } = req.params
  try 
  {
    studentRemoved = await new Courses().removeStudent({
      idRef:id,
      idStudent
    })

    res.status(200).json({
      data : studentRemoved
    })
  }
  catch(e)
  {
    next(e)
  }
})



export default route