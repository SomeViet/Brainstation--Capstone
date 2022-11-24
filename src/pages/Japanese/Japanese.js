import React from "react";
import { Link } from "react-router-dom";

export default class Japanese extends React.Component {
    render() {
        return (
            <>
                <Link to="/foodsearch">
                    <div>Ramen</div>
                </Link>
                <div>Test</div>
            </>
        );
    }
}
