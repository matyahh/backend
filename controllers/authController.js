const authService = require('../services/authService');

const register = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const usuario = await authService.register(nome, email, senha);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const token = await authService.login(email, senha);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { register, login };
