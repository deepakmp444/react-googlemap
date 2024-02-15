import { useState } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps";

export default function TestMap() {
    const position = { lat: 53.54, lng: 10 };
    const [open, setOpen] = useState(false);

    return (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API}>
            <div style={{ height: "80vh", width: "100%" }}>
                <Map zoom={9} center={position} mapId={process.env.REACT_APP_GOOGLE_MAP_ID}>
                    <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                        <Pin
                            background={"grey"}
                            borderColor={"green"}
                            glyphColor={"purple"}
                        />
                    </AdvancedMarker>

                    {open && (
                        <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                            <p>I'm in Hamburg</p>
                        </InfoWindow>
                    )}
                </Map>
            </div>
        </APIProvider>
    );
}