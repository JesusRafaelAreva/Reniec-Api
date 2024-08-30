const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000; // Puedes usar cualquier puerto disponible

app.use(cors()); // Permitir solicitudes CORS
app.use(express.json());

// Endpoint para consultar DNI
app.get('/api/dni', async (req, res) => {
  const { numero } = req.query;
  try {
    const response = await axios.get(`https://api.apis.net.pe/v1/dni?numero=${numero}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar DNI' });
  }
});

// Endpoint para consultar RUC
app.get('/api/ruc', async (req, res) => {
  const { numero } = req.query;
  try {
    const response = await axios.get(`https://api.apis.net.pe/v1/ruc?numero=${numero}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar RUC' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
