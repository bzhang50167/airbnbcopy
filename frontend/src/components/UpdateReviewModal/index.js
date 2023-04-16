import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";

const UpdateReviewModal = ({ reviewId, spotName, rerender }) => {

    const reviews = useSelector(state => Object.values(state.review.spot));
    const review = reviews.find(review => review.id === reviewId)
    // console.log(review, 'hopefully one review');

    const [reviewText, setReviewText] = useState('');
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleStarClick = (star) => {
        setStars(star);
    };


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
        rerender()
        dispatch(UpdateReviewThunk(reviewId, info)).then(closeModal)
        // return
    }

    return (
        <div className="reviewModal">
            <h1 className="title">How was your stay at {spotName}</h1>
            <label>
                <textarea
                    rows={5}
                    cols={50}
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                />
            </label>
            <div>
            {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                                type="button"
                                key={index}
                                className={index <= (hover || stars) ? "starOn" : "starOff"}
                                onClick={() => handleStarClick(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(stars)}
                            >
                                <i className="fa fa-star"></i>
                            </button>
                        );
                    })}
                    <span>Stars</span>
                </div>
            <div>
                <button className="submitButton" onClick={submitButton}>Update Review</button>
            </div>
        </div>
    )
}

export default UpdateReviewModal
