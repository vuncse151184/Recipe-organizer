import * as React from 'react'
import './index.css'
import { Facebook, Instagram, Twitter } from '@mui/icons-material'
import Link from '@mui/material/Link'

const Footer = () => {
    return (
        <div style={{ borderTop: '1px solid #eee', backgroundColor: '#eee' }}>
            <div className="container">
                <footer className="py-5 footer-container">
                    <div className="footer-component pl-4">
                        <h5 style={{ color: '#f39c12' }}>Recipe Organizer</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2" style={{ color: "#6c757d", fontSize: "14px" }}>
                                <b>
                                    Recipe organizer is a web app to store recipe of user.
                                    User can read recipe and save it.
                                    Beside that, user can create their own plan meal.
                                </b>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-component pl-4 ml-5">
                        <h5 style={{ color: '#f39c12' }}>Pages</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <a href="/" className="nav-link p-0 text-muted">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a href="/favorite-recipe" className="nav-link p-0 text-muted">
                                    Favorite Recipe
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a href="/plan" className="nav-link p-0 text-muted">
                                    Plan Meal
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a href="/create-recipe" className="nav-link p-0 text-muted">
                                    Create Recipe
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-component pl-4">
                        <form>
                            <h5 style={{ color: '#f39c12' }}>Subscribe to our newsletter</h5>
                            <p>Monthly digest of what's new and exciting from us.</p>
                            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                <input
                                    id="newsletter1"
                                    type="text"
                                    className="form-control"
                                    placeholder="Email address"
                                />
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    style={{ backgroundColor: '#f39c12', height: 50 }}
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </footer>
            </div>
            <div className="d-flex flex-column flex-sm-row justify-content-between py-4 border-top container">
                <p>© 2022 Company, Inc. All rights reserved.</p>
                <ul className="list-unstyled d-flex">
                    <Link to="https://www.facebook.com/" color="inherit">
                        <Facebook />
                    </Link>
                    <Link to="https://www.instagram.com/" color="inherit" sx={{ pl: 1, pr: 1 }}>
                        <Instagram />
                    </Link>
                    <Link to="https://www.twitter.com/" color="inherit">
                        <Twitter />
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Footer
