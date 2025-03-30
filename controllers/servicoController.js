const servicoService = require('../services/servicoService');

const listarServicos = async (req, res) => {
  const servicos = await servicoService.listarTodos();
  res.json(servicos);
};

const criarServico = async (req, res) => {
  try {
    const servico = await servicoService.criar(req.body);
    res.status(201).json(servico);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const atualizarServico = async (req, res) => {
  const { id } = req.params;
  try {
    const servico = await servicoService.atualizar(parseInt(id), req.body);
    res.json(servico);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deletarServico = async (req, res) => {
  const { id } = req.params;
  try {
    await servicoService.deletar(parseInt(id));
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  listarServicos,
  criarServico,
  atualizarServico,
  deletarServico,
};
