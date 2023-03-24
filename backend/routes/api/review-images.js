const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const { user } = req;

    const review = await Review.findOne({
        where:{
            userId: user.id
        },
        include:[
            {
                model: ReviewImage,
                where:{
                    id: req.params.imageId
                }
            }
        ]
    });

    if(!review){
        return res.status(404).json({
            message: "Spot Image could't be found"
        })
    }

    const image = await ReviewImage.findOne({
        where:{
            id: req.params.imageId
        }
    })

    // console.log(image.toJSON().url);
    const forgo = review.toJSON()
    // console.log(forgo.ReviewImages[0].url);
    if(image.toJSON().url === forgo.ReviewImages[0].url){
        console.log('hi');
        await image.destroy()
        return res.json({
            message: "Successfully deleted"
        })
    }
    res.json('hi')
})

module.exports = router
