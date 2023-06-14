import { useDispatch } from "react-redux"
import { useModal } from "../../../context/Modal"
import { deleteBookingThunk } from "../../../store/bookings"
import { useState } from "react"

const DeleteBooking = (id) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [error, setErrors] = useState('')
    const noButton = (e) => {
        e.preventDefault()
        closeModal()
    }
    const yesButton = async(e) => {
        e.preventDefault()
        const errors = await dispatch(deleteBookingThunk(+id.id))
        if(errors){
            setErrors(errors)
        } else {
            closeModal()
        }
    }
    return(
        <div>
            <h2>Are You Sure You Want To Cancel Reservation</h2>
            {error &&
            <div className="errors">
                {error}
            </div>
            }
            <div>
            <button onClick={yesButton}>Yes</button>
            <button onClick={noButton}>No</button>
            </div>
        </div>
    )
}

export default DeleteBooking
