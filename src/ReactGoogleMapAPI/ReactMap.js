import React, { useState, useRef } from 'react';
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";

const center = { lat: 20.59, lng: 78.96 };

function ReactMap() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
        libraries: ['places']
    });

    const [directionResponse, setDirectionResponse] = useState(null);
    const [distance, setDistance] = useState(null);

    const originRef = useRef();
    const destinationRef = useRef();

    if (!isLoaded) return <p>Loading</p>;

    const directionCalulate = async () => {
        if (originRef.current.value === "" || destinationRef.current.value === "") {
            return;
        }

        // eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService();
        const results = await directionService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING
        });

        setDirectionResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
    };

    // Options for the DirectionsRenderer to change polyline color
    const directionsRendererOptions = {
        polylineOptions: {
            strokeColor: "#ff0000" // Change the color to red (you can specify any valid CSS color)
        }
    };

    return (
        <div style={{ position: 'relative', height: '85vh' }}>
            <GoogleMap center={center} zoom={10} mapContainerStyle={{ width: "100%", height: "80%" }} options={{ zoomControl: false }}>
                <div className="card">
                    <div className="bg-white p-3">
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm-4 offset-sm-1'>
                                    <Autocomplete>
                                        <input type="text" placeholder="Origin" ref={originRef} />
                                    </Autocomplete>
                                    <p>distance: {distance}</p>
                                </div>
                                <div className='col-sm-4'>
                                    <Autocomplete>
                                        <input type="text" placeholder="Destination" ref={destinationRef} />
                                    </Autocomplete>
                                </div>
                                <div className='col-sm-2'>
                                    <button className="btn btn-primary" onClick={directionCalulate}>Get Route</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {directionResponse && <DirectionsRenderer directions={directionResponse} options={directionsRendererOptions} />}
            </GoogleMap>
        </div>
    );
}

export default ReactMap;
