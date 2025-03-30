const agendamentoService = require('../services/agendamentoService');

const criarAgendamento = async (req, res) => {
  try {
    const agendamento = await agendamentoService.criar(req.body);
    res.status(201).json(agendamento);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const listarAgendamentos = async (req, res) => {
  const agendamentos = await agendamentoService.listarTodos();
  res.json(agendamentos);
};

const atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const atualizado = await agendamentoService.atualizarStatus(parseInt(id), status);
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deletarAgendamento = async (req, res) => {
  const { id } = req.params;
  try {
    await agendamentoService.deletar(parseInt(id));
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const verificarDisponibilidade = async (req, res) => {
  const { data } = req.query;
  try {
    const horarios = await agendamentoService.verificarDisponibilidade(data);
    res.json(horarios);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  criarAgendamento,
  listarAgendamentos,
  atualizarStatus,
  deletarAgendamento,
  verificarDisponibilidade,
};

