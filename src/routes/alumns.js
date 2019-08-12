import { Router  } from 'express'
const route = Router()
import { Alumns } from '../services/alumns'
import { schema_validation } from '../middlewares/data_validation'
import { schemaId,schemaStudent,schemaStudentUpdate } from '../schemas/index'


route.get('/',async (req,res,next) => {
  let alumns
  let filter
  const { query } = req
  try 
  {
    filter = query
    alumns = await new Alumns().getAll(filter)
    return res.status(200).json({
      data : alumns
    })
  }
  catch(e)
  {
    next(e)
  }
})

route.get('/:id',schema_validation(schemaId,'params'),async (req,res,next) => {
  const { id } = req.params
  let alumn
  try 
  {
    alumn = await new Alumns().getOne(id)
    res.status(200).json({
      data :  alumn
    })
  }
  catch(e)
  {
    next(e)
  }
})

route.post('/',schema_validation(schemaStudent,'body'),async (req,res,next) => {
  let { body } = req
  let newAlumn
 try 
 {  
  newAlumn = await new Alumns().create(body)
  res.status(201).json({
    data : newAlumn
  })
 }
 catch(e)
 {
   next(e)
 }
})

route.put('/:id',schema_validation(schemaId,'params'),schema_validation(schemaStudentUpdate,'body'),async (req,res,next) => {
  let updatedAlumn 
  const { body } = req
  const { id } = req.params
  try 
  {
    updatedAlumn = await new Alumns().update({
      id,
      input : body
    })

    res.status(200).json({
      data : {...updatedAlumn,...body}
    })
  }
  catch(e)
  {
    next(e)
  }
})

route.delete('/:id',schema_validation(schemaId,'params'),async (req,res,next) => {
  let studentRemoved 
  const { id } = req.params
  try 
  {
    studentRemoved = await new Alumns().delete(id)
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