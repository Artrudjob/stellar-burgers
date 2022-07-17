import React, {FunctionComponent} from "react";
import styleModalOverlay from './modalOverlay.module.css'

interface IProps {
    onClick: () => void;
}

const ModalOverlay: FunctionComponent<IProps> = ({ onClick }) => {
    return (
        <div className={styleModalOverlay.modalOverlay} onClick={onClick}></div>
    )
}

export default ModalOverlay;