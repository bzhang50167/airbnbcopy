import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { DeleteReviewThunk } from "../../store/reviews";
import './index.css'


const DeleteReviewModal = ({reviewId, spotId, rerender}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const history = useHistory()

    const yesButton = (e) => {
        e.preventDefault()
        rerender()
        dispatch(DeleteReviewThunk(reviewId)).then(closeModal)
        // return history.push(`/spots/${spotId}`)
    }

    const noButton = (e) => {
        e.preventDefault()
        rerender()
        return closeModal()
    }
    return(
        <div className="thing">
            <h1>Confirm Delete</h1>
            <h3>Are you sure you want to delete this review</h3>
            <button className="redButton" onClick={yesButton}>Yes(Delete Review)</button>
            <button className="grayButton" onClick={noButton}>No(Keep Review)</button>
        </div>
    )
}

export default DeleteReviewModal
