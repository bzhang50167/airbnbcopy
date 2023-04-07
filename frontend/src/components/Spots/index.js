import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSpotsThunk } from "../../store/spots"

const SpotList = () => {
    const dispatch = useDispatch()

    const spots = useSelector(state => Object.values(state.spot))

    // console.log(spots,'spots~~~~~~~~~~~');
    useEffect(() => {
        dispatch(getAllSpotsThunk(spots))
    }, [dispatch])


    return (
        <div className="mainPageSpots">
        {spots.map(spot => (
            <div key={spot.id}>
                <img className="spotImg" src={spot.previewImage}/>
                <div className="spotAddress">{spot.address}</div>
                <div className="spotAvgRating">{spot.avgRating}</div>
                <div className="spotPrice">{'$'}{spot.price}{" "}night</div>
            </div>
        ))}
    </div>
    )
}

export default SpotList
