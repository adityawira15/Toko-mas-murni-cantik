import React, { Component } from 'react'
import List from './list'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../../actions'
import './pagination.css'

class Pagination extends Component {
    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
            offsetarray: [],
            nopage: 1,
            next: true,
            previous: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleNext = this.handleNext.bind(this)
        this.handlePrevious = this.handlePrevious.bind(this)
    }

    handleClick(offset, num) {
        this.props.actions.loadDataMc(this.props.model, offset)
        this.setState({ nopage: num })
        this.setState({ offset: offset })
    }

    handlePrevious() {
        if (this.state.nopage > 1) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.handleClick(this.state.offset - 4, this.state.nopage - 1)}>Previous</a>
                </li>
            )
        } else {
            return (
                <li className="page-item disabled">
                    <a className="page-link" onClick={() => this.handleClick(this.state.offset - 4, this.state.nopage - 1)}>Previous</a>
                </li>
            )
        }
    }

    handleNext() {
        if (this.state.nopage < Math.ceil(this.props.data.data.length / 4)) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.handleClick(this.state.offset + 4, this.state.nopage + 1)}>Next</a>
                </li>
            )
        } else {
            return (
                <li className="page-item disabled">
                    <a className="page-link" onClick={() => this.handleClick(this.state.offset + 4, this.state.nopage + 1)}>Next</a>
                </li>
            )
        }

    }

    render() {
        const list = this.props.data.data.map((val, i) => {
            if (i % 4 === 0) {
                if (this.state.nopage === i / 4 + 1) {
                    return (
                        <List key={i} no={i / 4 + 1} active='active' handleClick={() => this.handleClick(i, i / 4 + 1)} />
                    )
                } else {
                    return (
                        <List key={i} no={i / 4 + 1} active='' handleClick={() => this.handleClick(i, i / 4 + 1)} />
                    )
                }
            }
        })
        
        return (
            <div className="stylenav">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {this.handlePrevious()}
                        {list}
                        {this.handleNext()}
                    </ul>
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pagination)