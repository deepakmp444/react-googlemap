import { useMap } from '@vis.gl/react-google-maps';
import React, { useEffect } from 'react';

const MapHandlers = ({ place }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !place) return;

        if (place.geometry?.viewport) {
            map.fitBounds(place.geometry?.viewport);
        }
    }, [map, place]);

    return null;
};

export default React.memo(MapHandlers);