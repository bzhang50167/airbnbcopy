import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetUserReviewThunk } from "../../store/reviews"
import './index.css'

const ShowAllReview = () => {
    const reviews = useSelector(state => state.review.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetUserReviewThunk())
    }, [])
    const userReview = Object.values(reviews)
    return (
        <div>
            {userReview.map(review => {
                return (
                    <div className="mainBox">
                        <div className="innerBox1">
                            <div>
                                {review.User.firstName}
                            </div>
                            <div>
                                {review.createdAt.split('T')[0]}
                            </div>
                        </div>
                        <div className="innerBox2">
                            <div>
                                {review.stars}
                            </div>
                            <div>
                                {review.review}
                            </div>
                        </div>
                        <div className="imageBox">
                            {review.ReviewImages.map(image => {
                                return(
                                    <div>
                                        {image.url}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ShowAllReview
