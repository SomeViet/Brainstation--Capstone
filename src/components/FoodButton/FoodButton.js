import "./FoodButton.scss";
import { Link } from "react-router-dom";

export default function FoodButton({ foodText }) {
    return (
        <>
            <Link to={"/foodsearch/" + foodText} className="food-button">
                <button className="food-button">{foodText}</button>
            </Link>
        </>
    );
}
