const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send({ Hi: 'Hi'});
});

// process.env.PORT => if there is an evn variable defined by heroku or use 5000
const PORT = process.env.PORT || 5000; 

app.listen(PORT);