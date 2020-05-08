import React from 'react';

export default function Footer() {
    return (
        <footer className="py-5 bg-dark">
            <div className="container">
                <p className="m-0 text-center text-white">Developed with <i className="fa fa-heart"></i> by <a href="http://mastragostino.me" target="_blank">Emiliano Mastragostino</a></p>
                <p className="footer-p-icons m-0">
                    <a href="https://www.linkedin.com/in/emiliano-mastragostino/" target="_blank"><i className="fa fa-linkedin icons"></i></a>
                    <a href="https://github.com/emastra" target="_blank"><i className="fa fa-github icons"></i></a>
                    <a href="https://plus.google.com/112095688629248913313" target="_blank"><i className="fa fa-google-plus-square icons"></i></a>
                </p>
            </div>
        </footer>
    );
}