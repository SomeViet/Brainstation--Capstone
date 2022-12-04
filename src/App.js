import "./styles/App.scss";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header, Footer } from "./components/index";
import { Home, Cuisine, FoodSearch, ContactUs } from "./pages/index";

export default class App extends React.Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/contactus">
                            <ContactUs />
                        </Route>
                        <Route path="/cuisine/:cuisineId">
                            <Cuisine />
                        </Route>
                        <Route path="/foodsearch/:foodName">
                            <FoodSearch />
                        </Route>
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </>
        );
    }
}
