const UsuarioRepository = require('../repositories/UsuarioRepository')
const UsuarioService = require('../repositories/UsuarioRepository')

class UsuarioService {
    async cadastrar({ nome, email, senha, papel }) {
        // Impede e-mail duplicados
        const usuarioExiste = await UsuarioRepository.findByEmail(email)
        if (usuarioExiste){
            throw new Error('E-mail já existe ou já está cadastrado')
        }
    }

    async registrarUsuario() {
        const salt = await bcrypt.genSalt(10);

        const senhaHash = await bcrypt.hash(senha, salt);

        return senhaHash;
    }
    
    async login() {
        const senhaCorreta = await bcrypt.compare(senhaDigitada, usuario.senha)

        const token = jwt.sign({ id: usuario.id, papel: usuario.papel }, 'sua_chave_secreta', { expiresIn: '8h' });

        return senhaCorreta, token
    }


}
