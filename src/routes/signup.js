import { Router } from 'express'
const route = Router()
import { Users } from '../services/users'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Boom from '@hapi/boom'
import { config } from '../config/index'

const encryptPassword = async (password) => await bcrypt.hash(password,10)
const existUser = async (input) => {
  let user 
  user = await new Users().existUser(input)
  return user
}

route.post('/',async (req,res,next) => {
  const { body } = req
  let user
  let token 
  try 
  { 
    user = await existUser(body)
    if(!user) 
    {
      let newUser
      let passwordEncripted

      passwordEncripted = await encryptPassword(body.password)
      body.password = passwordEncripted
      newUser = await new Users().create(body)
      token = jwt.sign({ sub : newUser.email },config.SECRET_KEY,{ expiresIn : '15m' })
    }
    else 
    {
      return next(Boom.conflict('User already exist'))
    }

    res.status(201).json({
      token
    })
  }
  catch(e)
  {
    next(e)
  }
})

export default route