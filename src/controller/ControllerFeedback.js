import Feedback from '../models/Feedback.js'

class ControllerFeedback {

  static async getAllFeedback(req, res) {
    try {
      const feedback = await Feedback.getAllFeedback()
      res.status(200).json(feedback)
    } catch (error) {
      res.status(500).send('Erro ao buscar feedbacks')
    }
  }

  static async getOneFeedback(req, res) {
    const {...filters } = req.query;
    try {
      const feedback = await Feedback.getOneFeedback(filters)
      res.status(200).json(feedback)
    } catch (error) {
      res.status(500).send('Feedback não encontrado')
    }
  }

  static async submitFeedback (req, res)  {

    try {
      // Construir o array de mídia
      // const media = req.files.map(file => ({
      // url: `../uploads/${file.filename}`, // URL para acessar o arquivo
      // type: file.mimetype.startsWith('image') ? 'photo' : 'video'
    //))

      const { loja, produto, titulo, descrição } = req.body
      const feedback = new Feedback ( loja, produto, titulo, descrição )

      const result = await feedback.newFeedBack()
      res.status(201).json({ message: 'Feedback enviado com sucesso!', result })
    }catch (error) {
      res.status(500).json({ message: 'Erro ao enviar feedback', error: error.message })
    }
  }

  static async updateFeedback(req, res) {
    const updateFeedback = {
      loja : req.body.loja,
      produto : req.body.produto,
      titulo : req.body.titulo,
      descrição : req.body.descrição
    }
    const idFeedback = req.params._id

    try{
      const update = await Feedback.updateFeedback(idFeedback, updateFeedback)
      res.status(200).json(update)
    } catch (error) {
      res.status(500).send('Erro ao editar feedback')
    }
  }

  static async deleteFeedback(req, res) {
    const idFeedback = req.params._id

    try{
      const deleteFeedback = await Feedback.deleteFeedback(idFeedback)
      res.status(200).json(deleteFeedback)
    } catch (error) {
      res.status(500).send('Erro ao deletar feedback')
    }
  }
}

export default ControllerFeedback