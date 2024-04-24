import Aluno from '../models/Aluno';

class HomeController {
  async Index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Daniel',
      sobrenome: 'Ferreira',
      email: 'dfile@gmail.com',
      idade: '111',
      peso: '333',
      altura: '111',
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
