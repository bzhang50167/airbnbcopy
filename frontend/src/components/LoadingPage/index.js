
import { DotLoader } from 'react-spinners'
import './index.css'

const Loadingpage = () => {
    return(
        <div className="loading-page">
            <DotLoader
            loading={true}
            color='#36d7b7'
            size={150}
            />
        </div>
    )
}

export default Loadingpage
