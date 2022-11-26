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
                        <Route path="/cuisine">
                            <Cuisine />
                        </Route>
                        <Route path="/foodsearch">
                            <FoodSearch />
                        </Route>
                    </Switch>
                    <div>This is a app page</div>
                    <Footer />
                </BrowserRouter>
            </>
        );
    }
}
