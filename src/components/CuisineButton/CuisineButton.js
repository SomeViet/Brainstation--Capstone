import "./CuisineButton.scss";
import { Link } from "react-router-dom";

export default function CuisineButton({ buttonText, cuisineId }) {
    return (
        <>
            <Link to={"/cuisine/" + cuisineId} className="cuisine-button">
                <button className="cuisine-button__button">{buttonText}</button>
            </Link>
        </>
    );
}
