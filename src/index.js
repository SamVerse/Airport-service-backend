const express = require('express');


const {ServerConfig , Logger} = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes)

app.listen(ServerConfig.PORT , async () => {
    console.log(`Server running on port ${ServerConfig.PORT}`);

    // sequelize provides some methods to interact with the database like create, findAll, findByPk, destroy, etc.
    // const {City , Airport} = require('./models');
    // const cities = await City.findAll({});
    // console.log(cities);
    // const city = await City.findByPk(1);
    // console.log(city);
    // await city.createAirport({
    //     name: 'Indore Airport',
    //     code: 'IND',
    // })
    // await City.destroy({
    //     where: {
    //         id: 1
    //     }
    // })
    // const city = await City.create({
    //     name: 'Lucknow'
    // })
    // console.log(city);
    // await city.createAirport({
    //     name: 'Lucknow Airport',
    //     code: 'LKO',
    // })

})