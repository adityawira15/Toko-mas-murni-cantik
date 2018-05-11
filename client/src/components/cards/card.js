import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../../actions'

class Card extends Component {
    render() {
        return (
            <div className="card" style={{ width: 15 + "rem" }}>
                <img className="card-img-top" src="https://id-test-11.slatic.net/p/8/cincin-tunangan-couple-silver-lapis-rhodium-a-17b-exclusive-4595-3530454-92fd44173a027036a681cb1b1e521129-catalog_233.jpg" alt="img"
                style={{ width: 230, height: 100}} />
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.description}</p>
                    <Link to={'/detail/'+this.props.id} onClick={() => this.props.actions.getDataMcDetail(this.props.id)}><button className="btn btn-warning">Detail</button></Link>
                </div>
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
)(Card)