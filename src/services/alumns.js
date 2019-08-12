import { GET_ALL, GET_ONE,CREATE,DELETE,UPDATE } from '../lib/db'
import { ObjectId } from 'mongodb'

export class Alumns 
{
  constructor()
  {
    this.collection = 'alumns'
  }

  async getAll(filters={}) 
  {
    let alumns 
    let filter 
    
    if(Object.keys(filters).length)
    {
     filter =  { name  : new RegExp(filters.name || false)  }
    }

    alumns = await GET_ALL({ 
      collection : this.collection,
      filter
    })

    return alumns || []
  }

  async getOne(id) 
  {
    let alumn
    const query = { _id : ObjectId(id) }

    alumn = await GET_ONE({ 
      collection : this.collection,
      query
    })

    return alumn
  }

  async create(input) 
  {
    let alumn

    alumn = await CREATE({
      collection : this.collection,
      input
    })

    return alumn 
  }

  async delete(id) 
  {
    let alumn
    const query = {_id : ObjectId(id) }

    alumn = await DELETE({
      collection : this.collection,
      query
    })

    return alumn 
  }

  async update({id,input}={}) 
  {
    let alumn
    const query = { $set : input } 
    const filter = { _id: ObjectId(id) } 

    alumn = await UPDATE({
      collection : this.collection,
      query,
      filter
    })

    return alumn
  }
}
