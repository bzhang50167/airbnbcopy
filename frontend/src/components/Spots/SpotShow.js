import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { GetAllReviewsFromSpotThunk } from "../../store/reviews";
import { getOneSpotThunk } from "../../store/spots";
import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import PostReviewModal from "../PostReviewModal";
import UpdateReviewModal from "../UpdateReviewModal";
import './spot.css'

const SpotShow = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    // const [spots, setSpots] = useState(null);
    const reviews = useSelector(state => Object.values(state.review.spot));
    const sessionUser = useSelector(state => state.session.user);
    const spots = useSelector(state => state.spot.singleSpot);
    console.log(spotId,'is it even grabbing this');
    console.log(spots,'whhy is this here?');
    console.log(reviews);
    // console.log(sessionUser, 'WHO IS USING THIS ATM');
    // console.log(sessionUser, 'this is who is using this ');
    // console.log(reviews, 'how do compare id with one another');
    useEffect(() => {
        dispatch(GetAllReviewsFromSpotThunk(spotId))
    }, [dispatch]);

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId));
    }, [dispatch]);
    console.log(reviews);
    // console.log(Object.values(spots));
    if (!spots) {
        return null;
    }
    if (Object.values(spots).length < 1){
        return null
    }
    // console.log(reviews, '========================');
    if (!reviews) {
        return <div>Loading...</div>;
    }
    if (Object.values(reviews).length < 0){
        return null
    }
    const handelNull = () => {
        return null
    }
    // const review = Object.values(reviews[0])
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
                            <span>{spots.numReviews === 1 ? 'review' : 'reviews'}</span>
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
                    <button>
                        <OpenModalMenuItem
                            itemText='Pose A review'
                            modalComponent={<PostReviewModal spotId={spotId} />}
                        />
                    </button>
                )}
            </div>
            {reviews.slice().reverse().map(r => {
                // {r.length ===1 ? handelNull : ''}
                // if(r.createdAt){
                //     return <div>...loading</div>
                // }
                const time = (r?.createdAt).split('T');
                return (
                    <div>
                        <div key={r.id}>
                            <div>{r?.User?.firstName}</div>
                            <div>{time}</div>
                            <div> {r?.review} </div>
                        </div>
                        <div>
                            {sessionUser && r.userId === sessionUser.id ? <button>
                                <OpenModalMenuItem
                                    itemText='Delete Review'
                                    modalComponent={<DeleteReviewModal reviewId={r.id} spotId={spotId} />}
                                />
                            </button> : ''}
                            {sessionUser && r.userId === sessionUser.id ? <button>
                                <OpenModalMenuItem
                                    itemText='Update Review'
                                    modalComponent={<UpdateReviewModal reviewId={r.id} spotName={spots.name} />}
                                />
                            </button> : ''}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SpotShow
