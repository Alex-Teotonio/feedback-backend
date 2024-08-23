import { Client } from '../database/connection.js'

class Feedback {
  constructor(loja, produto, titulo, descrição, midia, curtidas) {
    this.loja = loja
    this.produto = produto
    this.titulo = titulo
    this.descrição = descrição
    this.midia = midia
    this.curtidas = curtidas
  }

  async newFeedBack(){
    const createFeedback = await db.collection('Feedback').insertOne({
      loja: this.loja,
      produto: this.produto,
      titulo: this.titulo,
      descrição: this.descrição,
      midia: this.midia,
      curtidas: this.curtidas
    })
    return createFeedback
  }

}

export default Feedback