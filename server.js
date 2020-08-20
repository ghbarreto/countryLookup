//https://restcountries.eu/rest/v2/region/{region}
// https://restcountries.eu/

const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const PORT = 8000;
let continents = `https://restcountries.eu/rest/v2/region/{region}`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, resp) => {   
    let double_continents = [];
    let unique_continents = [];
    axios.get(`https://restcountries.eu/rest/v2/all`)
        .then((a) => {
            for(let i = 0; i < a.data.length; i++){
                double_continents.push(a.data[i].region);
            }
            unique_continents = double_continents.filter((item, index) => {
                if(double_continents.indexOf(item) == index)
                    return item;
            });
        resp.render('index', {values: a.data, continents: unique_continents});
    })
})

app.post('/continents', (req, res) => {
    let val = req.body.continents;
    console.log(val);

    res.render('continents', {val: val});
})

app.post('/country',  (req, resp) => {
    let country = req.body.Countries;
    axios.get(`https://restcountries.eu/rest/v2/name/${country}`)
        .then((res) => {
            console.log(res.data[0]);
            resp.render('country', {values: res.data}) ;
    })
})

app.listen(PORT, () => console.log("server is listening on port ", PORT))