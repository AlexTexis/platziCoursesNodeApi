import Joi from '@hapi/joi'

export const schemaId = {
  id : Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(new Error('El ID no es valido'))
}

export const schemaStudent = Joi.object().keys({
  name : Joi.string().required().error(new Error('El nombre es necesario')),
  surnames : Joi.string().required().error(new Error('Los apellidos son necesarios')),
  email : Joi.string().email().required().error(new Error('El email es necesario o no es formato correcto')),
  interest : Joi.string().required().error(new Error('El interes es necesario')),
  description : Joi.string().required().error(new Error('La descripcion es necesarioa')),
  twitter : Joi.string().required().error(new Error('El twitter es necesario'))
})

export const schemaStudentUpdate = Joi.object().keys({
  name : Joi.string(),
  surnames : Joi.string(),
  email : Joi.string(),
  interest : Joi.string(),
  description : Joi.string(),
  twitter : Joi.string()
})


export const schemaCourse = Joi.object().keys({
  name : Joi.string().required().error(new Error('El nombre es necesario')),
  tutor : Joi.string().required().error(new Error('El tutor ses necesario')),
  description : Joi.string().required().error(new Error('La descripcion es necesarioa')),
  level : Joi.string().required().error(new Error('El nivel es necesario')),
  alumns : Joi.array().required().error(new Error('Los alumnos son necesarios')),
  class : Joi.array().required().error(new Error('Las clases son necesarias')),
})

export const schemaCourseUpdate = Joi.object().keys({
  name : Joi.string(),
  tutor : Joi.string(),
  description : Joi.string(),
  level : Joi.string(),
  alumns : Joi.array(),
  class : Joi.array()
})


export const schemaIdCourseClass = {
  _id : Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(new Error('El ID no es valido'))
}

export const schemaIdCourseStudent = {
  _id : Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(new Error('El ID no es valido'))
}

export const schemaIdsDeleteStudent = {
  id : Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(new Error('El ID no es valido')),
  idStudent : Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(new Error('El ID del estudiante no es valido'))
}

export const schemaIdsDeleteClass = {
  id : Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(new Error('El ID no es valido')),
  idClass : Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(new Error('El ID de la clase no es valido'))
}

export const schemaClass = Joi.object().keys({
  name : Joi.string().required().error(new Error('El nombre es necesario')),
  label : Joi.string().required().error(new Error('La etiqueta es necesaria')),
})