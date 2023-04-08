import { useState } from "react"
import { useDispatch } from "react-redux";
import { createSpotThunk } from "../../store/spots";
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
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
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

        console.log(spotInfo);

        const newSpot = await dispatch(createSpotThunk(spotInfo))

        console.log(newSpot,'--------------------');

    }

    return (
        <div className="createSpotFrom">
            <form onSubmit={onSubmit}>
                <label>
                    <div>
                        Country
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
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateNewSpot
