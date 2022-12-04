import React from "react";
import CuisineButton from "../../components/CuisineButton/CuisineButton";
import "./Home.scss";
import axios from "axios";

const PORT = "1234";

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            cuisineData: "",
        };
    }

    componentDidMount() {
        this.getCuisineData(PORT);
    }

    getCuisineData = (PORT) => {
        axios
            .get(`http://localhost:${PORT}/cuisine`)
            .then((res) => {
                this.setState({
                    cuisineData: res.data,
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };

    render() {
        return (
            <>
                <main className="home">
                    <h1 className="home__header">I'm Hungry</h1>
                    <div className="home__selection">
                        {this.state.cuisineData
                            ? this.state.cuisineData.map((cuisineData) => {
                                  return (
                                      <CuisineButton
                                          key={cuisineData.id}
                                          cuisineId={cuisineData.id}
                                          buttonText={cuisineData.cuisine}
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
