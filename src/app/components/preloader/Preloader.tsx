import React from 'react'

const Preloader = () => {
    return (
        <div id="loading">
            <div id="loading-center">
                <div id="loading-center-absolute">
                    <div className="loading-content">
                        <img
                            className="loading-logo-text"
                            src="/img/logo/logo-text-2.png"
                            alt=""
                        />
                        <div className="loading-stroke">
                            <img
                                className="loading-logo-icon"
                                src="/img/logo/logo-icon.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preloader