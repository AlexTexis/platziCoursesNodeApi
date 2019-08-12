import Joi from '@hapi/joi'
import Boom from '@hapi/boom'

const validation = (input,schema) => {
  const { error } = Joi.validate(input,schema)
  return error
}

export const schema_validation = (schema,check='body') => {
  return (req,res,next) => {
    const error = validation(req[check],schema)
    error ? next(Boom.badRequest(error)) : next()
  }
}