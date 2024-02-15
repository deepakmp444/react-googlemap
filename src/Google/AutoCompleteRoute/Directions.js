import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

function Directions({origin, destination, setRouteSummary}) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] = useState();
    const [directionsRenderer, setDirectionsRenderer] = useState();
    const [routes, setRoutes] = useState([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];

    const leg = selected?.legs[0];
    
    // 1. Initialize directions service and renderer
    
    useEffect(() => {
        if (!routesLibrary || !map) return;
        console.log('1.Initialize directions service and renderer:')
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map, origin, destination]);

    // 2. Use directions service
    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;
        console.log('2.Use directions service:')
        directionsService
            .route({
                origin: origin,
                destination: destination,
                travelMode: "DRIVING",
                provideRouteAlternatives: true
            })
            .then(response => {
                directionsRenderer.setDirections(response);
                setRoutes(response.routes);
                setRouteSummary(response.routes)
            });

        return () => directionsRenderer.setMap(null);
    }, [directionsService, directionsRenderer, origin, destination, setRouteSummary]);

    //3. Update direction route
    useEffect(() => {
        if (!directionsRenderer) return;
    console.log('3.Update direction route:')
        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer, origin, destination]);

    console.log("Directions before leg")
    if (!leg) return null;
    console.log("Directions after leg")

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

export default Directions