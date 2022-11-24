import "./Header.scss";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <header className="header">
                <div className="header__left-side">
                    <Link to="/">
                        <div>Logo</div>
                    </Link>
                    <Link to="/">
                        <div>Home</div>
                    </Link>
                    <Link to="/contactus">
                        <div>Contact Us</div>
                    </Link>
                </div>
                <div className="header__right-side">Login</div>
            </header>
        </>
    );
}