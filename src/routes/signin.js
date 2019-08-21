import { Router } from 'express'
const route = Router()

import passport from 'passport'
import jwt from 'jsonwebtoken'
import Boom from '@hapi/boom'
import { config } from '../config/index'
import '../services/auth/strategyBasic'

route.post('/',async (req,res,next) => {
  passport.authenticate('basic',(error,user) => {
    try 
    {

      if(error || !user) 
      return next(Boom.unauthorized('Email or Password is incorrect'))
      
      req.login(user,{session : false},async (err) => {
        if(err) return next(err)

        let payload = { sub : user.email }
        let token = jwt.sign(payload,config.SECRET_KEY,{ expiresIn : '15m' })

        return res.status(200).json({
          token
        })
      })

    }
    catch(e) 
    {
      next(e)
    }
  })(req,res,next)
})

export default route