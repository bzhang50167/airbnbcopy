import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAllBookingThunk } from "../../../store/bookings"
import './index.css'
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem"
import UpdateBooking from "../UpdateBookings"
import DeleteBooking from "../DeleteBookingModal"

const AllBookings = () => {
    const bookingsObj = useSelector(state => state.booking.allBookings)
    const dispatch = useDispatch()
    const history = useHistory()
    const bookings = Object.values(bookingsObj)
    useEffect(() => {
        dispatch(getAllBookingThunk())
    }, [dispatch, bookings.length])

    if(bookings.length === 0){
        return null
    }

    return (
        <div className="entirepage">
            {bookings.map(booking => {
                return (
                    <div className="outerdiv">
                        <div className="imagediv" onClick={e => history.push(`/spots/${booking.Spot.id}`)}>
                            <img src={booking.Spot.previewImage} />
                        </div>
                        <div className='innerdiv1'>
                            <div className="name">
                                {booking.Spot.name}
                            </div>
                            <div className="innerdiv2">
                                <div className="bookingdates">
                                    {booking?.startDate.split('T')[0]} - {booking?.endDate.split('T')[0]}
                                </div>
                                <div>
                                    <div className="modal-buttons">
                                        <button className={'deleteButtonSpot'}>
                                            <OpenModalMenuItem
                                                itemText='Update'
                                                modalComponent={<UpdateBooking spotId={booking.id} initialStartDate={booking.startDate} initialEndDate={booking.endDate} />}
                                            />
                                        </button>
                                        <button className={'deleteButtonSpot'}>
                                            <OpenModalMenuItem
                                                itemText='Cancel'
                                                modalComponent={<DeleteBooking id={booking.id} />}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AllBookings
