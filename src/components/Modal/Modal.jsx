import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styleModal from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation} from "react-router-dom";

const modalsContainer = document.querySelector('#modals');

function Modal({ closeModals, onOverlayClick, title, children }) {
    const location = useLocation();

    React.useEffect(() => {
        function handleEscKeydown(e) {
            if (e.key === 'Escape') {
                closeModals()
            }
        }

        document.addEventListener('keydown', handleEscKeydown)

        return () => {
            document.removeEventListener('keydown', handleEscKeydown)
        }
    }, [closeModals])

    return ReactDOM.createPortal(
        <div className={styleModal.popup__container}>
            <div className={styleModal.popup} >
                {(location.state.background?.pathname !== '/') ?
                    <div className={styleModal.popup__boxBtn} style={{top: 40}}>
                        <CloseIcon type={"primary"} onClick={onOverlayClick}/>
                    </div>
                    :
                    <div className={styleModal.popup__boxBtn}>
                        <CloseIcon type={"primary"} onClick={onOverlayClick}/>
                    </div>
                }
                {(location.state.background?.pathname !== '/') ?
                    <h3 className={`${styleModal.popup__titleOrder} text text_type_digits-default mt-10`}>{title}</h3>
                    :
                    <h3 className={`${styleModal.popup__title} text text_type_main-large mt-10`}>{title}</h3>}
                {children}
            </div>
            <ModalOverlay onClick={onOverlayClick}></ModalOverlay>
        </div>,
        modalsContainer
    )
}

Modal.propTypes = {
    closeModals: PropTypes.func.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.object.isRequired
}

export default Modal;