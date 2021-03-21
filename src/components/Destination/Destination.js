import React from 'react';
import Map from '../Map/Map';
import SearchForm from '../SearchForm/SearchForm';

const Destination = () => {

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-lg-2 g-5">
                <div className="col col-lg-4">
                    <SearchForm />
                </div>
                <div className="col col-lg-8">
                    <Map />
                </div>
            </div>
        </div>
    );
};

export default Destination;