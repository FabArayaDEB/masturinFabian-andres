const express = require('express');
const cors = require('cors');
const db = require('./db/db');
<<<<<<< HEAD
const login = require('./modules/rutes/loginRutas')
=======
const trabajadorRutas = require('./modules/routes/trabajadorRutas');

>>>>>>> 5a31880ef7625d2f291a7abd7062ee73ba3436dc

const app = express();
const PORT = 3000;

<<<<<<< HEAD
app.use(cors());  

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.use('/login', login);
=======
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/api/trabajadores', trabajadorRutas);
>>>>>>> 5a31880ef7625d2f291a7abd7062ee73ba3436dc

app.listen(PORT, () => {
    console.log(`Server corriendo en http://localhost:${PORT}`);
});