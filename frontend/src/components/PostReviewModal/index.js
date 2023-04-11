import { useState } from "react"
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { CreateAReviewThunk } from "../../store/reviews";

const PostReviewModal = ({ spotId }) => {

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault()
        const fullReview = {
            review,
            stars
        }
        return dispatch(CreateAReviewThunk(spotId, fullReview)).then(closeModal)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>How was your stay</h2>
                <input
                    type='text'
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
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
                <button type="submit">Submit Your Review</button>
            </form>
        </div>
    )

}

export default PostReviewModal
