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

    return res.json({ Booking: bookingList })
});

router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { user } = req;

    const { startDate, endDate } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const booking = await Booking.findOne({
        where: {
            id: req.params.bookingId,
            userId: user.id
        }
    });

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        })
    }

    console.log(booking);

    const allBookings = await Booking.findAll({
        where: {
            spotId: booking.spotId
        }
    })

    let bookingList = [];

    allBookings.forEach(booking => {
        bookingList.push(booking.toJSON())
    })

    const conflict = bookingList.find(booking => {
        return ((booking.startDate <= start && start <= booking.endDate) ||
            (booking.startDate <= end && end <= booking.endDate) ||
            (start <= booking.startDate && booking.startDate <= end))
    });

    if (conflict) {
        return res.status(409).json("Booking conflicts with an existing booking");
    }

    let booklist = [];
    booklist.push(booking.toJSON())

    if (booklist[0].endDate < new Date()) {
        return res.status(404).json({
            message: "Past booking can't be modified"
        })
    }

    booking.startDate = startDate;
    booking.endDate = endDate;

    await booking.save()

    res.json(booking)
});

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const { user } = req;

    const booking = await Booking.findOne({
        where: {
            id: req.params.bookingId,
            userId: user.id
        }
    });

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        })
    }

    let booklist = [];
    booklist.push(booking.toJSON())

    if (booklist[0].startDate < new Date()) {
        return res.status(404).json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    await booking.destroy()

    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;
