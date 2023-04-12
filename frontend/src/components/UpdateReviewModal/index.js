import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { UpdateReviewThunk } from "../../store/reviews";

const UpdateReviewModal = ({ reviewId, spotName }) => {

    const reviews = useSelector(state => Object.values(state.review.spot));
    const review = reviews.find(review => review.id === reviewId)
    // console.log(review, 'hopefully one review');

    const [reviewText, setReviewText] = useState('');
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const dispatch = useDispatch()

    useEffect(() => {
        if(review !== null){
            if(!reviewText){
                setReviewText(review.review)
            }
        }
    },[])

    const submitButton = (e) => {
        e.preventDefault();

        const info = {
            review: reviewText,
            stars
        }

        // console.log(info,'what am i passing in');

        dispatch(UpdateReviewThunk(reviewId, info))
        // return
    }

    return (
        <div>
            <h1>How was your stay at {spotName}</h1>
            <label>
                <textarea
                    rows={5}
                    cols={50}
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                />
            </label>
            <div>
                    {[...Array(5)].map((stars, index) => {
                        index += 1;
                        return (
                            <button
                                type='button'
                                key={index}
                                className={index <= (hover || stars) ? 'starOn' : 'starOff'}
                                onClick={e => setStars(index)}
                                onMouseEnter={e => setHover(index)}
                                onMouseLeave={e => setHover(stars)}
                            >
                                <i className="fa-sharp fa-solid fa-star"></i>
                            </button>
                        )
                    })}
                </div>
            <div>
                <button onClick={submitButton}>Update Review</button>
            </div>
        </div>
    )
}

export default UpdateReviewModal
