import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";

const DeleteSpotModal = ({spotId}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    const yesButton = (e) => {
        // e.preventDefault()
        dispatch(deleteSpotThunk(spotId)).then(closeModal)
        return 
    }

    const noButton = (e) => {
        e.preventDefault()
        return closeModal()
    }

    return(
        <div>
            <h1>Confirm Delete</h1>
            <h3>Are you sure you want to remove this spot from the listing?</h3>
            <button onClick={yesButton} >Yes (Delete Spot)</button>
            <button onClick={noButton} >No (Keep Spot)</button>
        </div>
    )
}

export default DeleteSpotModal
