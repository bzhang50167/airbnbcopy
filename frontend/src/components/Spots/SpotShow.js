import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getOneSpotThunk } from "../../store/spots";
import './spot.css'

const SpotShow = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch()
    const spots = useSelector(state => Object.values(state.spot.allSpots))[spotId - 1]
    useEffect(() => {

    }, [])

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))
    }, [dispatch])


    // console.log(spots, '--------------------------');
    return(
        <div className="selectedSpot">
            <div>{spots?.name}</div>
            <img className="specialSpotImg" src={spots.previewImage}/>
        </div>
    )
}

export default SpotShow
