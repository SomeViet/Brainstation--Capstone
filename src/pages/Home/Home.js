import React from "react";
import CuisineButton from "../../components/CuisineButton/CuisineButton";
import "./Home.scss";
import axios from "axios";
import hamburgerlogo from "../../assets/images/hamburgerlogo.png";

const PORT = process.env.REACT_APP_DATAPORT;

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
                    <div className="home__container">
                        <img
                            src={hamburgerlogo}
                            alt="hamburger logo"
                            className="home__logo"
                        />
                        <h1 className="home__header">I Am Hungry</h1>
                        <img
                            src={hamburgerlogo}
                            alt="hamburger logo"
                            className="home__logo"
                        />
                    </div>

                    <h3 className="home__subheader">~ What should I eat? ~</h3>
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
