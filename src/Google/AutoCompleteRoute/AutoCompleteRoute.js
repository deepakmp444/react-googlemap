import {
  APIProvider,
  Map,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import Directions from './Directions';
import AutoCompletes from './AutoCompletes';


function AutoCompleteRoute() {
  const [selectedSourcePlace, setSelectedSourcePlace] = useState(null);
  const [selectedDestinationPlace, setSelectedDestinationPlace] = useState(null);
  const [startEndDirection, setStartEndDirection] = useState({
    origin:"",
    destination:""
  });
  console.log('startEndDirection:', startEndDirection)

  const [routeSummary, setRouteSummary] = useState({})

  const handleRoute = ()=>{
    setStartEndDirection({
      origin: selectedSourcePlace.formatted_address,
      destination: selectedDestinationPlace.formatted_address
    })
    console.log('selectedSourcePlace.formatted_address:', selectedSourcePlace.formatted_address)
    console.log('selectedDestinationPlace.formatted_address:', selectedDestinationPlace.formatted_address)

  }
  console.log('handleRoute:')

  console.log('duration:', )

  return (
    <div>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API}>
        <div style={{ position: 'relative', height: '85vh' }}>
          <Map defaultZoom={3}
            defaultCenter={{ lat: 20.59, lng: 78.96 }}
            gestureHandling={'greedy'}
            disableDefaultUI={true} mapId={process.env.REACT_APP_GOOGLE_MAP_ID} >
            <div className='container bg-white p-3' style={{ position: 'absolute', top: 10, left: 370, width: "570px" }}>
              <div className='row'>
                <div className="col-sm-4">
                  <AutoCompletes onPlaceSelect={setSelectedSourcePlace} />
                  <label for="distance" className="form-label mt-1">Distance: {routeSummary?.[0]?.legs?.[0]?.distance?.text}</label>
                </div>
                <div className="col-sm-4">
                  <AutoCompletes onPlaceSelect={setSelectedDestinationPlace} />
                  <label for="timecal" className="form-label mt-1">Time: {routeSummary?.[0]?.legs?.[0]?.duration?.text}</label>
                </div>
                <div className='col-sm-4'>
                  <button type="button" className="btn btn-primary" onClick={handleRoute}>Get Route</button>
                </div>
              </div>
            </div>
            {(selectedSourcePlace && selectedDestinationPlace && startEndDirection && startEndDirection.origin && startEndDirection.destination) ? <Directions origin={startEndDirection.origin} destination={startEndDirection.destination} setRouteSummary={setRouteSummary} /> : null}
          </Map>
        </div>
      </APIProvider>
    </div>
  )
}


export default AutoCompleteRoute