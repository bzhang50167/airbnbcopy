import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createBookingThunk } from "../../../store/bookings"
import { useModal } from "../../../context/Modal"
import { useHistory } from "react-router-dom"
import { getOneSpotAction } from "../../../store/spots"
import './index.css'

const CreateBooking = (spotId) => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [today, setToday] = useState('')
    const [errors, setError] = useState([])
    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    // const spot = useSelector(state => state.spot.singleSpot)
    const SpotId = +spotId.spotId
    useEffect(() => {
        const now = new Date().toISOString().split('T')[0]
        // dispatch(getOneSpotAction(SpotId))
        setToday(now)
    }, [dispatch])
    const submitBooking = async (e) => {
        e.preventDefault()
        setError([])
        if(startDate === null || endDate === null){
            return setError('start date and end date can not be empty')
        }
        const info = {
            startDate: startDate,
            endDate: endDate
        }

        const errorino = await dispatch(createBookingThunk(SpotId, info))
        if (errorino) {
            setError(errorino)
        } if(errors.length === 0) {
            history.push('/allbookings')
            closeModal()
        }
    }
    return (
        <div>
            <div className="createbookings">
                <div>
                    Book your stay!
                </div>
                <form onSubmit={submitBooking}>
                    {errors &&
                        <div className="errors">
                            {errors}
                        </div>
                    }
                    <div className="dates">
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
                    </div>
                    <div className="centerbutton">
                        <div className="centerbutton">
                        <button className={'deleteButtonSpot'}>
                            Book Now
                        </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBooking
