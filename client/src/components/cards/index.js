import React, { Component } from 'react'
import Card from './card'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../../actions'

class Cards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            model: '',
            description: '',
            price: '',
            brand: '',
            detail: '',

        }
        this.title = this.title.bind(this)
        this.model = this.model.bind(this)
        this.description = this.description.bind(this)
        this.price = this.price.bind(this)
        this.brand = this.brand.bind(this)
        this.detail = this.detail.bind(this)
        this.handleClickNone = this.handleClickNone.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleModal() {
        document.getElementById('modalAdd').style.display = 'block'
    }

    handleClickNone() {
        this.setState({
            title: '',
            model: '',
            description: '',
            price: '',
            brand: '',
            detail: '',
        })
        document.getElementById('modalAdd').style.display = 'none'
    }

    title(e) {
        this.setState({ title: e.target.value })
    }

    model(e) {
        this.setState({ model: e.target.value })
    }

    description(e) {
        this.setState({ description: e.target.value })
    }

    price(e) {
        this.setState({ price: e.target.value })
    }

    brand(e) {
        this.setState({ brand: e.target.value })
    }

    detail(e) {
        this.setState({ detail: e.target.value })
    }

    onSubmit() {
        this.props.actions.addDataMc(this.state.title, this.state.model, this.state.description, this.state.price, this.state.brand, this.state.detail)
        this.setState({
            title: '',
            model: '',
            description: '',
            price: '',
            brand: '',
            detail: '',
        })
        document.getElementById('modalAdd').style.display = 'none'
    }

    render() {
        let cards = this.props.data.response.map((val, i) => {
            return (
                <Card
                    id={val.id}
                    title={val.title}
                    description={val.description}
                    key={i}
                />
            )
        })
        return (
            <div>
                <br />
                <div className="row">
                    <div className="col-md-1">
                        <h3>{this.props.model}</h3>
                    </div>
                    <div className="col-md-11" style={{ textAlign: "right", marginBottom: 10 + 'px', marginTop: 0 }}>
                        <button type="button" className="btn btn-danger" onClick={this.handleModal}>+ Add</button>
                    </div>
                </div>
                <div className="card-columns" style={{ columnCount: 4 }}>
                    {cards}
                </div>
                <div id="modalAdd" className="modal" >
                    <form className="modal-content animate">
                        <div style={{ margin: 20 }}>
                            <h1>Add Product</h1>
                            <br />
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" onChange={this.title} className="form-control" id="title" placeholder="Title" value={this.state.title} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="model">Model</label>
                                <select onChange={this.model} className="form-control" id="model" value={this.state.model}>
                                    <option value="">Select Model..</option>
                                    <option value="Cincin">Cincin</option>
                                    <option value="Kalung">Kalung</option>
                                    <option value="Liontin">Liontin</option>
                                    <option value="Anting">Anting</option>
                                    <option value="Gelang">Gelang</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input type="text" onChange={this.description} className="form-control" id="description" placeholder="Description" value={this.state.description} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input type="number" onChange={this.price} className="form-control" id="price" placeholder="Price" value={this.state.price} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="brand">Brand</label>
                                <input type="text" onChange={this.brand} className="form-control" id="brand" placeholder="Brand" value={this.state.brand} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="detail">Detail</label>
                                <textarea className="form-control" onChange={this.detail} rows='3' id="detail" placeholder="Detail" value={this.state.detail} />
                            </div>
                            <div className='row'>
                                <div className='col-md-6' style={{ textAlign: 'left' }}>
                                    <button type="button" onClick={this.onSubmit} className="btn btn-danger">Submit</button>
                                </div>
                                <div className='col-md-6' style={{ textAlign: 'right' }}>
                                    <button type="button" onClick={this.handleClickNone} className="btn btn-warning">Cancle</button>
                                </div>
                            </div>
                        </div>
                    </form>
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