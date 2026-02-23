import cl from "./ToolTip.module.css"
import { useSelector } from "react-redux"

const ToolTip = () => {
    const { title, styles } = useSelector((state) => state.toolTip)

    return (
        <div className={cl.toolTip}>
            {(title || styles) && (
                <div className={cl.toolTipText} style={{ ...styles }}>
                    {title}
                </div>
            )}
        </div>
    )
}

export default ToolTip
