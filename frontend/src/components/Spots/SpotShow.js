import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getOneSpotThunk } from "../../store/spots";
import './spot.css'

const SpotShow = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch()
    console.log(spotId);
    const spots = useSelector(state => (state.spot.allSpots))[spotId]

    useEffect(() => {

    }, [])

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))
    }, [dispatch])


    // console.log(spots, '--------------------------');
    return (
        <div className="selectedSpot">
            <div className="singleSpotName">{spots?.name}</div>
            <div className="singleSpotPlaceDetails">{spots.city},{spots.state},{spots.country}</div>
            <div>
                <img className="singleSpotMainImg" src={spots.previewImage} />
            </div>
            <div>Hosted by</div>
        </div>
    )
}

export default SpotShow
