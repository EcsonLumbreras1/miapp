const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/miapp';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- Conexión a Mongo y arranque del servidor ---
async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB conectado');

    // Schema/Modelo simple
    const Note = mongoose.model('Note', new mongoose.Schema({
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }));

    // API
    app.get('/api/notes', async (_req, res) => {
      const notes = await Note.find().sort('-createdAt');
      res.json(notes);
    });

    app.post('/api/notes', async (req, res) => {
      const { text } = req.body;
      if (!text) return res.status(400).json({ error: 'text requerido' });
      const note = await Note.create({ text });
      res.status(201).json(note);
    });

    // Arrancar la app sólo cuando la DB esté lista
    app.listen(3000, () => console.log('🚀 App escuchando en :3000'));
  } catch (err) {
    console.error('❌ Error conectando a Mongo:', err.message);
    process.exit(1);
  }
}
start();
