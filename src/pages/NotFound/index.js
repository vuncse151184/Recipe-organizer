import './index.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="error404">
            <h1>Opps! Something is wrong</h1>
            <section className="error__container">
                <span className="four">
                    <span className="screen__reader__text">4</span>
                </span>
                <span className="zero">
                    <span className="screen__reader__text">0</span>
                </span>
                <span className="four">
                    <span className="screen__reader__text">4</span>
                </span>
            </section>
            <div className="link__container">
                <Link to="/" className="more__link">
                    Go to Home
                </Link>
                {/* <Link to="/" className="more__link">Go to home page</Link> */}
            </div>
        </div>
    )
}
export default NotFound
