import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateBookingThunk } from "../../../store/bookings"
import { useModal } from "../../../context/Modal"

const UpdateBooking = ({ spotId, initialStartDate, initialEndDate }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [errors, setErrors] = useState('')
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const SpotId = +spotId
    useEffect(() => {
        if (initialStartDate && initialEndDate) {
            const formattedStartDate = formatDate(initialStartDate);
            const formattedEndDate = formatDate(initialEndDate);

            setStartDate(formattedStartDate);
            setEndDate(formattedEndDate);
        }
    }, [initialStartDate, initialEndDate]);

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const submitBooking = async (e) => {
        e.preventDefault()
        const info = {
            startDate: startDate,
            endDate: endDate
        }

        const errino = await dispatch(updateBookingThunk(SpotId, info))
        if(errino){
            setErrors(errino)
        } else {
            closeModal()
        }
    }
    return (
        <div>
            <form onSubmit={submitBooking}>
                <div>
                    {errors &&
                    <div className="errors">
                        {errors}
                     </div>
                    }
                    <label>
                        Start Date:
                        <input
                            type="date"
                            value={startDate || ""}
                            onChange={(e) => setStartDate(e.target.value)}
                            min={startDate}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        End Date:
                        <input
                            type="date"
                            value={endDate || ""}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate}
                        />
                    </label>
                </div>
                <button type="submit">Book</button>
            </form>
        </div>
    )
}

export default UpdateBooking
