import React from 'react';
import { Link } from 'react-router-dom';
const SideBar = () => {
    return (
        <ul>
            <li>
                <Link to="movies"></Link>
            </li>
            <li>
                <Link to="game"></Link>
            </li>
        </ul>
    );
}

export default SideBar;