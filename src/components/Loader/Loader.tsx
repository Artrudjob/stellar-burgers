import React from 'react';
import styleLoader from './loader.module.css'
import LoaderOverlay from '../LoaderOverlay/LoaderOverlay';

function Loader() {
    return (
        <>
            <div className={styleLoader.loader__container}>
                <div className={styleLoader.loader__el}></div>
            </div>
            <LoaderOverlay />
        </>
    )
}

export default Loader;