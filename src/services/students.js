import { GET_ALL, GET_ONE,CREATE,DELETE,UPDATE } from '../lib/db'
import { ObjectId } from 'mongodb'

export class Students 
{
  constructor()
  {
    this.collection = 'students'
  }

  async getAll(filters={}) 
  {
    let students 
    let filter 
    
    if(Object.keys(filters).length)
    {
     filter =  { name  : new RegExp(filters.name || false)  }
    }

    students = await GET_ALL({ 
      collection : this.collection,
      filter
    })

    return students || []
  }

  async getOne(id) 
  {
    let student
    const query = { _id : ObjectId(id) }

    student = await GET_ONE({ 
      collection : this.collection,
      query
    })

    return student
  }

  async create(input) 
  {
    let studentCreated

    studentCreated = await CREATE({
      collection : this.collection,
      input
    })

    return studentCreated 
  }

  async delete(id) 
  {
    let studentRemoved
    const filter = {_id : ObjectId(id) }

    studentRemoved = await DELETE({
      collection : this.collection,
      filter
    })

    return studentRemoved 
  }

  async update({id,input}={}) 
  {
    let studentUpdated
    const query = { $set : input } 
    const filter = { _id: ObjectId(id) } 

    studentUpdated = await UPDATE({
      collection : this.collection,
      query,
      filter
    })

    return studentUpdated
  }
}
