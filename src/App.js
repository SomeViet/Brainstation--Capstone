import "./styles/App.scss";
import React from "react";
import {
    BrowserRouter,
    // Route, Switch
} from "react-router-dom";

export default class App extends React.Component {
    render() {
        return (
            <>
                <BrowserRouter></BrowserRouter>
                <div className="App">This is a test</div>
            </>
        );
    }
}
