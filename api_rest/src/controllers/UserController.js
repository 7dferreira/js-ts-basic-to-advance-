import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      return res.json(novoUser);
    } catch (e) {
      return res.status(400).json(e.errors.map((err) => err.message));
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      return res.json(user);
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['Missing ID.'],
        });
      }
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['Este utilizador não existe.'],
        });
      }

      const newData = await user.update(req.body);

      return res.json(newData);
    } catch (e) {
      return res.status(400).json(e.errors.map((err) => err.message));
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['Missing ID.'],
        });
      }
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['Este utilizador não existe.'],
        });
      }

      await user.destroy();

      return res.json(user);
    } catch (e) {
      return res.status(400).json(e.errors.map((err) => err.message));
    }
  }
}

export default new UserController();
