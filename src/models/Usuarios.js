import bcrypt from 'bcrypt'
import { Client } from '../database/connection.js'

class Usuario {
  constructor(email, senha, nome) {
    this.email = email
    this.senha = senha
    this.nome = nome
  }

  static async getUser(idUser) {
    const db = Client.db('TrabalhoBD2')
  
    const User = await db.collection('Usuários').findOne({_id: idUser})
    return User
  }

  async createUser() {
    const db = Client.db('TrabalhoBD2')

    const hashedPassword = await bcrypt.hash(this.senha, 10) //faz a cripitografia da senha do usuário

    const creanewteUser = await db.collection('Usuários').insertOne({ //insere o email e a senha criptografada no banco
      email: this.email,
      senha: hashedPassword,
      nome: this.nome,
    })
    return creanewteUser
  }

  static async updateUser(userId, updateUSer) {
    const db = Client.db('TrabalhoBD2')

    // Cria um objeto de atualização vazio
    const updateFields = {}

    // Adiciona campos ao objeto de atualização apenas se estiverem presentes
    if (updateUSer.nome) {
      updateFields.nome = updates.nome;
    }
    if (updateUSer.email) {
      updateFields.email = updates.email;
    }
    if (updateUSer.senha) {
      // Criptografa a nova senha antes de atualizar
      const hashedPassword = await bcrypt.hash(updates.senha, 10);
      updateFields.senha = hashedPassword;
    }

    // Atualiza o usuário no banco de dados
    const updateUser = await db.collection('Usuários').updateOne(
      { _id: userId },
      { $set: updateFields }
    )
    return updateUser
  }

  static async deleteUser(idUser) {
    const db = Client.db('TrabalhoBD2')

    const deleteUser = await db.collection('List').deleteOne({_id: idUser})
    return deleteUser
  }
}

export default Usuario;
