import React, { Component } from 'react'

export default class List extends Component {
    render() {
        return (
            <li className="page-item">
                <a className="page-link" onClick={this.props.handleClick}>{this.props.num}</a>
            </li>
        )
    }
}