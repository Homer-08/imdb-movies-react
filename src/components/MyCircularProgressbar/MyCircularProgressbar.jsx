import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import cl from "./MyCircularProgressbar.module.css"

const MyCircularProgressbar = (props) => {
    const {value, text} = props
    
    return (
        <div className={cl.circularProgressbar}>
            <CircularProgressbar value={value} text={text} />
        </div>
    )
}

export default MyCircularProgressbar
