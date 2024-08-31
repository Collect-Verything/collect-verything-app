import {Link} from "react-router-dom";

export const HomePage = () => {
    return (
        <div>
            <p>Home page</p>
            <Link to="test">Go Test</Link>
        </div>
    )
}