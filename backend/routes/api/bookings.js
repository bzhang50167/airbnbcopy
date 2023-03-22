const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {

    const { user } = req;

    const bookings = await Booking.findAll({
        include: [
            {
                model: Spot,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: {
                    model: SpotImage
                }
            },
        ],
        where: {
            userId: user.id
        },
    });

    const bookingList = [];

    bookings.forEach(booking => {
        bookingList.push(booking.toJSON())
    })

    bookingList.forEach(booking => {
        booking.Spot.SpotImages.forEach(image => {
            booking.Spot.previewImage = image.url
        })
        delete booking.Spot.SpotImages
    })

    return res.json(bookingList)
})

module.exports = router;
