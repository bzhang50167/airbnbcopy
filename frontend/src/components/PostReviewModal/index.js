import { useEffect, useState } from "react"
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { CreateAReviewThunk } from "../../store/reviews";
import './review.css'

const PostReviewModal = ({ spotId, rerender }) => {

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleStarClick = (star) => {
        setStars(star);
    };

    useEffect(() => {
        const errorObj = {}
        if (review.length < 10) errorObj.review = 'wrtie more';
        setErrors(errorObj)
    }, [review])

    const handleSubmit = (e) => {
        e.preventDefault()
        const fullReview = {
            review,
            stars
        }
        rerender()
        return dispatch(CreateAReviewThunk(spotId, fullReview)).then(closeModal)
    }

    return (
        <div className="reviewModal">
            <form onSubmit={handleSubmit}>
                <h2>How was your stay?</h2>
                <textarea
                    rows={5}
                    cols={50}
                    type='text'
                    value={review}
                    placeholder={'Leave your review here...'}
                    onChange={e => setReview(e.target.value)}
                />
                {/* {errors.review && <p className="errors">{errors.review}</p>} */}
                <div className="rating">
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
                <button className="submitButton" disabled={errors.review} type="submit">Submit Your Review</button>
            </form>
        </div>
    )

}

export default PostReviewModal
