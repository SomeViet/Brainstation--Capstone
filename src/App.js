import "./styles/App.scss";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs/ContactUs";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Japanese from "./pages/Japanese/Japanese";
import FoodSearch from "./pages/FoodSearch/FoodSearch";

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
                        <Route path="/japanese">
                            <Japanese />
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
