import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getAllSpotsThunk } from "../../store/spots";

const SearchList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [page, setPage] = useState(1);
    const spotsinfo = useSelector(state => state.spot.allSpots);
    const pagination = useSelector(state => state.spot.maxPage);
    const location = useLocation();

    useEffect(() => {
        const info = {
            page
        };
        dispatch(getAllSpotsThunk(info));
        window.scrollTo(0, 0);
    }, [dispatch, page, location]);

    const filtered = location.state

    console.log(typeof(filtered),'<=== filter being passed in');

    const filteredSpots = Object.values(spotsinfo).filter(spot => {
        return spot.name.includes(filtered);
    });

    const stingNew = <span className="newReview">New</span>;

    const handlePrevPage = () => {
        setPage(page => page - 1);
    };

    const handleNextPage = () => {
        setPage(page => page + 1);
    };

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
            <div className="pagination">
                <button disabled={page === 1} onClick={handlePrevPage}>
                    Previous
                </button>
                <span>{`Page ${page} of ${pagination}`}</span>
                <button disabled={page === pagination} onClick={handleNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default SearchList;
