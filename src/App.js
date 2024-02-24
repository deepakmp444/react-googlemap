import { useState } from "react";
import GDirection from "./Google/GDirection"
import GMapTag from "./Google/GMapTag"
import Gmap from "./Google/Gmap"
import TestMap from "./Google/TestMap"
import Autocomplete from "./Google/Autocomplete/Autocomplete";
import AutoCompleteRoute from "./Google/AutoCompleteRoute/AutoCompleteRoute";
import ReactMap from "./ReactGoogleMapAPI/ReactMap";


function App() {


  return (
    <div className="container">
      <h1 className="text-center mt-3 mb-3">Google Map</h1>
      <div>
        {/* <Gmap/> */}
        {/* <GMapTag/> */}
        {/* <TestMap/> */}
        {/* <GDirection /> */}
        {/* <Autocomplete /> */}
        {/* <AutoCompleteRoute /> */}

        <ReactMap/>
      </div>
    </div>
  )
}

export default App