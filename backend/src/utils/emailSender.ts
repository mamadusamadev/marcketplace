import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_GMAIL,
    pass: process.env.EMAIL_GMAIL_PASS,
  },
});


export const sendResetPasswordEmail = async (to: string, token: string) => {
    const resetUrl = `https://your-frontend-url.com/reset-password?token=${token}`;
  
    const mailOptions = {
      from: process.env.EMAIL_GMAIL,
      to,
      subject: 'Redefinição de Senha 🔒',
      html: `<p>Olá! 👋</p>
             <p>Recebemos uma solicitação para redefinir sua senha. Tudo bem, estamos aqui para ajudar! 😊</p>
             <p>Clique no link abaixo para criar uma nova senha:</p>
             <p><a href="${resetUrl}">Redefinir minha senha</a></p>
             <p><strong>Importante:</strong> Este link expira em <strong>1 hora</strong>, então aproveite para fazer a troca agora mesmo! ⏳</p>
             <p>Se não foi você quem solicitou, pode ignorar este e-mail com tranquilidade. Sua conta está segura conosco. 🛡️</p>
             <p>Abraços,<br>Equipe MercadoFácil 💙</p>`,
    };
  
    await transporter.sendMail(mailOptions);
  };
  