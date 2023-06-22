import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getAllReviewsFromSpotAction, GetAllReviewsFromSpotThunk } from "../../store/reviews";
import { getAllSpotsThunk, getOneSpotThunk } from "../../store/spots";
import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import PostReviewModal from "../PostReviewModal";
import ReserveButtonModal from "../ReverseButtonModel";
import UpdateReviewModal from "../UpdateReviewModal";
import './spot.css'
import CreateBooking from "../Bookings/CreateBookingModal";
import Loadingpage from "../LoadingPage";

const SpotShow = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    // const [spots, setSpots] = useState(null);
    const reviewObj = useSelector(state => state.review.spot);
    const reviews = Object.values(reviewObj)
    const sessionUser = useSelector(state => state.session.user);
    const spots = useSelector(state => state.spot.singleSpot);

    useEffect(() => {
        dispatch(GetAllReviewsFromSpotThunk(spotId))
        dispatch(getOneSpotThunk(spotId));
    }, [dispatch, reviews.length]);


    if (!Object.values(spots).length) {
        return null;
    }
    if (Object.values(spots).length < 1) {
        return null
    }
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
    const numToMonth = {
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

    const userReviewExists = () => {

        const isHere = reviews.find(review => review.userId === sessionUser.id)

        if(!isHere) return false
        if(isHere.userId === sessionUser.id){
            return true
        } else {
            return false
        }
    }

    const rerenderingPage = async() => {
        await dispatch(GetAllReviewsFromSpotThunk(spotId))
       return await dispatch(getOneSpotThunk(spotId))
    }

    if(!spots || spots.id !== parseInt(spotId)){
        return <Loadingpage />
    }

    return (
        <div className="selectedSpot">
            <div className="singleSpotName">{spots?.name}</div>
            <div className="singleSpotPlaceDetails">{spots?.city}, {' '}{spots?.state}, {' '}{spots?.country}</div>
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
                <div className="wordsindes">
                    {spots.description}
                </div>
                {/* <span> */}
                <div className="priceReviewAndBook">
                    <div className="priceinspot">{'$'}{spots.price} night
                        <span>
                            <i id="starNearReserve" className="fa-sharp fa-solid fa-star"></i>
                            <span>{spots.avgStarRating === 0 ? 'New' : spots.avgStarRating}</span>
                            {' '}
                            {spots.numReviews === 0 ? '' : spots.numReviews === 1 ?  <span> · {spots.numReviews} Review </span> :  <span> · {spots.numReviews} Reviews</span>}
                            <div className="buttondivbook">
                                <button className="reserveButton">
                                    <OpenModalMenuItem
                                        itemText='Book Now'
                                        className='button-show'
                                        modalComponent={<CreateBooking spotId={spotId} />}
                                    />
                                </button>
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
                    {spots.numReviews === 0 ? '' : spots.numReviews === 1 ?  <span> · {spots.numReviews} Review </span> :  <span> · {spots.numReviews} Reviews</span>}
                </div>
            </div>
            <div>
                {sessionUser && (sessionUser.id !== spots.ownerId) ? (userReviewExists() ? '' : //group them up for readability and to avoid bugs(predicability)
                    <button onClick={rerenderingPage} className="updateDeleteCommentButton">
                        <OpenModalMenuItem
                            itemText='Post A Review'
                            modalComponent={<PostReviewModal spotId={spotId} rerender={rerenderingPage} />}
                        />
                    </button>
                ) : ''}
            </div>
            {sessionUser && (sessionUser.id !== spots.ownerId) ? (spots.numReviews === 0 ? <h4>Be the first to post a review!</h4> : null) : null}
            {reviews.reverse().map(r => {
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
                            {sessionUser && (r.userId === sessionUser.id) ? <button onClick={rerenderingPage} className="updateDeleteCommentButton">
                                <OpenModalMenuItem
                                    itemText='Delete Review'
                                    modalComponent={<DeleteReviewModal rerender={rerenderingPage} reviewId={r.id} spotId={spotId} />}
                                />
                            </button> : ''}
                            {sessionUser && (r.userId === sessionUser.id) ? <button onClick={rerenderingPage} className="updateDeleteCommentButton">
                                <OpenModalMenuItem
                                    itemText='Update Review'
                                    modalComponent={<UpdateReviewModal rerender={rerenderingPage} reviewId={r.id} spotName={spots.name} />}
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
