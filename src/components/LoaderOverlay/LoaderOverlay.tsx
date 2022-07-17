import React from 'react';
import styleLoaderOverlay from './loaderOverlay.module.css'

function LoaderOverlay() {
    return (
        <div className={styleLoaderOverlay.loaderOverlay}></div>
    )
}

export default LoaderOverlay;