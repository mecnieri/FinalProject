import React from 'react';
import logo from '../images/logo.png';
import visa from '../images/visa.png';
import mastercard from '../images/mastercard.png';
import skrill from '../images/skrill.png';
import paypal from '../images/paypal.png';
import discover from '../images/discover.png';

const Footer = () => {
    return (
        <footer>
            <div className="link-list-row">
                <div className="container">
                    <div className="container_1-of-5">
                        <div className="container_1-of-5-logo">
                            <img className="container_1-of-5-logo--image" src={logo} alt="Logo" />
                        </div>
                        <p>Feel free to contact us via phone,email or just send us mail.</p>
                        <p> 17 Princess Road, London, Greater London NW1 8JR, UK 1-888-8MEDIA (1-888-892-9953)</p>
                        <div className="social-icons">
                            <h3>Get in touch</h3>
                            <ul>
                                <li><a className="fa fa-facebook" href=""></a></li>
                                <li><a className="fa fa-twitter" href=""></a></li>
                                <li><a className="fa fa-pinterest" href=""></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="container_2-of-5">
                        <h4>Find it Fast</h4>
                        <ul>
                            <li>Laptops</li>
                            <li>TV</li>
                            <li>Phones</li>
                            <li>Fridges</li>
                            <li>Accessories</li>
                        </ul>
                    </div>
                    <div className="container_3-of-5">
                        <h4>Buy</h4>
                        <ul>
                            <li>Become our partner</li>
                            <li>Sell on our site</li>
                            <li>Money Back Guarentee</li>
                            <li>Log in</li>
                        </ul>
                    </div>
                    <div className="container_4-of-5">
                        <h4>Pages</h4>
                        <ul>
                            <li>Blog</li>
                            <li>Browse the Shop</li>
                            <li>Category</li>
                            <li>Terms and Conditions</li>
                            <li>Wordpress.org</li>
                        </ul>
                    </div>
                    <div className="container_5-of-5">
                        <h4>My Account</h4>
                        <ul>
                            <li>Log in</li>
                            <li>Register</li>
                            <li>My Card</li>
                            <li>Checkout</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="footer-copyright-container">
                    <div className="authors">
                        <div className="copy">
                            &copy;
                    </div>
                        <div className="names">
                            <h3>Nikoloz Asatiani</h3>
                            <h3>Mariam Jananashvili</h3>
                            <h3>Giorgi Abzianidze</h3>
                            <h3>Vakhtang Nodadze</h3>
                        </div>
                    </div>
                    <div className="payment-methods">
                        <ul>
                            <li><img src={visa} width="40" height="29" /></li>
                            <li><img src={mastercard} width="40" height="29" /></li>
                            <li><img src={paypal} width="40" height="29" /></li>
                            <li><img src={skrill} width="40" height="29" /></li>
                            <li><img src={discover} width="40" height="29" /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;