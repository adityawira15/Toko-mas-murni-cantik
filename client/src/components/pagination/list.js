import React, { Component } from 'react'

export default class List extends Component {
    render() {
        return (
            <li className={"page-item "+this.props.active}>
                <a className="page-link" onClick={this.props.handleClick}>{this.props.no}</a>
            </li>
        )
    }
}