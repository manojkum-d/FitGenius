import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchContainer = ({ searchForRecipes, hideLoader }) => {
    const [input, setInput] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    const handleSearchButton = () => {
        if(input === '') return
        
        searchForRecipes(input);
        setInput('');
        setShowLoader(true);
    }

    // hides loader when recipes are found
    useEffect(() => {
        setShowLoader(false);
    }, [hideLoader])

    return (
        <section className="search-container">
            <h1>Find healthy recipes that contributes to your daily life!</h1>

            <div className="search h-14">
                <input
                    type="text"
                    placeholder="Search for a recipe"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <div className="search-button w-24" onClick={handleSearchButton}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                    </svg>
                    {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                </div>
            </div>

            {showLoader ? <Loader /> : null}
            <div className="overlay"></div>
        </section>
    )
}

export default SearchContainer;