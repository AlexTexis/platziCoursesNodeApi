import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import bcrypt from 'bcrypt'
import Boom from '@hapi/boom'
import { Users } from '../users'

passport.use(
  new BasicStrategy( async (username,password,cb) => {
    let user 

    try 
    {
      user = await new Users().existUser({
        email : username
      })

      if(!user) return cb(Boom.unauthorized(),null)      
      if(!(await bcrypt.compare(password,user.password))) return cb(Boom(),null)
      
      return cb(null,user)
    }
    catch(e)
    {
      cb(e)
    }
  })
)
