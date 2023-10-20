import Router from "./router";
import {Suspense} from "react";


function App() {

    return (
        <Suspense fallback={<div>loading...</div>}>
            <Router/>
        </Suspense>
    )
}

export default App
