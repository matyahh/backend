const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const criar = async (dados) => {
  const { nome, email, telefone, servico, data, hora } = dados;

  if (!nome || !email || !telefone || !servico || !data || !hora)
    throw new Error('Campos obrigatórios ausentes');

  const dataHora = new Date(hora); // hora é a data+hora completa

  // 🔒 Verificar conflito
  const conflito = await prisma.agendamento.findFirst({
    where: {
      hora: dataHora,
    },
  });

  if (conflito) {
    throw new Error('Já existe um agendamento para este horário');
  }

  return await prisma.agendamento.create({
    data: {
      nome,
      email,
      telefone,
      servico,
      data: new Date(data),
      hora: dataHora,
    },
  });
};


const listarTodos = async () => {
  return await prisma.agendamento.findMany({
    orderBy: { data: 'asc' },
  });
};

const atualizarStatus = async (id, status) => {
  return await prisma.agendamento.update({
    where: { id },
    data: { status },
  });
};

const deletar = async (id) => {
  return await prisma.agendamento.delete({ where: { id } });
};

const gerarHorarios = (inicio, fim, intervaloMinutos) => {
  const horarios = [];
  let atual = new Date(inicio);

  while (atual < fim) {
    horarios.push(new Date(atual));
    atual.setMinutes(atual.getMinutes() + intervaloMinutos);
  }

  return horarios;
};

const verificarDisponibilidade = async (dataStr) => {
  if (!dataStr) throw new Error('Data não informada');

  // Cria a data com o timezone correto
  const data = new Date(dataStr);
  
  // Base de horários da barbearia - usando UTC
  const abertura = new Date(data);
  abertura.setUTCHours(11, 0, 0, 0); // 8h BRT = 11h UTC

  const fechamento = new Date(data);
  fechamento.setUTCHours(21, 0, 0, 0); // 18h BRT = 21h UTC

  // Horários de 60 em 60 minutos
  const todosHorarios = gerarHorarios(abertura, fechamento, 60);

  const agendamentos = await prisma.agendamento.findMany({
    where: {
      data: {
        gte: abertura,
        lt: fechamento,
      },
      status: {
        in: ['pendente', 'confirmado']
      }
    },
  });

  const horariosOcupados = agendamentos.map((a) => a.hora.toISOString());

  const horariosDisponiveis = todosHorarios.filter(
    (h) => !horariosOcupados.includes(h.toISOString())
  );

  return horariosDisponiveis;
};

module.exports = {
  criar,
  listarTodos,
  atualizarStatus,
  deletar,
  verificarDisponibilidade,
};
