const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({ mensagem: "Token não fornecido"
    });

    const token = authHeader.split(' ')[1];

    try {
        const decodificado = jwt.verify(token, 'sua_chave_secreta');
        req.usuarioPapel = decodificado.papel;
        return next()
    } catch (erro) {
        return res.status(401).json({ mensagem: "Token inválido" });        
    }
};

const verificarAdmin = (req, res, next) => {
    if(req.usuarioPapel !== 'admin') {
        return res.status(403).json({ mensagem: "Acesso restrito para administradores" });
    }
    return next();
};

module.exports = { verificarToken, verificarAdmin };