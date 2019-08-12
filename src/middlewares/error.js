const debug = require('debug')('app:error')
import { config } from '../config/index'
import boom from '@hapi/boom'
import { isRequestAjaxOrApi } from '../utils/isRequesAjaxOrApi'

export const log_errors = (error,req,res,next) => {
  debug(error.stack)
  next(error)
}

const with_stack = (error,stack) => {
  if(config.isDev) 
  {
    return {
      ...error,
      stack
    }
  }

  return error
}

 export const wrap_error = (error,req,res,next) => {
   if(!error.isBoom)
   {
    next(boom.badImplementation(error))
   }
   next(error)  
} 

export const client_error = (error,req,res,next) => {
  if(isRequestAjaxOrApi(req) || res.headersSent)
  {
    const { output : { payload,statusCode} } = error
    return res.status(statusCode).json(with_stack(payload,error.stack))
  }
  else 
  { 
    next(error)
  }
}

export const handler_error = (error,req,res,next) => {
    const { output : {payload,statusCode} } = error
    return res.status(statusCode).json(with_stack(payload,error.stack))
}

export const not_found = (req,res,next) => {
  if(isRequestAjaxOrApi(req))
  {
    const { output : { statusCode,payload} } = boom.notFound()
    return res.status(statusCode).json({
      error : payload
    })
  }
  res.status(404).json({
    error : {
       statusCode : 404,
       error : 'Not Found',
       message : 'Not found'
    }
  })
}