import "./FoodButton.scss";
import { Link } from "react-router-dom";

export default function FoodButton() {
    return (
        <>
            <Link to="/cuisine" className="food-button">
                <button className="food-button">Food</button>
            </Link>
        </>
    );
}
