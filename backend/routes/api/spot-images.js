const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const { user } = req;

    const spot = await Spot.findOne({
        where:{
            ownerId: user.id
        },
        include:[
            {
                model: SpotImage,
                where:{
                    id: req.params.imageId
                }
            }
        ]
    });

    if(!spot){
        return res.status(404).json({
            message: "Spot Image could't be found"
        })
    }

    const image = await SpotImage.findOne({
        where:{
            id: req.params.imageId
        }
    })

    const forgo = spot.toJSON()
    if(image.toJSON().url === forgo.SpotImages[0].url){
        await image.destroy()
        return res.json({
            message: "Successfully deleted"
        })
    }
    res.json('hi')
})

module.exports = router
