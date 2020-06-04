import React, { Component } from 'react'
import request from 'superagent'
import Cards from '../cards'
import Login from '../form/login'
import Register from '../form/register'
import Pagination from '../pagination'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../../actions'
import { Redirect } from 'react-router-dom'
import './home.css'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transform: '',
            transformnav: '',
            heightnavbar: 0,
            navlink: 'Cincin',
            offset: 0,
            offsetarray: [],
            form: 'login',
            logout: false
        }
        this.handleScroll = this.handleScroll.bind(this)
        this.navlink = this.navlink.bind(this)
        this.setToLogin = this.setToLogin.bind(this)
        this.setToRegister = this.setToRegister.bind(this)
        this.formLoginorRegister = this.formLoginorRegister.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleToken = this.handleToken.bind(this)
    }

    componentDidMount() {
        let heightNavbar = document.getElementById('navbar')
        let sticky = heightNavbar.offsetTop
        this.setState({ heightnavbar: sticky })
        window.addEventListener('scroll', this.handleScroll);
        this.props.actions.loadDataMc(this.state.navlink, this.state.offset)
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

    handleClick() {
        document.getElementById('id01').style.display = 'block'
    }

    handleLogout() {
        let dataStorage = JSON.parse(localStorage.getItem('token'))
        request
            .get(`http://localhost:3000/logout?id=${dataStorage.userid}`)
            .set('Accept', 'application/json')
            .end((err, val) => {
                if (err) {
                    console.log(err)
                } else {
                    localStorage.clear()
                    this.setState({ logout: true })
                }
            })
    }

    navlink(select) {
        this.setState({ navlink: select })
        this.props.actions.loadDataMc(select, this.state.offset)
    }

    setToLogin() {
        this.setState({ form: 'login' })
    }

    setToRegister() {
        this.setState({ form: 'register' })
    }

    formLoginorRegister() {
        if (this.state.form === 'login') {
            return <Login handleToken={this.handleToken} />
        } else if (this.state.form === 'register') {
            return <Register />
        }
    }

    avatarProfile() {
        let data = JSON.parse(localStorage.getItem('token'))
        if (localStorage.getItem('token')) {
            return (
                <div className="imgcontainer">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTjWuKxVQMEvFb5bo7zGMF6MT1YK6EQdkKcCfs3QkTkPFDek2H" style={{ height: 75 + 'px', width: 75 + 'px' }} alt="Avatar" className="avatar" />
                    <h6>{data.username}</h6>
                </div>
            )
        } else {
            return
        }
    }

    buttonLoginOrLogout() {
        if (localStorage.getItem('token')) {
            return <button onClick={this.handleLogout} className="btn btn-outline-warning my-2 my-sm-0">Logout</button>
        } else {
            return <button onClick={this.handleClick} className="btn btn-outline-warning my-2 my-sm-0">Login</button>
        }
    }

    handleToken() {
        let dataStorage = JSON.parse(localStorage.getItem('token'))
        if (dataStorage) {
            request
                .post('http://localhost:3000/verifytoken')
                .send({ token: dataStorage.token, userid: dataStorage.userid })
                .set('Accept', 'application/json')
                .end((err, val) => {
                    console.log(val)
                })
        } else {
            console.log(dataStorage)
        }
    }

    render() {
        if (this.state.logout) {
            this.setState({ logout: false })
            return <Redirect to="/home" />
        }
        return (
            <div>
                <nav id="navbar" className="navbar navbar-dark bg-danger">
                    <a className="navbar-brand" href="">
                        <img src="https://cdn.shopify.com/s/files/1/1425/9340/products/wedding-rings-ideas-4_1024x1024.png?v=1506792254" width="100" height="100" alt="" />
                    </a>
                    <div className="header">
                        <h4>Toko Mas</h4>
                        <h1>Murni Cantik</h1>
                    </div>
                    {this.buttonLoginOrLogout()}
                </nav>
                <div id="id01" className="modal">
                    <form className="modal-content animate" >
                        <div className="row" style={{ marginTop: 15 + 'px', marginLeft: 5 + 'px', marginRight: 5 + 'px' }}>
                            <div className="col-md-6" style={{ textAlign: 'center' }}>
                                <button type="button" onClick={this.setToLogin} className="btn btn-success btn-lg btn3d" style={{ width: 95 + '%' }}>Login</button>
                            </div>
                            <div className="col-md-6" style={{ textAlign: 'center' }}>
                                <button type="button" onClick={this.setToRegister} className="btn btn-info btn-lg btn3d" style={{ width: 95 + '%' }} >Register</button>
                            </div>
                        </div>
                        {this.formLoginorRegister()}
                    </form>
                </div>
                <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
                    <div style={{ backgroundColor: '#f1f1f1' }} className="col-md-2">
                        <div className="nav flex-column nav-pills" aria-orientation="vertical" style={{ height: 515 + 'px' }}>
                            {this.avatarProfile()}
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
                        <Cards model={this.state.navlink} />
                        <br />
                        <br />
                        <Pagination page={this.state.offsetarray} model={this.state.navlink} />
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