const express = require('express');
const { User, Spot, Review, sequelize, SpotImage } = require('../../db/models');

const router = express.Router();

router.get('/current', async(req, res, next) => {
    const { user } = req;

    const reviews = await Review.findAll({
        where:{
            userId: user.id
        }
    })

    res.json(reviews)
})

router.get('')


module.exports = router
