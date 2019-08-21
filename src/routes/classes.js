import { Router } from 'express'
const route = Router()
import { Classes } from '../services/classes'
import { schema_validation } from '../middlewares/data_validation'
import { schemaId,schemaClass } from '../schemas/index'
import { authenticateJwt } from '../middlewares/authenticateJwt'

route.get('/',async (req,res,next) => {
  let classes
  let filter
  const { query } = req
  try 
  {
    filter = query
    classes = await new Classes().getAll(filter)
    return res.status(200).json({
      data : classes
    })
  }
  catch(e)
  {
    next(e)
  }
})

route.post('/',
authenticateJwt,
schema_validation(schemaClass),
async (req,res,next) => {
  let { body } = req
  let classAdded
  try 
  {  
    classAdded = await new Classes().create(body)
    res.status(201).json({
      data : classAdded
      
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
  let classRemoved
  const { id } = req.params
  try 
  {
    classRemoved = await new Classes().delete(id)
    res.status(200).json({
      data : {
        classRemoved
      }
    })
  }
  catch(e)
  {
    next(e)
  }
})

export default route