const express = require('express');
const { User, Spot, Review, sequelize, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

router.post('/:reviewId/images', async(req, res, next) => {

    const review = await Review.findBkPk(req.params.reviewId)

    const image = await review.createReviewImage()
})

module.exports = router
