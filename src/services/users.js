import { CREATE,GET_ONE } from '../lib/db'

export class Users 
{
  constructor()
  {
    this.collection = 'users'
  }

  async existUser(input)
  {
    let user 
    let filter 
    
    filter = { email : input.email }
    user = await GET_ONE({
      collection : this.collection,
      filter
    })

    return user
  }

  async create(input) 
  {
    let userCreated
    
    userCreated = await CREATE({
      collection : this.collection,
      input
    })

    return userCreated
  }
}