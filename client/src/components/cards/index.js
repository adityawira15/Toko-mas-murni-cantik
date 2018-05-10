import React, { Component } from 'react'
import Card from './card'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../../actions'

class Cards extends Component {
    render() {
        let cards = this.props.data.response.map((val, i) => {
            return (
                <Card 
                title={val.title}
                description={val.description}
                key={i}
                />
            )
        })
        return (
            <div>
                <br />
                <h3>Cincin</h3>
                <div className="card-columns" style={{ columnCount: 4 }}>
                    {cards}
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
)(Cards)