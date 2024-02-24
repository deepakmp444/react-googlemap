import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

function Directions({ origin, destination, setRouteSummary }) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] = useState();
    const [directionsRenderer, setDirectionsRenderer] = useState();
    const [routes, setRoutes] = useState([]);
    console.log('routes:', routes)
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];

    const leg = selected?.legs[0];


    const [selectRoute, setSelectRoute] = useState({})
    console.log('DirectionselectRoute:', selectRoute)

    // 1. Initialize directions service and renderer

    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map, origin, destination]);

    // 2. Use directions service
    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;
        directionsService
            .route({
                origin: origin,
                destination: destination,
                provideRouteAlternatives: false,
                // travelMode: 'TRANSIT',
                // transitOptions: {
                //     departureTime: new Date(/* now, or future date */),
                //     modes: ['RAIL'],
                //     routingPreference: 'FEWER_TRANSFERS'
                // },

                travelMode: 'DRIVING',
                // drivingOptions: {
                //     departureTime: new Date(/* now, or future date */),
                //     trafficModel: 'pessimistic'
                // },
            })
            .then(response => {
                console.log('Before response:', response)
                // response.routes[0].legs[0].steps[0].transit = undefined
                directionsRenderer.setDirections(response);
                directionsRenderer.setOptions({
                    polylineOptions: {
                        strokeColor: 'blue'
                    }
                    // iconSymbols: [{
                    //     path: google.maps.SymbolPath.FORWARD_SLASH, // Or other icon path
                    //     fillColor: 'transparent', // Makes icon invisible
                    //     fillOpacity: 0, // Makes icon invisible
                    //     strokeColor: 'transparent', // Makes icon invisible
                    //     strokeOpacity: 0,
                    // }]
                });
                setRoutes(response.routes);
                setRouteSummary(response.routes)
            }).catch((error)=> console.log("errors"+error));

        return () => directionsRenderer.setMap(null);
    }, [directionsService, directionsRenderer, origin, destination, setRouteSummary]);

    //3. Update direction route
    useEffect(() => {
        if (!directionsRenderer) return;

        directionsRenderer.setRouteIndex(routeIndex);
        directionsRenderer.setRouteIndex(1);
        directionsRenderer.setRouteIndex(2);
    }, [routeIndex, directionsRenderer, origin, destination]);

    if (!leg) return null;

    return (
        <div>
        </div>
    );
}

export default Directions