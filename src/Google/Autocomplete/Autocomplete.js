import {
  APIProvider,
  Map,
  ControlPosition
} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import MapHandlers from './MapHandlers';
import { GAutoComplete } from './GAutoComplete';

function Autocomplete() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  return (
    <div>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API}>
        <div style={{ position: 'relative', height: '85vh' }}>
          <Map defaultZoom={3}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            gestureHandling={'greedy'}
            disableDefaultUI={true} mapId={process.env.REACT_APP_GOOGLE_MAP_ID} >

            <GAutoComplete controlPosition={ControlPosition.TOP_CENTER} onPlaceSelect={setSelectedPlace} />

            <MapHandlers place={selectedPlace} />
          </Map>
        </div>
      </APIProvider>
    </div>
  )
}

export default Autocomplete