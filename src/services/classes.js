import { GET_ALL,CREATE,DELETE } from '../lib/db'
import { ObjectId } from 'mongodb'


export class Classes 
{
  constructor()
  {
    this.collection = 'classes'
  }

  async getAll(filters={}) 
  {
    let classes 
    let filter

    if(Object.keys(filters).length)
    {
     filter =  { name  : new RegExp(filters.name || false)  }
    }

    classes = await GET_ALL({ 
      collection : this.collection,
      filter
    })

    return classes || []
  }

  async create(input) 
  {
    let classCreated

    classCreated = await CREATE({
      collection : this.collection,
      input
    })

    return classCreated 
  }

  async delete(id) 
  {
    let classRemoved
    const filter = {_id : ObjectId(id) }

    classRemoved = await DELETE({
      collection : this.collection,
      filter
    })

    return classRemoved 
  }
  

}