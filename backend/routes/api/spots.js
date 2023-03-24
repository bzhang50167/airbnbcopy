const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

const validateSpots = [
    check('address').exists({ checkFalsy: true }).withMessage("Street address is required"),
    check('city').exists({ checkFalsy: true }).withMessage('City is required'),
    check('state').exists({ checkFalsy: true }).withMessage('State is required'),
    check('country').exists({ checkFalsy: true }).withMessage("Country is required"),
    check('lat').exists({ checkFalsy: true }).withMessage("Latitude is not valid"),
    check('lng').exists({ checkFalsy: true }).withMessage("Longitude is not valid"),
    check('name').exists({ checkFalsy: true }).withMessage("Name must be less than 50 characters"),
    check('description').exists({ checkFalsy: true }).withMessage("Description is required"),
    check('price').exists({ checkFalsy: true }).withMessage("Price per day is required"),
    handleValidationErrors
];

const validateReview = [
    check('review').exists({ checkFalsy: true }).withMessage("Review text is required"),
    check('stars').exists({ checkFalsy: true }).withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];


router.get('/', async (req, res, next) => {
    let errorResult = { errors: [], count: 0, pageCount: 0 };

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    if(page <= 0){
        errorResult.errors.push({
                page: "Page must be greater than or equal to 1"
        })
    }

    if (!page) {
        page = 1
    }

    if(size <= 0){
        errorResult.errors.push({
                size: "size must be greater than or equal to 1"
        })
    }

    if (!size) {
        size = 20
    }

    const pagination = {};

    const where = {};

    if(minLat === NaN){
        errorResult.errors.push({
                minLat: "Minimum latitude is invalid"
        })
    }

    if (minLat) {
        where.lat = {
            [Op.gte]: minLat
        }
    }

    if(maxLat === NaN){
        errorResult.errors.push({
                maxLat: "Maximum latitude is invalid"
        })
    }

    if (maxLat) {
        where.lat = {
            [Op.lte]: maxLat
        }
    }

    if(minLng === NaN){
        errorResult.errors.push({
                minLng: "Minimum longitude is invalid"
        })
    }

    if (minLng) {
        where.lng = {
            [Op.gte]: minLng
        }
    }

    if(maxLng === NaN){
        errorResult.errors.push({
                maxLng: "Maximum longitude is invalid"
        })
    }

    if (maxLng) {
        where.lng = {
            [Op.lte]: maxLng
        }
    }

    if(minPrice < 0){
        errorResult.errors.push({
                minPrice: "Minimum price must be greater than or equal to 0"
        })
    }

    if (minPrice) {
        where.price = {
            [Op.gte]: minPrice
        }
    }

    if(maxPrice < 0){
        errorResult.errors.push({
                maxPrice: "Maximum price must be greater than or equal to 0"
        })
    }

    if (maxPrice) {
        where.price = {
            [Op.lte]: maxPrice
        }
    }

    pagination.offset = size * (page-1);
    pagination.limit = size;

    const spots = await Spot.findAll({
        where: where,
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ],
        ...pagination
    });

    let spotList = [];

    spots.forEach(spot => {
        spotList.push(spot.toJSON())
    })

    spotList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = 'no preview image'
        }
        delete spot.SpotImages
    })

    spotList.forEach(spot => {
        let sum = 0;
        let count = 0;
        spot.Reviews.forEach(review => {
            if (review.stars) {
                sum += review.stars;
                count++
            }
        })
        if (count > 0) {
            spot.avgRating = parseFloat((sum / count).toFixed(1))
        } else {
            spot.avgRating = 0
        }
        delete spot.Reviews
    })
    if (errorResult.errors.length) {
        return res.status(400).json(errorResult)
    }

    res.json({
        Spots:{
            spotList,
        },
        page:page,
        size:size
    });
});

router.post('/', requireAuth, validateSpots, async (req, res, next) => {
    const { user } = req
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.build({
        ownerId: user.id,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    })

    await newSpot.save()

    res.json(newSpot)
})

router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req

    const spots = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    });

    let spotList = [];

    spots.forEach(spot => {
        spotList.push(spot.toJSON())
    })

    spotList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = 'no preview image'
        }
        delete spot.SpotImages
    })

    spotList.forEach(spot => {
        let sum = 0;
        let count = 0;
        spot.Reviews.forEach(review => {
            if (review.stars) {
                sum += review.stars;
                count++
            }
        })
        if (count > 0) {
            spot.avgRating = parseFloat((sum / count).toFixed(1))
        } else {
            spot.avgRating = 0
        }
        delete spot.Reviews
    })

    res.json({ Spots: spotList })
})

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {

    const { user } = req;

    const spot = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    })

    if (spot.length === 0) {
        return res.status(404).json({
            message: "Spot doesn't exist"
        })
    }

    console.log(spot.length);

    console.log(spot[0].toJSON());

    let allBooking = [];
    let correctBooking = [];

    spot.forEach(booking => {
        allBooking.push(booking.toJSON())
    })

    allBooking.forEach(booking => {
        if (booking.spotId === user.id) {
            // console.log(booking.spotId);
            // console.log(user.id);
            const resbody = {
                User: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                spotId: booking.spotId,
                userId: user.id,
                startDate: booking.startDate,
                endDate: booking.endDate,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt
            }
            correctBooking.push(resbody)
        }
        else if (booking.spotId !== user.id) {
            const resbody = {
                spotId: booking.spotId,
                startDate: booking.startDate,
                endDate: booking.endDate
            }
            correctBooking.push(resbody)
        }
    })

    return res.json({Booking:correctBooking})
})

router.post('/:id/images', requireAuth, async (req, res, next) => {
    const { url: imageUrl, preview: imagePreview } = req.body;

    const spot = await Spot.findByPk(req.params.id);

    if (!spot) {
        return res.status(404).json({
            error: {
                message: 'Spot not found'
            }
        })
    }

    const image = await spot.createSpotImage({
        url: imageUrl,
        preview: imagePreview
    })

    const { id, url, preview } = image.toJSON();

    res.json({
        id,
        url,
        preview
    })
})

router.get('/:spotId/reviews', async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    const reviews = await spot.getReviews({
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });


    res.json(
        {
            Reviews: reviews
        }
    );
})

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const { user } = req;
    const { review, stars } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    const existingReview = await Review.findAll({
        where: {
            spotId: req.params.spotId,
            userId: user.id
        }
    })

    if (existingReview.length > 0) {
        return res.status(400).json({
            message: "User already has a review for this spot"
        })
    }

    if (existingReview.userId === user.id) {
        return res.status(400).json({
            message: "User already has a review for this spot"
        })
    }

    const currentUser = await User.findByPk(user.id)

    console.log(currentUser);

    const newReview = await spot.createReview(
        {
            spotId: spot.id,
            userId: currentUser.id,
            review: review,
            stars: stars,
        }
    )

    res.json(newReview);
})

router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {

    let errorResult = { errors: [], count: 0, pageCount: 0 };
    const { user } = req
    const { startDate, endDate } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    const allBookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    })

    let bookingList = [];

    allBookings.forEach(booking => {
        bookingList.push(booking.toJSON())
    })

    if (!spot) errorResult.errors.push({
        message: "Spot does not exist"
    });
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) errorResult.errors.push({
        message: "endDate cannot be on or before startDate"
    })

    const conflict = bookingList.find(booking => {
        return ((booking.startDate <= start && start <= booking.endDate) ||
            (booking.startDate <= end && end <= booking.endDate) ||
            (start <= booking.startDate && booking.startDate <= end))
    });

    if (conflict) {
        errorResult.errors.push({
            message: "Booking conflicts with an existing booking"
        })
    }

    const booking = await spot.createBooking({
        userId: user.id,
        startDate: startDate,
        endDate: endDate,
    })

    if (errorResult.errors.length) {
        return res.status(400).json(errorResult)
    }

    res.json(booking)
})

router.get('/:spotId', async (req, res, next) => {

    const { user } = req
    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }
    const reviews = await spot.getReviews()
    const images = await spot.getSpotImages()

    reviews.forEach(review => {
        let count = 0;
        let sum = 0;
        if (review.stars) {
            sum += review.stars;
            count++
        };
        if (count > 0) {
            spot.count = count;
            spot.avgRating = sum / count
        } else {
            spot.count = 0
            spot.avgRating = 0
        }
    })

    images.forEach(image => {
        spot.imgId = image.id;
        spot.imgUrl = image.url;
        spot.imgReview = image.preview
    })

    spot.user = user.id;
    spot.first = user.firstName;
    spot.last = user.lastName;

    res.json({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        numReviews: spot.count,
        avgStarRating: spot.avgRating,
        SpotImages: {
            id: spot.imgId,
            url: spot.imgUrl,
            preview: spot.imgReview
        },
        Owner: {
            id: spot.user,
            firstName: spot.first,
            lastName: spot.last
        }
    })
})

router.put('/:spotId', requireAuth, validateSpots, async (req, res, next) => {
    const { user } = req;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const updated = await Spot.findByPk(req.params.spotId);

    if (!updated) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    updated.address = address;
    updated.city = city;
    updated.state = state;
    updated.country = country;
    updated.lat = lat;
    updated.lng = lng;
    updated.name = name;
    updated.description = description;
    updated.price = price;

    await updated.save()

    res.json(updated)
})

router.delete('/:spotId', requireAuth, async (req, res, next) => {

    const { user } = req;
    const oldSpot = await Spot.findByPk(req.params.spotId);

    if (!oldSpot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    const dead = oldSpot.toJSON();
    console.log(user.id);
    if (user.id === dead.ownerId) {
        await oldSpot.destroy();

        return res.json({
            message: 'Successfully deleted'
        })
    } else {
        return res.json({
            message: "Cannot delete what is not yours"
        })
    }
})


module.exports = router
