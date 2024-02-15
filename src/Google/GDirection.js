import {
    APIProvider,
    Map,
    useMapsLibrary,
    useMap
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

function GDirection() {
    return (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API}>
            <div style={{ position: 'relative', height: '85vh' }}>
                <Map
                    defaultCenter={{ lat: 43.65, lng: -79.38 }}
                    defaultZoom={9}
                    gestureHandling={'greedy'}
                    fullscreenControl={false}>
                    <Directions />
                    <div className='bg-white p-3' style={{ position: 'absolute', top: 10, left: 400, width: "570px" }}>
                        <div className='d-flex'>
                            <div className="">
                                <label for="Source" className="form-label">Source</label>
                                <input type="text" className="form-control" id="Source" placeholder="Enter source" />
                                <label for="distance" className="form-label mt-1">Distance: 223KM</label>
                            </div>
                            <div className="ms-3">
                                <label for="Destination" className="form-label">Destination</label>
                                <input type="text" className="form-control" id="Destination" placeholder="Enter source" />
                                <label for="timecal" className="form-label mt-1">Time: 6hour</label>
                            </div>
                            <div className='ms-3' style={{ marginTop: "32px" }}>
                                <button type="button" className="btn btn-primary">Get Route</button>
                            </div>
                        </div>
                    </div>
                </Map>
            </div>
        </APIProvider>
    )
}

function Directions() {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] = useState();
    const [directionsRenderer, setDirectionsRenderer] = useState();
    const [routes, setRoutes] = useState([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];

    const leg = selected?.legs[0];
    console.log('leg:', leg?.distance?.text)

    // Initialize directions service and renderer
    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);

    // Use directions service
    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;

        directionsService
            .route({
                origin: 'Kahalgaon',
                destination: 'Bhopal',
                travelMode: "DRIVING",
                provideRouteAlternatives: true
            })
            .then(response => {
                directionsRenderer.setDirections(response);
                setRoutes(response.routes);
            });

        return () => directionsRenderer.setMap(null);
    }, [directionsService, directionsRenderer]);

    // Update direction route
    useEffect(() => {
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

    if (!leg) return null;

    return (
        <ul>
            {routes.map((route, index) => (
                <li key={route.summary}>
                    <button onClick={() => setRouteIndex(index)}>
                        {route.summary}
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default GDirection