import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteSpotThunk, getUserSpotsThunk } from "../../store/spots"
import './spot.css'

const ManageSpot = () => {

    const dispatch = useDispatch();
    const history = useHistory()
    const [userSpot, setUserSpot] = useState([])
    const spotObj = useSelector(state => (state.spot.allSpots.Spots));

    useEffect(() => {
        dispatch(getUserSpotsThunk(spotObj))
    }, [dispatch])

    if (!spotObj) {
        return <div>...Loading</div>
    }

    const spots = Object.values(spotObj)

    console.log(typeof spots, 'is this an array or object');
    console.log(spots, 'items in the spot');
    return (
        <div>
            <div>
                <h2>Manage Your Spots</h2>
            </div>
            <div className="managePageSpots">
                {spots.map(spot => {
                    return (
                        <div>
                            <div key={spot.id} onClick={e => history.push(`/spots/${spot.id}`)} className='individualSpot'>
                                <img className="spotImg" src={spot.previewImage} />
                                <div className="spotAddress">{spot.city}{' , '}{spot.state}</div>
                                <div className="spotAvgRating">
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                    {' '}
                                    {(spot.avgRating === 0 ? 'New' : spot.avgRating)}
                                </div>
                                <div className="spotPrice"><span className="spotPriceBold">{'$'}{spot.price}</span>{" "}night</div>
                            </div>
                            <div className="managePageButtonDiv">
                                <button onClick={e => history.push(`/${spot.id}/update`)} className="updateButton">Update</button>
                                <button onClick={e => dispatch(deleteSpotThunk(spot.id))} className="deleteButton">Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ManageSpot