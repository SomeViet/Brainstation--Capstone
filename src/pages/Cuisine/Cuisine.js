import React from "react";
import "./Cuisine.scss";
import axios from "axios";
import { FoodButton } from "../../components/index";
import { withRouter } from "react-router-dom";

const PORT = "1234";

class Cuisine extends React.Component {
    constructor(props) {
        super();
        this.cuisineId = props.match.params.cuisineId;
        this.state = {
            cuisineName: "",
            foodData: "",
        };
    }

    componentDidMount() {
        this.getCuisineData(PORT);
        this.getFoodData(PORT);
    }

    getCuisineData = (PORT) => {
        axios
            .get(`http://localhost:${PORT}/cuisine`)
            .then((res) => {
                // Set Cuisine Header
                let filteredCuisine = res.data.find((cuisineData) => {
                    return cuisineData.id === parseInt(this.cuisineId);
                });
                this.setState({
                    cuisineName: filteredCuisine.cuisine,
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };

    getFoodData = (PORT) => {
        axios
            .get(`http://localhost:${PORT}/food`)
            .then((res) => {
                // Get cuisine Id from props, filter food, and set state
                let filteredFood = res.data.filter((food) => {
                    return food.cuisine_id === parseInt(this.cuisineId);
                });

                this.setState({
                    foodData: filteredFood,
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };

    render() {
        console.log(this.state);
        return (
            <>
                <main className="home">
                    <h1 className="home__header">
                        {this.state.cuisineName} Cuisine
                    </h1>
                    <div className="home__selection">
                        {this.state.foodData
                            ? this.state.foodData.map((foodData) => {
                                  return (
                                      <FoodButton
                                          key={foodData.id}
                                          foodText={foodData.food}
                                      />
                                  );
                              })
                            : null}
                    </div>
                </main>
            </>
        );
    }
}

export default withRouter(Cuisine);
