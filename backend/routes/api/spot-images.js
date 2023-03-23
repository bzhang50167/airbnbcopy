const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const { user } = req;

    const image = await SpotImage.findAll({
        where:{
            id: req.params.imageId,
        }
    });

    const spot = await Spot.findOne({
        where:{
            ownerId: user.id
        }
    });

    if(spot.id === image.spotId){
        await image.destroy();

        return res.json({
            message: "Successfully deleted"
        })
    }

    res.json({
        message: "Spot Image couldn't be found"
    })
})

module.exports = router
