const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function init() {
  try {
    // Dados do admin
    const adminData = {
      email: 'admin@admin.com',
      senha: 'admin123',
      nome: 'Administrador'
    };

    // Verifica se já existe
    const existing = await prisma.usuario.findUnique({ 
      where: { email: adminData.email } 
    });
    
    if (!existing) {
      // Cria o hash da senha
      const senhaHash = await bcrypt.hash(adminData.senha, 10);

      // Cria o usuário admin
      await prisma.usuario.create({
        data: {
          nome: adminData.nome,
          email: adminData.email,
          senha: senhaHash,
        },
      });
      console.log('✅ Usuário admin criado com sucesso');
    } else {
      console.log('ℹ️ Usuário admin já existe');
    }

  } catch (error) {
    console.error('❌ Erro na inicialização:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executa a inicialização
init();
