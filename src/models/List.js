import { Client } from '../database/connection.js'
import { ObjectId } from 'mongodb'

class List {
  constructor(title, description, customFields = {}) {
    this.title = title
    this.description = description
    this.customFields = customFields //Campos personalizados de cada usuário
  }

  async saveList() {
    const db = Client.db('TrabalhoBD2'); 
    //Salva uma nova tarefa no banco de dados
    const insertList = await db.collection('List').insertOne({
      title: this.title,
      description: this.description,
      customFields: this.customFields, 
    })
    return insertList;
  }

  static async getList() {
    const db = Client.db('TrabalhoBD2'); 
    //recupera todas as tarefas cadastradas na collection "List" e converte para array
    const allList = await db.collection('List').find().toArray()
    return allList
  }

  static async getListById(id) {
    const db = Client.db('TrabalhoBD2'); 
    //Recuperar tarefa pelo id
    const listById = await db.collection('List').findOne({ _id: ObjectId(id) }) //utiliza o "ObjectId" para transformar o id no formato que pe gerado pelo mongoDb
    return listById;
  }

  static async updateList(id, updates) {
    const db = Client.db('TrabalhoBD2'); 
    const updateList = await db.collection('List').updateOne(
      { _id: ObjectId(id) },
      { $set: updates }
    );
    return updateList;
  }

  static async deleteList(id) {
    const db = Client.db('TrabalhoBD2'); 
    const deleteList = await db.collection('List').deleteOne({ _id: ObjectId(id) });
    return deleteList;
  }
}

export default List