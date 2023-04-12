import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { DeleteReviewThunk } from "../../store/reviews";

const DeleteReviewModal = ({reviewId}) => {

    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const yesButton = (e) => {
        e.preventDefault()
        return dispatch(DeleteReviewThunk(reviewId)).then(closeModal)
    }

    const noButton = (e) => {
        e.preventDefault()
        return closeModal()
    }
    return(
        <div>
            <h1>Confirm Delete</h1>
            <h3>Are you sure you want to delete this review</h3>
            <button onClick={yesButton}>Yes(Delete Review)</button>
            <button onClick={noButton}>No(Keep Review)</button>
        </div>
    )
}

export default DeleteReviewModal
