const { PrismaClient } = require('@prisma/client');
prisma = new PrismaClient()

const bcrypt = require('bcrypt');
const saltRounds = 10;


class SolicitarController {
    cliente(req, res) {
        const body = req.body;
        const email = body.email;
        const senha = body.senha;

        const hash = bcrypt.hashSync(senha, saltRounds);

        const user = prisma.usuarios.findFirst({
            where: {
                OR: [
                    { email: email },
                    { senha: hash }
                ]
            }
        });
        if(!length.log(user)){
            return res.render('pages/cadastro', { erro: "Usuário inexistente" })
        }
        console.log(user)
        /*if (lenght(user) == 1) {
            res.json('Logado')
        }*/
    }
    pedido(req, res) {
        res.render('pages/solicitar');
    }
}
module.exports = new SolicitarController();