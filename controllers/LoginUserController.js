const { PrismaClient } = require('@prisma/client');
prisma = new PrismaClient()

const bcrypt = require('bcrypt');
const saltRounds = 10;

class LoginUserController {

    async loginuser(req, res) {

        const body = req.body;
        const email = body.email;
        const senha = body.senha;

        const user = await prisma.usuarios.findFirst({
            where: {
                email: email
            }
        });

        const senhavalida = bcrypt.compareSync(senha, user.senha);

        if (!senhavalida) {
            res.redirect('/');
        }
        else {
            req.session.user = user.id;
            res.redirect("/solicitar");
        }
    }
    async logout(req, res){
        req.session.user = null;
        res.redirect("/");
    }
}
module.exports = new LoginUserController();