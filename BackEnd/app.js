const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const trabajadorRutas = require('./modules/routes/trabajadorRutas');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/api/trabajadores', trabajadorRutas);

app.listen(PORT, () => {
    console.log(`Server corriendo en http://localhost:${PORT}`);
})
