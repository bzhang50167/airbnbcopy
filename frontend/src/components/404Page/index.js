import image from '../../images/404airbnbimage.jpeg'
import './index.css'

const ErrorPage = () => {
    return (
        <div>
            <div className='errorpage'>
                <div className='errorpage'>
                    <h1 className='errorpage'>Page Not Found</h1>
                </div>
                <div className='errorpage'>
                    <img
                    className='errorpage'
                        src={image}
                    />
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
