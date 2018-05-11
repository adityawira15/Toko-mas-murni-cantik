import React, { Component } from 'react'
import LazyHero from 'react-lazy-hero';
import { Link } from 'react-router-dom';
import './dashboard.css'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <LazyHero
                    style={{ height: 100 + '%', color: '#ffffff' }}
                    color="#000"
                    minHeight='100vh'
                    opacity={0.3}
                    isCentered={true}
                    imageSrc="https://c1.staticflickr.com/8/7577/15373273683_baef5fd1dd_b.jpg">
                    <h1>Toko Mas Murni Cantik</h1>
                    <br />
                    <Link to='/home'><button className="button">Click to Open!</button></Link>
                </LazyHero>
            </div>

        )
    }
}