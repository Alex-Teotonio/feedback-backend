import List from '../models/List.js'

class ListController { 
  static newList(req , res) {
    const { title, description, customFields } = req.body

    const list = new List(title, description, customFields) //Instanciando a classe List, passando para o contrutor os itens da tarefa
    list.saveList() //invoca o metodo da classe que adiciona uma tarefa a lista

    res.status(200).json(list) //retorna status de sucesso e a lista de tarefas que foi criada
  }

  static async allList(req , res) {
    const allList = await List.getList() //Metodo que retorna todas as tarefas

    res.status(200).json(allList)
  }

  static async listById(req, res) {
    const id = req.params.id

    const listId = await List.getListById(id)

    res.status(200).json(listId)
  }

  static async updateList(req, res) {
    const id = req.params.id
    const updates = { 
      title : req.body.title,
      description : req.body.description,
      customFields : req.body.customFields
    }

    const updateList = await List.updateList(id, updates)

    res.status(200).json(updateList)
  }

  static async removeList(req, res) { 
    const id = req.params.id
    const removeList = await List.removeList(id)

    res.status(200).send('Tarefa removida com sucesso')
  }
}

export default ListController