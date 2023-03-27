const express = require('express');
const { User, Spot, Review, sequelize, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateReview = [
    check('review').exists({ checkFalsy: true }).withMessage("Review text is required"),
    check('stars').exists({ checkFalsy: true }).withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

router.get('/current',requireAuth, async(req, res, next) => {

    const { user } = req;

    const reviews = await Review.findAll({
        where:{
            userId: user.id
        },
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

    const reviewList = [];

    reviews.forEach(review => {
        reviewList.push(review.toJSON());
    })

    reviewList.forEach(review => {
       review.Spot.SpotImages.forEach(image => {
        review.Spot.previewImage = image.url
       })
       delete review.Spot.SpotImages
    })

    res.json({Reviews:reviewList});
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

    const totalImage = await ReviewImage.findAll({
        where:{
            reviewId: review.id
        }
    })

    let imageList = [];

    totalImage.forEach(image => {
        imageList.push(image.toJSON())
    })

    if(imageList.length > 10){
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        })
    };

    res.json({
        id: image.id,
        url: image.url
    })
})

router.put('/:reviewId',requireAuth,validateReview, async (req, res, next) => {

    const { user } = req;

    const { review, stars } = req.body;

    const updated = await Review.findByPk(req.params.reviewId);

    if(!updated){
        return res.status(404).json(    {
            "message": "Review couldn't be found"
          })
    }


    if(user.id === updated.userId){
        if(!updated) return res.status(404).json("Review couldn't be found")

        updated.review = review;
        updated.stars = stars;

        await updated.save()

        res.json(updated)
    } else {
        return res.status(404).json({
            message: "Cannot delete what is yours"
        })
    }

})

router.delete('/:reviewId', requireAuth, async(req, res, next) => {

    const{ user } = req;
    const old = await Review.findByPk(req.params.reviewId);

    if(!old){
        return res.status(404).json({
            message:"Review couln't be found"
        })
    }

    if(user.id === old.userId){
        await old.destroy();

        return res.json({
            message: "Successfully deleted"
        })
    } else {
        return res.json({
            message: "Cannot delete what is not yours"
        })
    }
})


module.exports = router
