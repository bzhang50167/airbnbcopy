const express = require('express');
const { User, Spot, Review, sequelize, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/current',requireAuth, async(req, res, next) => {

    const { user } = req;

    const reviews = await Review.findByPk(user.id,{
        include:[
            {
                model: User,
                attributes:['id','firstName','lastName']
            },
            {
                model: Spot,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: {
                    model: SpotImage
                }
            },
            {
                model: ReviewImage,
                attributes: ['id','url']
            }
        ]
    })




    res.json(reviews)
})

router.post('/:reviewId/images',requireAuth, async(req, res, next) => {

    const { url } = req.body;

    const review = await Review.findByPk(req.params.reviewId);

    if(!review){
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    }

    const image = await review.createReviewImage(
        {
            reviewId: review.id,
            url: url
        }
    )

    res.json({
        id: image.id,
        url: image.url
    })
})

router.put('/:reviewId',requireAuth, async (req, res, next) => {

    const { review, stars } = req.body;


})

module.exports = router
