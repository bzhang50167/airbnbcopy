import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getAllSpotsThunk } from "../../store/spots";

const SearchList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spotsinfo = useSelector(state => state.spot.allSpots);
    const location = useLocation();

    useEffect(() => {
        dispatch(getAllSpotsThunk());
        window.scrollTo(0, 0);
    }, [dispatch, location]);

    const filtered = location.state

    const filteredSpots = Object.values(spotsinfo).filter(spot => {
        const spotNameIncludesFiltered = spot.name.includes(filtered);
        const spotDescriptionIncludesFiltered = spot.description.includes(filtered);
        return spotNameIncludesFiltered || spotDescriptionIncludesFiltered;
    });

    const stingNew = <span className="newReview">New</span>;
    

    return (
        <div>
            <div className="mainPageSpots">
                {filteredSpots.map(spot => (
                    <div
                        key={spot.id}
                        onClick={e => history.push(`/spots/${spot.id}`)}
                        className="individualSpot"
                    >
                        <img className="spotImg" src={spot.previewImage} title={spot.name} />
                        <div className="spotAddress">
                            {spot.city} {", "} {spot.state}
                        </div>
                        <div className="spotAvgRating">
                            <i className="fa-sharp fa-solid fa-star"></i>{" "}
                            {spot.avgRating === 0 ? stingNew : spot.avgRating}
                        </div>
                        <div className="spotPrice">
                            <span className="spotPriceBold">{"$"}{spot.price}</span> night
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchList;
