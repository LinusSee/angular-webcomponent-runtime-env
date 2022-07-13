const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(function(req,res,next){setTimeout(next, 2000)});

app.use(cors());

app.use(express.static('deployments'));

app.get('/persons/1', (req, res) => {
  res.send({forename: 'foo', surname: 'bar'});
});

app.listen(port, () => {
    console.log(`WebComponent node server listening to port ${port}...`);
});
