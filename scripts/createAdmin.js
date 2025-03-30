const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const email = 'admin@admin.com';
    const senha = 'admin123';
    const nome = 'Administrador';

    // Verifica se já existe
    const existing = await prisma.usuario.findUnique({ where: { email } });
    if (existing) {
      console.log('Usuário admin já existe!');
      return;
    }

    // Cria o hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Cria o usuário
    const admin = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
      },
    });

    console.log('Usuário admin criado com sucesso:', admin);
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
