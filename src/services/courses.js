import { GET_ALL, GET_ONE,CREATE,DELETE,UPDATE,GET_ONE_WITH_PROYECTION } from '../lib/db'
import { ObjectId } from 'mongodb'

export class Courses 
{
  constructor()
  {
    this.collection = 'courses'
  }
  
  async getAll() 
  {
    let courses 
      courses = await GET_ALL({ 
        collection : this.collection,
      })

    return courses || []
  }

  async getOne(id) 
  {
    let course
    const filter = { _id : ObjectId(id) }

    course = await GET_ONE({ 
      collection : this.collection,
      filter
    })

    return course 
  }

  async create(input) 
  {
    let course

    course = await CREATE({
      collection : this.collection,
      input
    })

    return course 
  }

  async delete(id) 
  {
    let course
    const query = {_id : ObjectId(id) }

    course = await DELETE({
      collection : this.collection,
      query
    })

    return course 
  }

  async update({id,input}={}) 
  {
 
    let course
    const query = { $set : input } 
    const filter = { _id: ObjectId(id) } 

    course = await UPDATE({
      collection : this.collection,
      query,
      filter
    })
    return course 
  }

  
  async addClass({idRef,input}={}) 
  {
    let classAdd
    let response_projection


    const filter_class = { _id : ObjectId(input._id) } 
    const proyection ={ _id : 1,name:1 }

    response_projection = await GET_ONE_WITH_PROYECTION({
      collection : 'classes',
      filter : filter_class,
      proyection
    })

    const filter = { _id : ObjectId(idRef) }
    const query = { $addToSet : { class : response_projection } }

    classAdd = await UPDATE({
      collection : this.collection,
      query,
      filter
    })

    return {
      _id : classAdd['_id'],
      saved: response_projection
    } 
  }

  async removeClass({idRef,idClass}={}) 
  {
    let classRemoved

    const filter = { _id : ObjectId(idRef) }
    const query = { $pull : { class : { _id : ObjectId (idClass)} } }

    classRemoved = await UPDATE({
      collection : this.collection,
      query,
      filter
    })

    return {
      _id : classRemoved['_id'],
      removed : idClass
    } 
  }

  async addStudent({idRef,idStudent}={}) 
  {
    let response
    let response_proyection

    const filter_student = { _id :  ObjectId(idStudent._id) }
    const proyection  = { projection : { _id : 1,name :1,surnames :1 } }
    
    response_proyection = await GET_ONE_WITH_PROYECTION({
      collection : 'alumns',
      filter : filter_student,
      proyection
    })


    const filter = { _id : ObjectId(idRef) }
    const query = { $addToSet : { alumns : response_proyection} }

    response = await UPDATE({
      collection : this.collection,
      query,
      filter
    })
    
    // return response 
    return {
      _id : response['_id'],
      saved : response_proyection 
    }
  }

  async removeStudent({idRef,idStudent}={}) 
  {
    let response

    const filter = { _id : ObjectId(idRef) }
    const query = { $pull : { alumns : { _id : ObjectId( idStudent) } } }

    response = await UPDATE({
      collection : this.collection,
      query,
      filter
    })

    // return response
    return {
      _id : response['_id'],
      removed : idStudent
    } 
  }
}