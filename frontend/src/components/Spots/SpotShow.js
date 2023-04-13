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
    // console.log(spotId,'is it even grabbing this');
    console.log(spots.ownerId,'whhy is this here?');
    // console.log(Object.values(spots),'what is this');
    // console.log(Object.values(sessionUser),'-=============');
    // console.log(reviews);
    console.log(sessionUser.id, 'WHO IS USING THIS ATM');
    // console.log(sessionUser, 'this is who is using this ');
    // console.log(reviews, 'how do compare id with one another');
    useEffect(() => {
        dispatch(GetAllReviewsFromSpotThunk(spotId))
    }, [dispatch]);

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId));
    }, [dispatch]);
    // console.log(reviews, 'reivew that is here');
    // console.log(Object.values(reviews).length, 'the length of something with nore reviews');
    if (!spots) {
        return null;
    }
    if (Object.values(spots).length < 1) {
        return null
    }
    // console.log(reviews, '========================');
    if (!reviews) {
        return <div>Loading...</div>;
    }
    if (Object.values(reviews).length < 0) {
        return null
    }
    const handelNull = () => {
        return null
    }
    const mainImg = spots.SpotImages.find(spot => spot.preview === true)
    const otherimg = spots.SpotImages.filter(spot => spot.preview === false)
    // console.log(otherimg);
    const numToMonth ={
        1: 'January',
        2: 'Febuary',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    }
    // const review = Object.values(reviews[0])
    // console.log(spots, 'what is this plase work plaese');

    // console.log(spots, '--------------------------');
    return (
        <div className="selectedSpot">
            <div className="singleSpotName">{spots?.name}</div>
            <div className="singleSpotPlaceDetails">{spots?.city},{spots?.state},{spots?.country}</div>
            <div class="showSpotImages">
                <div class="mainImageContainer">
                    <img class="mainSpotImage" src={mainImg.url} />
                </div>
                <div class="otherImagesContainer">
                    {otherimg.map(image => {
                        return <img class="fourImage" key={image.id} src={image.url} />
                    })}
                </div>
            </div>
            <div className="nameOfOwner">
                Hosted by {spots.Owner.firstName} {spots.Owner.lastName}
            </div>
            <div className="description">
                <div>
                    {spots.description}
                </div>
                {/* <span> */}
                <div className="priceReviewAndBook">
                    <div>{'$'}{spots.price} <span>night</span>
                        <span>
                            <i id="starNearReserve" className="fa-sharp fa-solid fa-star"></i>
                            <span>{spots.avgStarRating === 0 ? 'New' : spots.avgStarRating}</span>
                            {' '}
                            {spots.numReviews === 0 ? '' : <span> · {spots.numReviews} Reviews</span>}
                            <div>
                                <button className="reserveButton">RESERVE</button>
                            </div>
                        </span>
                    </div>
                </div>
                {/* </span> */}
            </div>
            <div className="allReviewsForSpot">
                <div className="actualReviewCss">
                    <i className="fa-sharp fa-solid fa-star"></i>
                    <span className="allreviewtitlefont">{spots.avgStarRating === 0 ? 'New' : spots.avgStarRating}</span>
                    {' '}
                    {spots.numReviews === 0 ? '' : <span> · {spots.numReviews} Reviews</span>}
                </div>
            </div>
            {sessionUser && sessionUser.id !== spots.ownerId ? (spots.numReviews === 0 ? 'Be The First to Post a Review' : '') : ''}
            <div>
                {sessionUser && sessionUser.id !== spots.ownerId ? (
                    <button className="updateDeleteCommentButton">
                        <OpenModalMenuItem
                            itemText='Pose A review'
                            modalComponent={<PostReviewModal spotId={spotId} />}
                        />
                    </button>
                ) : ''}
            </div>
            {reviews.slice().reverse().map(r => {
                // {r.length ===1 ? handelNull : ''}
                // if(r.createdAt){
                //     return <div>...loading</div>
                // }
                const year = (r?.createdAt).split('-')[0];
                const monthNum = (r?.createdAt).split('-')[1];
                const step1 = monthNum.split('0');
                const step2 = step1.join('');
                const month = numToMonth[step2];
                return (
                    <div>
                        <div key={r.id}>
                            <div className="firstNameReview">{r?.User?.firstName}</div>
                            <div className="dateReview">{month}{' '}{year}</div>
                            <div className="reviewReview"> {r?.review} </div>
                        </div>
                        <div>
                            {sessionUser && r.userId === sessionUser.id ? <button className="updateDeleteCommentButton">
                                <OpenModalMenuItem
                                    itemText='Delete Review'
                                    modalComponent={<DeleteReviewModal reviewId={r.id} spotId={spotId} />}
                                />
                            </button> : ''}
                            {sessionUser && r.userId === sessionUser.id ? <button className="updateDeleteCommentButton">
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
