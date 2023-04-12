import { useEffect, useState } from "react"
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { createImageThunk, createNotPreviewImageThunk, createSpotThunk } from "../../store/spots";
import './spot.css'

const CreateNewSpot = () => {
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('')
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');
    const [url2, setUrl2] = useState('');
    const [url3, setUrl3] = useState('');
    const [url4, setUrl4] = useState('');
    const [url5, setUrl5] = useState('');
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const errorObj = {}
        if (!country) errorObj.country = 'Country is required';
        if (!address) errorObj.address = 'Address is required';
        if (!city) errorObj.city = 'City is required';
        if (!state) errorObj.state = 'State is required';
        if (!lat) errorObj.lat = 'Latitude is required';
        if (!lng) errorObj.lng = 'Longitude is required';
        if (!description) errorObj.description = 'Description needs a minimum of 30 characters';
        if (!name) errorObj.name = 'Name is required';
        if (!price) errorObj.price = 'Price is required';
        // if (!url) errorObj.url = 'Preview image is required';
        setErrors(errorObj)
    }, [country,address,city,state,lat,lng,description,name,price])

    const errorClassName = 'errors' + (showErrors ? '' : 'hidden')

    const OnSubmit = async (e) => {
        e.preventDefault();

        if(Object.values(errors).length > 0){
            setShowErrors(true)
            return
        }

        const spotInfo = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            url
        }

        const newSpot = await dispatch(createSpotThunk(spotInfo))

        console.log(newSpot, '<============== newSpot ');


        const spotId = newSpot.id

        await dispatch(createImageThunk(spotId, url))
        dispatch(createNotPreviewImageThunk(url2))
        dispatch(createNotPreviewImageThunk(url3))
        dispatch(createNotPreviewImageThunk(url4))
        dispatch(createNotPreviewImageThunk(url5))

        return history.push('/')
    }

    return (
        <div className="createSpotFrom">
            <form onSubmit={OnSubmit}>
                <label>
                    <div>
                        Country
                        {' '}
                        {errors.country && <span className={errorClassName}>{errors.country}</span>}
                    </div>
                    <input
                        type={'text'}
                        placeholder={'Country'}
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                </label>
                <label>
                    <div>
                        Street Address
                        {' '}
                         {errors.address && <span className={errorClassName}>{errors.address}</span>}
                    </div>
                    <input
                        type={'text'}
                        placeholder={'Address'}
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </label>
                <label>
                    <div>
                        City
                        {' '}
                    {errors.city && <span className={errorClassName}>{errors.city}</span>}
                    </div>
                    <input
                        type={'text'}
                        placeholder={'City'}
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </label>
                <label>
                    <div>
                        State
                        {' '}
                    {errors.state && <span className={errorClassName}>{errors.state}</span>}
                    </div>
                    <input
                        type={'text'}
                        placeholder={'STATE'}
                        value={state}
                        onChange={e => setState(e.target.value)}
                    />
                </label>
                <label>
                    <div>
                        Latitude
                        {' '}
                    {errors.lat && <span className={errorClassName}>{errors.lat}</span>}
                    </div>
                    <input
                        type={'text'}
                        placeholder={'Latitude'}
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                    />
                </label>
                <label>
                    <div>
                        Longitude
                        {' '}
                    {errors.lng && <span className={errorClassName}>{errors.lng}</span>}
                    </div>
                    <input
                        type={'text'}
                        placeholder={'Longitude'}
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                    />
                </label>
                <div className="disciptionOfSpot">
                    Describe your place to guest
                </div>
                <label>
                    <div>
                        Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.
                    </div>
                    <textarea
                        type={'textbox'}
                        rows={5}
                        cols={50}
                        placeholder={'Please write at least 30 characters'}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </label>
                {errors.description && <span className={errorClassName}>{errors.description}</span>}
                <div className="disciptionOfSpot" >
                    Create a title for your spot
                </div>
                <label>
                    <div>
                        Catch quests' attention whith a spot title that highlights what makes your place special.
                    </div>
                    <input
                        type={'text'}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={'Name of your spot'}
                    />
                </label>
                {errors.name && <span className={errorClassName}>{errors.name}</span>}
                <div className="disciptionOfSpot">
                    Set a base price for your spot
                </div>
                <label>
                    <div>
                        Competitive pricing can help your listing stand out and rank higher in search results.
                    </div>
                    <input
                        type={'text'}
                        value={price}
                        placeholder={'Price per night (USD)'}
                        onChange={e => setPrice(e.target.value)}
                    />
                </label>
                {errors.price && <span className={errorClassName}>{errors.price}</span>}
                <div className="disciptionOfSpot">
                    Liven up your spot with photos
                </div>
                <label>
                    <div>
                        Submit a link to at least one photo to publish your spot.
                    </div>
                    <input
                        type={'text'}
                        value={url}
                        placeholder={'Preview Image URL'}
                        onChange={e => setUrl(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type={'text'}
                        value={url2}
                        placeholder={'Image URL'}
                        onChange={e => setUrl2(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type={'text'}
                        value={url3}
                        placeholder={'Image URL'}
                        onChange={e => setUrl3(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type={'text'}
                        value={url4}
                        placeholder={'Image URL'}
                        onChange={e => setUrl4(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type={'text'}
                        value={url5}
                        placeholder={'Image URL'}
                        onChange={e => setUrl5(e.target.value)}
                    />
                </label>
                {errors.url && <span className={errorClassName}>{errors.url}</span>}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateNewSpot
