import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Card extends Component {
    render() {
        return (
            <div className="card" style={{ width: 15 + "rem" }}>
                <img className="card-img-top" src="https://id-test-11.slatic.net/p/8/cincin-tunangan-couple-silver-lapis-rhodium-a-17b-exclusive-4595-3530454-92fd44173a027036a681cb1b1e521129-catalog_233.jpg"
                    alt="Card image cap" style={{ width: 230, height: 100, backgroudColor: 'black' }} />
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.description}</p>
                    <Link to='/detail'><a className="btn btn-warning">Detail</a></Link>
                </div>
            </div>
        )
    }
}