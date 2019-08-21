import passport from 'passport'
import { Strategy,ExtractJwt } from 'passport-jwt'
import Boom from '@hapi/boom'
import { Users } from '../users'
import { config } from '../../config/index'

passport.use(
  new Strategy(
    {
      secretOrKey : config.SECRET_KEY,
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (tokenPayload,cb) => {
      let user
      try 
      {
        user = await new Users().existUser({
          email : tokenPayload.sub
        })
        
        if(!user)  return cb(Boom.unauthorized(),null)

        return cb(null,user)
        
      }
      catch(e)
      {
        cb(e)
      }
    }
  )
)