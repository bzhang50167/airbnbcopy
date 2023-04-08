import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAllSpotsThunk } from "../../store/spots"
import './spot.css'

const SpotList = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const spots = useSelector(state => Object.values(state.spot))

    // console.log(spots,'spots~~~~~~~~~~~');
    useEffect(() => {
        dispatch(getAllSpotsThunk(spots))
    }, [dispatch])


    return (
        <div className="mainPageSpots">
        {spots.map(spot => (
            <div key={spot.id} onClick={ e => history.push(`/spots/${spot.id}`)}  className='individualSpot'>
                <img className="spotImg" src={spot.previewImage}/>
                <div className="spotAddress">{spot.city}{' '}{spot.state}</div>
                <div className="spotAvgRating">{spot.avgRating}</div>
                <div className="spotPrice">{'$'}{spot.price}{" "}night</div>
            </div>
        ))}
    </div>
    )
}

export default SpotList
