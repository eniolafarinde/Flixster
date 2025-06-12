import React from "react";
import './Header.css'; // Don't forget to import the CSS file!

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <h1 className="logo">🎥 Flixster</h1>
                <p className="welcome-message">Welcome to an unlimited world of movies!</p>
            </div>
        </header>
    );
}

export default Header;