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
    let teacher

    teacher = await CREATE({
      collection : this.collection,
      input
    })


    return teacher 
  }

  async delete(id) 
  {
    let teacher
    const query = {_id : ObjectId(id) }

    teacher = await DELETE({
      collection : this.collection,
      query
    })


    return teacher 
  }
  

}