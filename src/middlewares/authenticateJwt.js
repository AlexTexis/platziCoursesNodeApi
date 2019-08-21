import passport from 'passport'
import Boom from '@hapi/boom'
import '../services/auth/strategyJwt'

export const authenticateJwt = (req,res,next) => {
  passport.authenticate('jwt',(error,user,info) => {
    if(error || !user) return next(Boom.unauthorized('Unauthorized'))
    req.login(user,{session : false},(err) => {
      if(err) return next(err)
      next()
    })
  })(req,res,next)
}