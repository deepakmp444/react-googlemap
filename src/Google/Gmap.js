import { APIProvider, Map,  } from '@vis.gl/react-google-maps'

function Gmap() {
    const position = { lat: 25.26, lng: 87.23 }
    return (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API}>
            <div style={{ height: "80vh" }}>
                <Map zoom={10} center={position} mapId={process.env.REACT_APP_GOOGLE_MAP_ID} >
                </Map>
            </div>
        </APIProvider>
    )
}

export default Gmap