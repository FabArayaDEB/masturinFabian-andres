const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const login = require('./modules/rutes/loginRutas')

const app = express();
const PORT = 3000;

app.use(cors());  

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.use('/login', login);

app.listen(PORT, () => {
    console.log(`Server corriendo en http://localhost:${PORT}`);
});