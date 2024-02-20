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
                provideRouteAlternatives: true,
                // travelMode: 'TRANSIT',
                // transitOptions: {
                //     departureTime: new Date(/* now, or future date */),
                //     modes: ['BUS'],
                //     routingPreference: 'FEWER_TRANSFERS'
                // },
                travelMode: 'DRIVING',
                // drivingOptions: {
                //     departureTime: new Date(/* now, or future date */),
                //     trafficModel: 'pessimistic'
                // },
            })
            .then(response => {
                directionsRenderer.setDirections(response);
                directionsRenderer.setOptions({
                    polylineOptions: {
                        strokeColor: 'blue'
                    }
                });
                setRoutes(response.routes);
                setRouteSummary(response.routes)
            });

        return () => directionsRenderer.setMap(null);
    }, [directionsService, directionsRenderer, origin, destination, setRouteSummary]);

    //3. Update direction route
    useEffect(() => {
        if (!directionsRenderer) return;

        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer, origin, destination]);

    const handleRoute = (index, route) => {
        setRouteIndex(index)
        setSelectRoute(route)
    }

    if (!leg) return null;

    return (
        <div>
            <div className='bg-white' style={{ position: 'absolute', top: 20, left: 990, width: "300px", height: "530px", overflow: "auto" }}>
                {<p className='text-center mt-2'><strong>{routes?.[0]?.legs?.[0].steps && routes?.[0]?.legs?.[0].steps?.[0]?.travel_mode}</strong></p>}
                {selectRoute &&
    Object.keys(selectRoute).length === 0 &&
    selectRoute.constructor === Object ? <ul className="bg-white p-2">
                    {routes.map((route, index) => (
                        <li key={index} className="bg-light mb-1">
                            <div role="button" onClick={() => handleRoute(index, route)} className="d-flex justify-content-between p-2">
                                {/* - {route.summary} */}
                                <div className="mt-4 me-2"> <p>{route.legs?.[0].arrival_time?.text}{" "}{routes?.[0]?.legs?.[0]?.departure_time?.text}</p></div>
                                <div> <p>{route.legs?.[0]?.distance?.text}</p>
                                    <p>{routes?.[0]?.legs?.[0]?.duration?.text}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul> : null}

                {selectRoute ? <button className="btn btn-light" onClick={() => setSelectRoute({})}>Back</button> : null}

                {selectRoute.legs?.[0].steps?.map((value, index)=>{
                    return(
                        <div key={index}>{value?.distance?.text}</div>
                    )
                })}

                {/* {routes?.[0]?.legs?.[0].steps && routes?.[0]?.legs?.[0].steps.map((value, index) => {
                    return (
                        <div className='p-2 bg-light border' key={index}>
                            <span className='me-2 text-warning'>
                                {index + 1}
                            </span>
                            <span dangerouslySetInnerHTML={{ __html: value.instructions }} />
                            <p className='text-center mt-1'>{value.distance.text + ": "}{value.duration.text}</p>
                        </div>
                    )
                })} */}
            </div>
        </div>
    );
}

export default Directions