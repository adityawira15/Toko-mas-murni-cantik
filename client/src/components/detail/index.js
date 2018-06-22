import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../../actions'
import './detail.css'

class Detail extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected: '0'
        }
        this.handleSelect = this.handleSelect.bind(this)
    }

    componentDidMount(){
        this.props.actions.getDataMcDetail(this.props.match.params.id)
    }

    handleSelect(e){
        this.setState({selected: e.targer.value})
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h3>Toko Mas Murni Cantik</h3>
                    <h4>alamat</h4>
                </div>
                <nav id="navbar" className={"navbar navbar-dark bg-danger"}>
                    <a className="navbar-brand" href="">
                        <img src="https://cdn.shopify.com/s/files/1/1425/9340/products/wedding-rings-ideas-4_1024x1024.png?v=1506792254" width="30" height="30" alt="" />
                    </a>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="card bg-light mb-3">
                                <div className="card-body">
                                    <a href="" data-toggle="modal" data-target="#productModal">
                                        <img className="img-fluid" src="https://dummyimage.com/800x800/55595c/fff" style={{width: 500, height: 500}} alt='img' />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 add_to_cart_block">
                            <div className="card bg-light mb-3">
                                <div className="card-body">
                                    <p className="price">{this.props.data.response[0].title}</p>
                                    <h2>Rp.{this.props.data.response[0].price.toLocaleString()}</h2>
                                    <p>Bahan: {this.props.data.response[0].material}</p>

                                    {/* <p className="price_discounted">149.90 $</p> */}
                                    <form method="get" action="cart.html">
                                        <a href="cart.html" className="btn btn-success btn-lg btn-block text-uppercase">
                                            <i className="fa fa-shopping-cart"></i> Add To Cart
                                        </a>
                                    </form>
                                    <div className="reviews_product p-3 mb-2 ">
                                        3 reviews
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        (4/5)
                                        <a className="pull-right" href="#reviews">View all reviews</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card border-light mb-3">
                                <div className="card-header bg-danger text-white text-uppercase"><i className="fa fa-align-justify"></i> Description</div>
                                <div className="card-body">
                                    <p className="card-text">
                                    {this.props.data.response[0].detail}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
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
)(Detail)