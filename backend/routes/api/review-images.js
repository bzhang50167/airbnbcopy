const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete('/:reviewId', requireAuth, async(req, res, next) => {
    const { user } = req;

    const image = await ReviewImage.findOne({
        where:{
            id: req.params.reviewId,
        }
    });

    if(!image){
        return res.status(404).json({
            message: "image not found"
        })
    }

    const review = await Review.findAll({
        where:{
            userId: user.id
        }
    });

    let reviewList = [];

    review.forEach(reviewer => {
        reviewList.push(reviewer.toJSON())
    })
    console.log(reviewList);

    reviewList.forEach(async review => {
        if(review.id === image.spotId){
            await image.destroy();

            return res.json({
                message: "Successfully deleted"
            })
        }
    })

    res.json({
        message: "Review not found"
    })
})

module.exports = router
