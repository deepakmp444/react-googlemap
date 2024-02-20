import {
  APIProvider,
  Map,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import Directions from './Directions';
import AutoCompletes from './AutoCompletes';
import Select from 'react-select'


const transitOptions = [
  { value: 'TRAIN', label: 'TRAIN' },
  { value: 'BUS', label: 'BUS' },
  { value: 'RAIL', label: 'RAIL' },
  { value: 'SUBWAY', label: 'SUBWAY' },
  { value: 'TRAM', label: 'TRAM' },
]

const travelModeOptions = [
  { value: 'DRIVING', label: 'DRIVING' },
  { value: 'BICYCLING', label: 'BICYCLING' },
  { value: 'WALKING', label: 'WALKING' },
  { value: 'TRANSIT', label: 'TRANSIT' },
]


function AutoCompleteRoute() {
  const [selectedSourcePlace, setSelectedSourcePlace] = useState(null);
  const [selectedDestinationPlace, setSelectedDestinationPlace] = useState(null);
  const [startEndDirection, setStartEndDirection] = useState({
    origin: "",
    destination: ""
  });

  const [selectedTravelMode, setSelectTravelMode] = useState({
    label: null,
    value: null
  })

  const [selectedTransitMode, setSelectTransitMode] = useState({
    label: null,
    value: null
  })

  const [routeSummary, setRouteSummary] = useState({})
  console.log('routeSummary:', routeSummary)
  // console.log('routeSummaryLegs:', routeSummary?.[0]?.legs?.[0].steps)

  const handleRoute = () => {
    // setStartEndDirection({
    //   origin: selectedSourcePlace.formatted_address,
    //   destination: selectedDestinationPlace.formatted_address
    // })
    setStartEndDirection({
      origin: "Kahalgaon, Bihar, India",
      destination: "Patna, Bihar, India"
    })
    // console.log('selectedSourcePlace.formatted_address:', selectedSourcePlace.formatted_address)
    // console.log('selectedDestinationPlace.formatted_address:', selectedDestinationPlace.formatted_address)

  }

  const handleTravelMode = (value) => {
    setSelectTravelMode(value)
  }

  const handleTransitMode = (value) => {
    if (value) {
      setSelectTransitMode(value)
    } else {
      setSelectTransitMode({
        label: null,
        value: null
      })
    }
  }

  return (
    <div>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API}>
        <div style={{ position: 'relative', height: '85vh' }}>
          <Map defaultZoom={3}
            defaultCenter={{ lat: 20.59, lng: 78.96 }}
            gestureHandling={'greedy'}
            disableDefaultUI={true} mapId={process.env.REACT_APP_GOOGLE_MAP_ID} >
            <div className='container bg-white p-3' style={{ position: 'absolute', top: 10, left: 10, width: "900px" }}>
              <div className='row'>
                <div className="col">
                  <AutoCompletes onPlaceSelect={setSelectedSourcePlace} />
                  <label for="distance" className="form-label mt-1">Distance: {routeSummary?.[0]?.legs?.[0]?.distance?.text}</label>
                </div>
                <div className="col">
                  <AutoCompletes onPlaceSelect={setSelectedDestinationPlace} />
                  <label for="timecal" className="form-label mt-1">Time: {routeSummary?.[0]?.legs?.[0]?.duration?.text}</label>
                </div>
                <div className="col">
                  <Select isSearchable={false} options={travelModeOptions} defaultValue="DRIVING" onChange={handleTravelMode} />
                </div>
                {(selectedTravelMode && selectedTravelMode.value === "TRANSIT") ? <div className="col">
                  <Select isSearchable={false} isClearable={true} isMulti options={transitOptions} onChange={handleTransitMode} />
                </div> : null}
                <div className='col'>
                  <button type="button" className="btn btn-primary" onClick={handleRoute}>Get Route</button>
                </div>
              </div>
            </div>

            {/* {(startEndDirection && startEndDirection.origin && startEndDirection.destination) ? <div className='bg-white' style={{ position: 'absolute', top: 20, left: 970, width: "300px", height: "530px", overflow: "auto" }}>
              {<p className='text-center mt-2'><strong>{routeSummary?.[0]?.legs?.[0].steps && routeSummary?.[0]?.legs?.[0].steps?.[0]?.travel_mode}</strong></p>}
              {routeSummary?.[0]?.legs?.[0].steps && routeSummary?.[0]?.legs?.[0].steps.map((value, index) => {
                return (
                  <div className='p-2 bg-light border' key={index}>
                    <span className='me-2 text-warning'>
                      {index + 1}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: value.instructions }} />
                    <p className='text-center mt-1'>{value.distance.text + ": "}{value.duration.text}</p>
                  </div>
                )
              })}
            </div> : null} */}


            {(startEndDirection && startEndDirection.origin && startEndDirection.destination) ? <Directions origin={startEndDirection.origin} destination={startEndDirection.destination} setRouteSummary={setRouteSummary} /> : null}

            {/* 
            {(selectedSourcePlace && selectedDestinationPlace && startEndDirection && startEndDirection.origin && startEndDirection.destination) ? <div className='bg-white' style={{ position: 'absolute', top: 20, left: 970, width: "300px", height: "530px", overflow: "auto" }}>
              {<p className='text-center mt-2'><strong>{routeSummary?.[0]?.legs?.[0].steps && routeSummary?.[0]?.legs?.[0].steps?.[0]?.travel_mode}</strong></p>}
              {routeSummary?.[0]?.legs?.[0].steps && routeSummary?.[0]?.legs?.[0].steps.map((value, index) => {
                return (
                  <div className='p-2 bg-light border' key={index}>
                    <span className='me-2 text-warning'>
                      {index + 1}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: value.instructions }} />
                    <p className='text-center mt-1'>{value.distance.text + ": "}{value.duration.text}</p>
                  </div>
                )
              })}
            </div> : null}


            {(selectedSourcePlace && selectedDestinationPlace && startEndDirection && startEndDirection.origin && startEndDirection.destination) ? <Directions origin={startEndDirection.origin} destination={startEndDirection.destination} setRouteSummary={setRouteSummary} /> : null} */}
          </Map>
        </div>
      </APIProvider>
    </div>
  )
}


export default AutoCompleteRoute