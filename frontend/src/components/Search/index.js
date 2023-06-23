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

    const filtered = location.state.toLowerCase();

    const filteredSpots = Object.values(spotsinfo).filter(spot => {
        const spotNameIncludesFiltered = spot.name.toLowerCase().includes(filtered);
        const spotDescriptionIncludesFiltered = spot.description.toLowerCase().includes(filtered);
        const spotCity = spot.city.toLowerCase().includes(filtered);
        const spotCountry = spot.country.toLowerCase().includes(filtered);
        const spotState = spot.state.toLowerCase().includes(filtered);
        return spotState || spotNameIncludesFiltered || spotDescriptionIncludesFiltered || spotCity || spotCountry;
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
