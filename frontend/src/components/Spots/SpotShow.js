import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { GetAllReviewsFromSpotThunk } from "../../store/reviews";
import { getOneSpotThunk } from "../../store/spots";
import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import PostReviewModal from "../PostReviewModal";
import './spot.css'

const SpotShow = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [spots, setSpots] = useState(null);
    const reviews = useSelector(state => {
        // console.log(state,'this is tate');
        return Object.values(state.review.spot)
    })
    const sessionUser = useSelector(state => state.session.user);
    // console.log(sessionUser, 'WHO IS USING THIS ATM');
    // console.log(sessionUser, 'this is who is using this ');
    // console.log(reviews, 'how do compare id with one another');
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

    // console.log(reviews, '========================');
    if (!reviews) {
        return <div>Loading...</div>;
    }
    // const review = Object.values(reviews[0])
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
            {reviews.map(r => {
                // if(r.createdAt){
                //     return <div>...loading</div>
                // }
                // const time = (r?.createdAt).split('T');
                return (
                    <div>
                        <div key={r.id}>
                            <div>{r?.User.firstName}</div>
                            <div>{r?.createdAt}</div>
                            <div> {r?.review} </div>
                        </div>
                        <div>
                            {r.userId === sessionUser.id ? <button>
                                <OpenModalMenuItem
                                    itemText='Delete Review'
                                    modalComponent={<DeleteReviewModal reviewId={r.id} />}
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
