import React from "react";
import CuisineButton from "../../components/CuisineButton/CuisineButton";
import "./Home.scss";

export default class Home extends React.Component {
    render() {
        return (
            <>
                <main className="home">
                    <h1 className="home__header">I'm Hungry</h1>
                    <div className="home__selection">
                        <CuisineButton buttonText={"Japanese"} />
                        <CuisineButton buttonText={"Chinese"} />
                        <CuisineButton buttonText={"Japanese"} />
                        <CuisineButton buttonText={"Japanese"} />
                        <CuisineButton buttonText={"Japanese"} />
                        <CuisineButton buttonText={"Japanese"} />
                        <CuisineButton buttonText={"Japanese"} />
                        <CuisineButton buttonText={"Japanese"} />
                    </div>
                </main>
            </>
        );
    }
}
