import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { createBookingThunk } from "../../../store/bookings"
import { useModal } from "../../../context/Modal"
import { useHistory } from "react-router-dom"

const CreateBooking = (spotId) => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [today, setToday] = useState('')
    const [errors, setError] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const SpotId = +spotId.spotId
    useEffect(() => {
        const now = new Date().toISOString().split('T')[0]
        setToday(now)
    })
    const submitBooking = async (e) => {
        e.preventDefault()
        const info = {
            startDate: startDate,
            endDate: endDate
        }

        const errorino = await dispatch(createBookingThunk(SpotId, info))
        if(errorino){
            setError(errorino)
        } else {
            history.push('/allbookings')
            closeModal()
        }
    }
    return (
        <div>
            <form onSubmit={submitBooking}>
                {errors &&
                <div className="errors">
                    {errors}
                </div>
                }
                <div>
                    <label>
                        Start Date:
                        <input
                            type="date"
                            onChange={e => setStartDate(e.target.value)}
                            min={today}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        End Date:
                        <input
                            type="date"
                            onChange={e => setEndDate(e.target.value)}
                            min={today}
                        />
                    </label>
                </div>
                <button>
                    Book
                </button>
            </form>
        </div>
    )
}

export default CreateBooking
