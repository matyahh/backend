const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (nome, email, senha) => {
  const existing = await prisma.usuario.findUnique({ where: { email } });
  if (existing) throw new Error('Email já cadastrado');

  const senhaHash = await bcrypt.hash(senha, 10);

  const novoUsuario = await prisma.usuario.create({
    data: { nome, email, senha: senhaHash },
  });

  return { id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email };
};

const login = async (email, senha) => {
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) throw new Error('Usuário não encontrado');

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) throw new Error('Senha incorreta');

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return token;
};

module.exports = { register, login };
