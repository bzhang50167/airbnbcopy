const express = require('express');
const { User, Spot, Review, sequelize, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
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
            spot.avgRating = sum / count
        } else {
            spot.avgRating = 0
        }
        delete spot.Reviews
    })

    res.json(spotList)
});

router.post('/', requireAuth, async (req, res, next) => {
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
    if (!address) return res.status(404).json({ error: { address: 'Street address is required' } })
    if (!city) return res.status(404).json({ error: { city: 'city is required' } })
    if (!state) return res.status(404).json({ error: { state: 'state is required' } })
    if (!country) return res.status(404).json({ error: { country: 'country is required' } })
    if (!lat) return res.status(404).json({ error: { lat: 'lat is required' } })
    if (!lng) return res.status(404).json({ error: { lng: 'lng is required' } })
    if (!name) return res.status(404).json({ error: { name: 'name is required' } })
    if (!description) return res.status(404).json({ error: { description: 'description is required' } })
    if (!price) return res.status(404).json({ error: { price: 'price is required' } })

    await newSpot.save()

    res.json(newSpot)
})
router.get('/current',requireAuth, async (req, res, next) => {
    const { user } = req

    const spot = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    })

    res.json(spot)
})


router.post('/:id/images',requireAuth, async (req, res, next) => {
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

router.get('/:spotId/reviews', async(req, res, next) => {
    const { user } = req;
    const spot = await Spot.findByPk(req.params.spotId,{
        include: [
            {
                model: Review,
                include:{
                    model: ReviewImage
                },
                seperate: true,
                required: false
            }
        ]
    });

    delete spot.dataValues.Reviews

    const review = await spot.getReviews()

    res.json(spot)
})

router.get('/:spotId', async (req, res, next) => {

    const { user } = req
    const spot = await Spot.findByPk(req.params.spotId)
    const reviews = await spot.getReviews()
    const images = await spot.getSpotImages()

    reviews.forEach(review => {
        let count = 0;
        let sum = 0;
        if(review.stars){
            sum+= review.stars;
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
        SpotImages:{
            id: spot.imgId,
            url: spot.imgUrl,
            preview: spot.imgReview
        },
        Owner:{
            id: spot.user,
            firstName: spot.first,
            lastName: spot.last
        }
    })
})

router.put('/:spotId', requireAuth, async(req, res, next) => {
    const{ user } = req;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const updated = await Spot.findByPk(req.params.spotId)

    updated.address = address;
    updated.city = city;
    updated.state = state;
    updated.country = country;
    updated.lat = lat;
    updated.lng = lng;
    updated.name = name;
    updated.description = description;
    updated.price = price;

    if(!address) return res.status(404).json({message:'address cant be empty'})
    if(!city) return res.status(404).json({message:'city cant be empty'})
    if(!state) return res.status(404).json({message:'state cant be empty'})
    if(!country) return res.status(404).json({message:'country cant be empty'})
    if(!lat) return res.status(404).json({message:'lat cant be empty'})
    if(!lng) return res.status(404).json({message:'lng cant be empty'})
    if(!name) return res.status(404).json({message:'name cant be empty'})
    if(!description) return res.status(404).json({message:'description cant be empty'})
    if(!price) return res.status(404).json({message:'price cant be empty'})

    res.json(updated)
})

router.delete('/:spotId', requireAuth, async(req, res, next)=>{

    const oldSpot = await Spot.findByPk(req.params.spotId);

    if(!oldSpot){
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    await oldSpot.destroy();

    res.json({
        message: 'Successfully deleted'
    })
})
module.exports = router
