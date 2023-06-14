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
    console.log(bookings.length, 'booking length')
    useEffect(() => {
        dispatch(getAllBookingThunk())
    }, [dispatch, bookings.length])
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
                                <div>
                                    {booking.startDate.split('T')[0]} - {booking.endDate.split('T')[0]}
                                </div>
                                <div>
                                    <div className="modal-buttons">

                                        <OpenModalMenuItem
                                            itemText='Update'
                                            modalComponent={<UpdateBooking spotId={booking.id} initialStartDate={booking.startDate} initialEndDate={booking.endDate} />}
                                        />
                                        <OpenModalMenuItem
                                            itemText='Delete'
                                            modalComponent={<DeleteBooking id={booking.id} />}
                                        />
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
