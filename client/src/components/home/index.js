import React, { Component } from 'react'
import Cincin from '../../modelscomponent/cincin'
import Pagination from '../pagination'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../../actions'
import './home.css'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transform: '',
            transformnav: '',
            heightnavbar: 0,
            navlink: 'Cincin',
        }
        this.handleScroll = this.handleScroll.bind(this)
        this.navlink = this.navlink.bind(this)
    }

    componentDidMount() {
        let heightNavbar = document.getElementById('navbar')
        let sticky = heightNavbar.offsetTop
        this.setState({ heightnavbar: sticky })
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        if (window.pageYOffset >= this.state.heightnavbar) {

            this.setState({ transform: 'sticky', transformnav: 'sticky-nav' })
        } else {
            this.setState({ transform: '' })
        }
    }

    navlink(select) {
        this.setState({ navlink: select })
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
                <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
                    <div style={{ backgroundColor: '#f1f1f1' }} className="col-md-2">
                        <div className="nav flex-column nav-pills" aria-orientation="vertical" style={{ height: 515 + 'px' }}>
                            <div style={{ margin: '10px 20px 30px 5px' }}>
                                <input className="form-control" type="search" placeholder="Search" />
                            </div>
                            <h4 style={{ paddingLeft: 5 + 'px' }}>Models</h4>
                            <a className={this.state.navlink === "Cincin" ? "nav-link active bg-danger" : "nav-link"} onClick={() => this.navlink('Cincin')} >Cincin</a>
                            <a className={this.state.navlink === "Kalung" ? "nav-link active bg-danger" : "nav-link"} onClick={() => this.navlink('Kalung')} >Kalung</a>
                            <a className={this.state.navlink === "Liontin" ? "nav-link active bg-danger" : "nav-link"} onClick={() => this.navlink('Liontin')} >Liontin</a>
                            <a className={this.state.navlink === "Anting" ? "nav-link active bg-danger" : "nav-link"} onClick={() => this.navlink('Anting')} >Anting</a>
                            <a className={this.state.navlink === "Gelang" ? "nav-link active bg-danger" : "nav-link"} onClick={() => this.navlink('Gelang')} >Gelang</a>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <Cincin />
                        <br />
                        <br />
                        <Pagination />
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
)(Home)