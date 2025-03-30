const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listarTodos = async () => {
  return await prisma.servico.findMany();
};

const criar = async (dados) => {
  const { nome, codigo, preco, duracao } = dados;
  if (!nome || !codigo || !preco || !duracao) throw new Error('Campos obrigatórios ausentes');

  const servicoExistente = await prisma.servico.findUnique({ where: { codigo } });
  if (servicoExistente) throw new Error('Código já utilizado');

  return await prisma.servico.create({
    data: { nome, codigo, preco, duracao },
  });
};

const atualizar = async (id, dados) => {
  return await prisma.servico.update({
    where: { id },
    data: dados,
  });
};

const deletar = async (id) => {
  return await prisma.servico.delete({ where: { id } });
};

module.exports = {
  listarTodos,
  criar,
  atualizar,
  deletar,
};
