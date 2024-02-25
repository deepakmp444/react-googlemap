import React from 'react';
import { useJsApiLoader, GoogleMap, Autocomplete } from "@react-google-maps/api";

const center = { lat: 20.59, lng: 78.96 };

function ReactMap() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
        libraries: ['places']
    });

    if (!isLoaded) return <p>Loading</p>;

    return (
        <div>
            <h1>ReactMap</h1>
            <div style={{ position: 'relative', height: '85vh' }}>
                <GoogleMap center={center} zoom={10} mapContainerStyle={{ width: "100%", height: "80%" }} options={{ zoomControl: false, }}>
                    <div className="card">
                        <div className="bg-white p-3">
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-sm-4 offset-sm-1'>
                                        <Autocomplete>
                                            <input type="text" placeholder="Origin" />
                                        </Autocomplete>
                                    </div>
                                    <div className='col-sm-4'>
                                        <Autocomplete>
                                            <input type="text" placeholder="Destination" />
                                        </Autocomplete>
                                    </div>
                                    <div className='col-sm-2'>
                                        <button className="btn btn-primary" >Get Route</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </GoogleMap>
            </div>
        </div>
    );
}

export default ReactMap;
