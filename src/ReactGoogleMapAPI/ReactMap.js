import { useJsApiLoader, GoogleMap, Autocomplete } from "@react-google-maps/api"
const center = { lat: 20.59, lng: 78.96 }

function ReactMap() {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
        libraries: ['places']
    })

    if (!isLoaded) return <p>Loading</p>

    return (
        <div>
            <h1>ReactMap</h1>
            <div style={{ position: 'relative', height: '85vh' }}>
                <GoogleMap center={center} zoom={10} mapContainerStyle={{ width: "100%", height: "80%" }} options={{ zoomControl: false, }}>
                    <div style={{ position: 'relative', top: 10, left: 20 }}>
                        <div>
                            <Autocomplete>
                                <input type="text" placeholder="Origin" style={{
                                    boxSizing: `border-box`,
                                    border: `1px solid transparent`,
                                    width: `240px`,
                                    height: `32px`,
                                    padding: `0 12px`,
                                    borderRadius: `3px`,
                                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                    fontSize: `14px`,
                                    outline: `none`,
                                    textOverflow: `ellipses`,
                                    position: "absolute",
                                    left: "50%",
                                    marginLeft: "-120px"
                                }} />
                            </Autocomplete>
                        </div>
                        <div>
                            <Autocomplete>
                                <input type="text" placeholder="Destination" style={{
                                    boxSizing: `border-box`,
                                    border: `1px solid transparent`,
                                    width: `240px`,
                                    height: `32px`,
                                    padding: `0 12px`,
                                    borderRadius: `3px`,
                                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                    fontSize: `14px`,
                                    outline: `none`,
                                    textOverflow: `ellipses`,
                                    position: "absolute",
                                    left: "70%",
                                    marginLeft: "-120px"
                                }} />
                            </Autocomplete>
                        </div>
                    </div>
                </GoogleMap>
            </div>
        </div>
    )
}

export default ReactMap