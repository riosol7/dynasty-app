import React from "react";

const AppLayout = ({ children }) => {
    return (
        <div className="app">
            <div className="appContainer">
                {children}
            </div>
        </div>
    )
}

export default AppLayout