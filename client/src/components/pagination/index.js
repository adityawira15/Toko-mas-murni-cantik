import React, { Component } from 'react'
import './pagination.css'

export default class Pagination extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {


    }

    render() {
        return (
            <div className="stylenav">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <a className="page-link" onClick={this.handleClick} tabindex="-1">Previous</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" onClick={this.handleClick}>1</a>
                        </li>
                        <li className="page-item active">
                            <a className="page-link" onClick={this.handleClick}>2</a>
                        </li>
                        <li className="page-item"><a className="page-link" onClick={this.handleClick}>3</a></li>
                        <li className="page-item">
                            <a className="page-link" onClick={this.handleClick}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}