const express = require('express');
const router = express.Router();
const {
  listarServicos,
  criarServico,
  atualizarServico,
  deletarServico,
} = require('../controllers/servicoController');
const auth = require('../middlewares/authMiddleware');

// pública
router.get('/', listarServicos);

// protegidas
router.post('/', auth, criarServico);
router.put('/:id', auth, atualizarServico);
router.delete('/:id', auth, deletarServico);

module.exports = router;
