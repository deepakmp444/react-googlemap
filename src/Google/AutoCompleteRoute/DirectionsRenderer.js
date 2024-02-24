import { useEffect, useState } from "react";

function DirectionsRenderer({ map, route }) {
    const [directionsRenderer, setDirectionsRenderer] = useState(null);

    useEffect(() => {
        if (!map || !route || !Array.isArray(route) || route.length === 0) {
            console.error("Invalid route format or empty route:", route);
            return;
        }

        const renderer = new window.google.maps.DirectionsRenderer();
        renderer.setMap(map);
        renderer.setDirections({ routes: [route] }); // Ensure that route is passed correctly
        setDirectionsRenderer(renderer);

        return () => {
            if (renderer) {
                renderer.setMap(null);
            }
        };
    }, [map, route]);

    return null;
}

export default DirectionsRenderer;
