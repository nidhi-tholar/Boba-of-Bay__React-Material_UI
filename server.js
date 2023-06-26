const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express(); 
app.use(cors());
const port = process.env.PORT || 5000;

require('dotenv').config();
const apiKey = process.env.API_KEY;

app.listen(port, () => console.log(`Listening on port ${port}`)); 


app.get('/', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/getData', (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    };

    const location = req.query.location;
    const term = req.query.term;
    const itemsPerPage = req.query.itemsPerPage;

    axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}&sort_by=rating&limit=${itemsPerPage}`, options)
    .then(response => {
        let data = response.data;
        res.status(200).json(data); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    });
});