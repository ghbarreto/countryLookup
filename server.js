//https://restcountries.eu/rest/v2/region/{region}
// https://restcountries.eu/

const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const PORT = 8000;

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

app.post('/continents', (req, resp) => {
    let cont = req.body.Continent;
    console.log(cont);
    axios.get(`https://restcountries.eu/rest/v2/region/${cont}`)
        .then((res) => {
            resp.render('continents', {val: res.data});
    })
    
})

app.post('/country',  (req, resp) => {
    let country = req.body.Countries;
    axios.get(`https://restcountries.eu/rest/v2/name/${country}`)
        .then((res) => {
            let objCountries = {
                name: res.data[0].name,
                capital: res.data[0].capital,
                subregion: res.data[0].subregion,
                demonym: res.data[0].demonym,
                population: res.data[0].population,
                flag: res.data[0].flag,
                region: res.data[0].region
            }
            
            console.log(objCountries);
            resp.render('country', {values: objCountries}) ;
    })
})

app.listen(PORT, () => console.log("server is listening on port ", PORT))