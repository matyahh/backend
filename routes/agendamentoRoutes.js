const express = require('express');
const router = express.Router();
const {
  criarAgendamento,
  listarAgendamentos,
  atualizarStatus,
  deletarAgendamento,
  verificarDisponibilidade
} = require('../controllers/agendamentoController');
const auth = require('../middlewares/authMiddleware');

// público
router.post('/', criarAgendamento);
// rota pública
router.get('/disponibilidade', verificarDisponibilidade);

// rotas protegidas
router.get('/', auth, listarAgendamentos);
router.put('/:id/status', auth, atualizarStatus);
router.delete('/:id', auth, deletarAgendamento);

module.exports = router;

