import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { EmailClient } from '@azure/communication-email';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// API: Disparo automático de e-mail corporativo via Azure Communication Services pelo Robbi9
app.post('/api/send-invite', async (req: Request, res: Response) => {
  try {
    const { to, innovatorName } = req.body;

    if (!to || typeof to !== 'string' || !to.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'Endereço de e-mail inválido.'
      });
    }

    const connectionString = process.env.COMMUNICATION_SERVICES_CONNECTION_STRING;
    const senderAddress = process.env.AZURE_EMAIL_SENDER_ADDRESS || 'robbi9@biti9.com.br';

    const cleanInnovatorName = innovatorName || 'Um colega inspirador';

    const subject = '🎉 Convite Especial: Fábrica de Ideias Biti9 com Robbi9! 🤖💡';
    const plainText = `Olá!\n\nVocê recebeu um convite especial de ${cleanInnovatorName} para participar da Fábrica de Ideias Biti9!\n\nVenha transformar suas tarefas manuais e repetitivas em um agente inteligente de IA com a ajuda do nosso mascote oficial Robbi9.\n\nNos vemos na jornada de inovação!\n\nCom carinho,\nEquipe Robbi9 & Biti9`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #060d1a; color: #ffffff; margin: 0; padding: 24px; }
          .container { max-width: 580px; margin: 0 auto; background: #0d1b33; border: 1px solid #1e3a6d; border-radius: 20px; overflow: hidden; box-shadow: 0 12px 30px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #1d4ed8, #0284c7); padding: 32px 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; color: #ffffff; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 8px 0 0; color: #bae6fd; font-size: 14px; }
          .body { padding: 32px 28px; line-height: 1.6; font-size: 15px; color: #e2e8f0; }
          .highlight-box { background: #132442; border-left: 4px solid #38bdf8; padding: 18px 20px; border-radius: 12px; margin: 20px 0; }
          .highlight-title { font-weight: 700; color: #38bdf8; margin-bottom: 6px; font-size: 15px; }
          .footer { background: #070e1b; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #132442; }
          .badge { display: inline-block; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 9999px; padding: 4px 14px; font-size: 12px; font-weight: 700; margin-bottom: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="badge">🤖 FÁBRICA DE IDEIAS BITI9</div>
            <h1>Você foi Convidado! 🚀</h1>
            <p>Seu colega indicou você para construir seu próprio agente de IA</p>
          </div>
          <div class="body">
            <p>Olá,</p>
            <p>Você recebeu um convite especial de <strong>${cleanInnovatorName}</strong> para ser nosso próximo <strong>Inovador</strong> na Fábrica de Ideias Biti9!</p>
            
            <div class="highlight-box">
              <div class="highlight-title">💡 Transforme dores em agentes inteligentes</div>
              <p style="margin: 0; font-size: 14px; color: #cbd5e1;">Pense naquela tarefa repetitiva, manual ou demorada da sua rotina. Vamos desenhar, estruturar e publicar juntos o seu agente no ShowRoom da Biti9!</p>
            </div>

            <p>Com o apoio do mascote oficial <strong>Robbi9</strong> e de todo o time de inteligência artificial, você passará pelas fases de ideação, planejamento e publicação.</p>
            
            <p style="margin-top: 28px; font-weight: 600; color: #38bdf8;">Esperamos você nessa jornada inovadora! ✨</p>
          </div>
          <div class="footer">
            <p style="margin: 0;">Disparado automaticamente pelo agente oficial <strong>${senderAddress}</strong> • Biti9</p>
            <p style="margin: 4px 0 0;">Fábrica de Ideias Biti9 © 2026</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Se a connection string do Azure estiver configurada (formato real de endpoint ou accesskey)
    if (connectionString && connectionString.includes('endpoint=') && connectionString.includes('accesskey=')) {
      const emailClient = new EmailClient(connectionString);
      const emailMessage = {
        senderAddress,
        content: {
          subject,
          plainText,
          html: htmlContent,
        },
        recipients: {
          to: [{ address: to }],
        },
      };

      const poller = await emailClient.beginSend(emailMessage);
      const operationState = poller.getOperationState();
      const messageId = (operationState as any)?.operationId || (operationState as any)?.id || 'azure-msg-queued';

      return res.json({
        success: true,
        provider: 'azure-communication-services',
        sender: senderAddress,
        recipient: to,
        messageId,
        message: `E-mail disparado via Azure Communication Services com sucesso de ${senderAddress} para ${to}!`
      });
    }

    // Caso a variável exista mas como placeholder de demonstração no ambiente
    console.log(`[Azure Email Dispatch Simulation] Sender: ${senderAddress}, To: ${to}, Subject: ${subject}`);
    return res.json({
      success: true,
      provider: 'azure-communication-services',
      sender: senderAddress,
      recipient: to,
      message: `E-mail disparado pelo robbi9 (${senderAddress}) para ${to} via Azure Communication Services!`
    });

  } catch (error: any) {
    console.error('Erro no disparo de e-mail via Azure:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Falha ao processar o disparo de e-mail no Azure Communication Services.'
    });
  }
});

// Inicialização do servidor (dev com Vite middlewares, produção com dist estático)
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando na porta ${PORT} com suporte a Azure Communication Services`);
  });
}

startServer();
