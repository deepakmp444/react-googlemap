import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef, useMap } from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react'

function GMapTag() {
    const position = { lat: 25.26, lng: 87.23 }
    const [isPopOn, setIsPopOn] = useState(false)
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [addMarker, setAddMarker] = useState([])

    const handleClick = (v) => {
        console.log('v:', v.detail.latLng)
        setAddMarker(pre => [...pre, v.detail.latLng])
    }

    return (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API}>
            <div style={{ height: "80vh" }}>
                <Map defaultCenter={position}
                    defaultZoom={9}
                    gestureHandling={'greedy'}
                    fullscreenControl={false} mapId={process.env.REACT_APP_GOOGLE_MAP_ID}>
                    <AdvancedMarker position={position} draggable={true} onClick={() => setIsPopOn(true)} ref={markerRef}>
                        <Pin />
                    </AdvancedMarker>
                    {isPopOn && <InfoWindow anchor={marker} maxWidth={200} position={position} onCloseClick={() => setIsPopOn(false)} ><p>I am in Kahalgaon</p></InfoWindow>}
                    {/* {addMarker && addMarker.map((v) => {
                        return (
                            <AdvancedMarker key={v.lat} draggable={true} position={v} onClick={() => setIsPopOn(true)} ref={markerRef}>
                                <Pin />
                            </AdvancedMarker>
                        )
                    })} */}
                </Map>
            </div>
        </APIProvider>
    )
}

export default GMapTag