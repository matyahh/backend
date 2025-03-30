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

  const data = new Date(dataStr + 'T00:00:00-03:00'); // Especifica o timezone

  // Base de horários da barbearia
  const abertura = new Date(data);
  abertura.setHours(8, 0, 0, 0);

  const fechamento = new Date(data);
  fechamento.setHours(18, 0, 0, 0);

  // Horários de 60 em 60 minutos
  const todosHorarios = gerarHorarios(abertura, fechamento, 60);

  const agendamentos = await prisma.agendamento.findMany({
    where: {
      data: {
        gte: abertura,
        lt: fechamento,
      },
    },
  });

  const horariosOcupados = agendamentos.map((a) => a.hora.toISOString());

  const horariosDisponiveis = todosHorarios.map(horario => {
    // Ajusta o horário para considerar o timezone
    const adjustedDate = new Date(horario.getTime() - (3 * 60 * 60 * 1000)); // -3 horas
    return adjustedDate;
  }).filter(h => !horariosOcupados.includes(h.toISOString()));

  return horariosDisponiveis;
};

module.exports = {
  criar,
  listarTodos,
  atualizarStatus,
  deletar,
  verificarDisponibilidade,
};
