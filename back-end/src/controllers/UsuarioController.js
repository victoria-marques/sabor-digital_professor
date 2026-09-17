const UsuarioService = require('../services/UsuarioService');

class UsuarioController {
    async registrar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const token = await UsuarioService.registrar({ nome, email, senha });

            return res.status(200).json({ token });
        } catch (erro) {
            return res.status(erro.status || 500).json({ menssage: erro.menssage || 'Erro interno no servidor' });
        }
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const token = await UsuarioService.login({ email, senha });

            return res.status(200).json({ token });
        } catch (erro) {
            return res.status(erro.status || 500).json({ message: erro.menssage || 'Erro interno no servidor'});
        }
    }
}

module.exports = new UsuarioController;