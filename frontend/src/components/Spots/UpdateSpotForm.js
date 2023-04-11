import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createImageThunk, createSpotThunk, updateSpotThunk } from "../../store/spots";
import './spot.css'

const UpdateSpotForm = () =>{
    const { spotId } = useParams()
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
    const dispatch = useDispatch();
    const history = useHistory();


    const errorClassName = 'errors' + (showErrors ? '' : 'hidden')

    const OnSubmit = async (e) => {
        e.preventDefault();


        const spotInfo = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }

        await dispatch(updateSpotThunk(spotId,spotInfo))

        await dispatch(createImageThunk(spotId, url))

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
                    <input
                        type={'textbox'}
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
                {errors.url && <span className={errorClassName}>{errors.url}</span>}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UpdateSpotForm
