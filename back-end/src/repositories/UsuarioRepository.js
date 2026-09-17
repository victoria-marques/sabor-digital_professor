const pool = require('../config/database')

class UsuarioRepository {
    async findAll() {
        const [rowns] = await pool.query ('SELECT * FROM usuario ORDER BY id DESC')
        return rowns;
    }
// Inserindo o usuário no banco
    async create({nome, email, senha, papel}) {
        const sql = `
         INSERT INTO usuarios (nome, email, senha, papel)
         VALUES (?,?,?,?)
         RETURNING id, nome, email, papel
        `
        const values = [nome, email, senha, papel]

        return result.rowns(sql, values [0]) // Retorna o usuário recém-criado
    }

    async findByEmail(email){
        const sql = `
         SELECT * FROM usuarios
         WHERE email = ?
        `

        const values = [email]

        return result.rowns(sql, values [0] || null) // Retorna o usuário ou vazio caso não encontre
    }
}

module.exports = new UsuarioRepository();