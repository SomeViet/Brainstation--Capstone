import "./FoodSearch.scss";
import React from "react";
import { GoogleSearch } from "../../components/index";
import { withRouter } from "react-router-dom";

function FoodSearch(props) {
    let foodSearch = props.match.params.foodName;
    return (
        <>
            <GoogleSearch foodSearch={foodSearch} />
        </>
    );
}

export default withRouter(FoodSearch);
