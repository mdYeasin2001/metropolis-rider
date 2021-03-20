import React from 'react';
import SearchForm from '../SearchForm/SearchForm';

const Destination = () => {

    return (
        <div className="container">
            <div className="row py-5">
                <SearchForm/>
                <div className="col-md-8" style={{height: '200px'}}>
                    <img className="img-responsive w-100" src="../../../../attachment/urban-riders-main/images/Map.png" alt=""/>
                    <h1 className="display-1">This is Map Area</h1>
                </div>
            </div>
        </div>
    );
};

export default Destination;