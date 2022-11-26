import React from "react";
import "./Cuisine.scss";
import { FoodButton } from "../../components/index";

export default class Home extends React.Component {
    render() {
        return (
            <>
                <main className="home">
                    <h1 className="home__header">Japanese Cuisine</h1>
                    <div className="home__selection">
                        <FoodButton foodText={"Ramen"} />
                        <FoodButton foodText={"Sushi"} />
                        <FoodButton foodText={"Rice Bowls"} />
                        <FoodButton foodText={"Karrage"} />
                        <FoodButton foodText={"Skewers"} />
                    </div>
                </main>
            </>
        );
    }
}
