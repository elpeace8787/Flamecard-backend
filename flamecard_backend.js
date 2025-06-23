
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;

// Simulated balance
let totalBalance = 333000000000;

app.use(cors());
app.use(bodyParser.json());

// Get balance
app.get('/flamecard/balance', (req, res) => {
  res.json({ balance: totalBalance });
});

// Send funds
app.post('/flamecard/send', async (req, res) => {
  const { email, amount } = req.body;

  if (!email || !amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  if (amount > totalBalance) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  try {
    totalBalance -= parseFloat(amount);
    console.log(`✅ Sent $${amount} to ${email}`);
    res.json({ status: 'success', sent: amount, to: email });
  } catch (err) {
    console.error('Transfer failed:', err);
    res.status(500).json({ error: 'Transfer failed' });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 FlameCard Vault backend running on port ${PORT}`);
});
