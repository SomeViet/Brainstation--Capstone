import "./CuisineButton.scss";
import { Link } from "react-router-dom";

export default function CuisineButton({ buttonText }) {
    return (
        <>
            <Link to="/cuisine" className="cuisine-button">
                <button className="cuisine-button__button">{buttonText}</button>
            </Link>
        </>
    );
}
