const { Telegraf } = require('telegraf');
const express = require('express');
require('dotenv').config();
const startWatcher = require('./watcher');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Mensaje inicial
bot.start((ctx) => ctx.reply('🤖 Bot activo y listo para monitorear tokens.'));

// Configuración del webhook
const app = express();
const path = `/bot${process.env.TELEGRAM_BOT_TOKEN}`;
bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}${path}`);

// Middleware para recibir las actualizaciones
app.use(bot.webhookCallback(path));

// Inicia servidor web
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
  console.log(`🌐 Webhook activo en: ${process.env.WEBHOOK_URL}${path}`);
});

// Inicia el watcher
startWatcher(bot);
