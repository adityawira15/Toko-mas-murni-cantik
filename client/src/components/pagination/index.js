import React, { Component } from 'react'
import request from 'superagent';
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
            offsetarray: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        request
            .get('http://localhost:3000/api/mc?model=' + this.props.model + '&offset=' + this.state.offset)
            .set('Accept', 'application/json')
            .end((err, val) => {
                let data = JSON.parse(val.text)
                data.data.map((val, i) => {
                    if (i % 4 === 0) {
                        console.log(i)
                        this.setState({ offsetarray: [...this.state.offsetarray, i] })
                    }
                })
            })
    }

    handleClick(offset) {
        this.props.actions.loadDataMc(this.props.model, offset)
    }

    render() {
        const list = this.state.offsetarray.map((val, i)=>{
            return(
                <List key={i} num={i+1} handleClick={() => this.handleClick(val)} />
            )
        })
        return (
            <div className="stylenav">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <a className="page-link" onClick={this.handleClick} tabIndex="-1">Previous</a>
                        </li>
                        {list}
                        <li className="page-item">
                            <a className="page-link" onClick={this.handleClick}>Next</a>
                        </li>
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