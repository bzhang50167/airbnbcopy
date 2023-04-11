import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { GetAllReviewsFromSpotThunk } from "../../store/reviews";
import { getOneSpotThunk } from "../../store/spots";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import PostReviewModal from "../PostReviewModal";
import './spot.css'

const SpotShow = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [spots, setSpots] = useState(null);
    const reviews = useSelector(state => Object.values(state.review))
    const sessionUser = useSelector(state => state.session.user);
    // console.log(sessionUser, 'WHO IS USING THIS ATM');
    // console.log(reviews, 'these are the reviews');
    const review = Object.values(reviews[0])
    // console.log(review, 'for keying in');
    useEffect(() => {
        dispatch(GetAllReviewsFromSpotThunk(spotId))
    }, [dispatch])

    useEffect(() => {
        const fetchSpot = async () => {
            const spotData = await dispatch(getOneSpotThunk(spotId));
            setSpots(spotData);
        };
        fetchSpot();
    }, [dispatch, spotId]);

    if (!spots) {
        return <div>Loading...</div>;
    }
    // console.log(spots, 'what is this plase work plaese');

    // console.log(spots, '--------------------------');
    return (
        <div className="selectedSpot">
            <div className="singleSpotName">{spots?.name}</div>
            <div className="singleSpotPlaceDetails">{spots?.city},{spots?.state},{spots?.country}</div>
            <div className="spotImageArea">
                {spots?.SpotImages.map(image => {
                    return <img key={image.id} src={image.url} />
                })}
            </div>
            <div>Hosted by {spots.Owner.firstName} {spots.Owner.lastName} </div>
            <div className="description">
                <div>
                    {spots.description}
                </div>
                {/* <span> */}
                <div className="priceReviewAndBook">
                    <div>{'$'}{spots.price} <span>night</span>
                        <span>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <span>{spots.avgStarRating === 0 ? 'New' : spots.avgStarRating}</span>
                            {' '}
                            ·
                            {' '}
                            <span>{spots.numReviews} reviews</span>
                            <div>
                                <button className="reserveButton">RESERVE</button>
                            </div>
                        </span>
                    </div>
                </div>
                {/* </span> */}
            </div>
            <div className="allReviewsForSpot">
                <div>
                    <i className="fa-sharp fa-solid fa-star"></i>
                    <span className="allreviewtitlefont">{spots.avgStarRating === 0 ? 'New' : spots.avgStarRating}</span>
                    {' '}
                    ·
                    {' '}
                    <span className="allreviewtitlefont">{spots.numReviews} reviews</span>
                </div>
            </div>
            <div>
                {sessionUser && (
                    <OpenModalMenuItem
                        itemText='Pose A review'
                        modalComponent={<PostReviewModal spotId={spotId} />}
                    />
                )}
            </div>
            {review.map(r => {
                const time = (r.createdAt).split('T')
                return (
                    <div key={r.id}>
                        <div>{r?.User.firstName}</div>
                        <div>{time[0]}</div>
                        <div> {r?.review} </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SpotShow
