const express = require('express');
const { User, Spot } = require('../../db/models');
// const { Op } = require('sequelize');

const router = express.Router();

router.post('/', async(req,res,next) => {
    const{ address, city, state, country, lat, lng, name, description, price} = req.body;

    const newSpot = await Spot.create({
        address:address,
        city:city,
        state:state,
        country:country,
        lat:lat,
        lng:lng,
        name:name,
        description:description,
        price:price
    })
    if(!address) return res.status(404).json({error:{address:'Street address is required'}})
    if(!city) return res.status(404).json({error:{city:'city is required'}})
    if(!state) return res.status(404).json({error:{state:'state is required'}})
    if(!country) return res.status(404).json({error:{country:'country is required'}})
    if(!lat) return res.status(404).json({error:{lat:'lat is required'}})
    if(!lng) return res.status(404).json({error:{lng:'lng is required'}})
    if(!name) return res.status(404).json({error:{name:'name is required'}})
    if(!description) return res.status(404).json({error:{description:'description is required'}})
    if(!price) return res.status(404).json({error:{price:'price is required'}})

    res.json(newSpot)
})

router.get('/', async(req, res, next) => {
    const spots = await Spot.findAll();

    res.json(spots)
})

module.exports = router
