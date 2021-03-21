import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const Map = () => {
    const [viewport, setViewport] = useState({
        width: "100%",
        height: 500,
        latitude: 23.6850,
        longitude: 90.3563,
        zoom: 8
    });
    return (
        <div>
            <ReactMapGL
                mapboxApiAccessToken={"pk.eyJ1IjoibWR5ZWFzaW4iLCJhIjoiY2ttaGhkd2tjMDdjOTJxcXVqZ2Z5bTEyZiJ9.7stRZY03hJo4RgF1nIvpvQ"}
                {...viewport}
                onViewportChange={nextViewport => setViewport(nextViewport)}
            />
        </div>
    );
};

export default Map;
