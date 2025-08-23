const express = require('express');
const cors = require('cors');
const db = require('./db/db');

const login = require('./modules/routes/loginRutas')
const trabajadorRutas = require('./modules/routes/trabajadorRutas');
const reportesRutas = require('./modules/routes/reportesRutas')

const app = express();
const PORT = 3000;

app.use(cors());  

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.use('/', login);
app.use('/api/trabajadores', trabajadorRutas);
app.use('/reportes', reportesRutas);



app.listen(PORT, () => {
    console.log(`Server corriendo en http://localhost:${PORT}`);
});