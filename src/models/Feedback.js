import { Client } from '../database/connection.js'
import { ObjectId } from 'mongodb'

class Feedback {
  constructor(loja, produto, titulo, descrição, midia, curtidas) {
    this.loja = loja
    this.produto = produto
    this.titulo = titulo
    this.descrição = descrição
    //this.midia = midia
    this.curtidas = curtidas || 0
  }

  static async getAllFeedback() {
    const db = Client.db('TrabalhoBD2')

    // Busca todos os feedbacks na coleção
    const feedback = await db.collection('Feedback').find({}).toArray()
    return feedback
  }

  static async getOneFeedback(filters) {
    const db = Client.db('TrabalhoBD2')

    const feedback = await db.collection('Feedback').find({ filters }).toArray()
    return feedback
  } 

  async newFeedBack(){
    const db = Client.db('TrabalhoBD2')

    const createFeedback = await db.collection('Feedback').insertOne({
      loja: this.loja,
      produto: this.produto,
      titulo: this.titulo,
      descrição: this.descrição,
     // midia: feedback.midia,
      curtidas: this.curtidas || 0
    })
    return createFeedback
  }

  static async updateFeedback(feedbackId, updatefeedback) {
    const db = Client.db('TrabalhoBD2')

    const id = new ObjectId(feedbackId)

    // Atualiza o feedback no banco de dados
    const updateFeedback = await db.collection('Feedback').updateOne(
      { _id: id },
      { $set: updatefeedback }
    )
    return updateFeedback
  }

  static async deleteFeedback(idFeedback) {
    const db = Client.db('TrabalhoBD2')

    const id = new ObjectId(idFeedback)
    const deleteFeedback = await db.collection('Feedback').deleteOne({ _id: id })
    return deleteFeedback
  }

}

export default Feedback