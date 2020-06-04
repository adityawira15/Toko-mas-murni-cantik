import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as AppActions from '../../actions'
import './form.css'
import request from 'superagent'
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirect: false,
            errormessage: ''
        }
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleErrorMessage = this.handleErrorMessage.bind(this)
        this.handleToken = this.handleToken.bind(this)
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    onSubmit() {
        request
            .post('http://localhost:3000/login')
            .send({
                email: this.state.email,
                password: this.state.password
            })
            .set('Accept', 'application/json')
            .end((err, val) => {
                let data = JSON.parse(val.text)
                if (err) {
                    console.log('error: ', err)
                } else {
                    if (data.token) {
                        localStorage.setItem('token', JSON.stringify({userid: data.user[0].id, token: data.token, username: data.user[0].firstname ? data.user[0].firstname : '' + ' ' + data.user[0].lastname ? data.user[0].lastname : '' }))
                        this.props.handleToken()
                        this.handleClickNone()
                        this.setState({ redirect: true, errormessage: false })
                    } else {
                        this.setState({errormessage: data.message})
                    }
                }
            })
    }

    handleToken(){
        let dataStorage = JSON.parse(localStorage.getItem('token'))
        request
        .post('http://localhost:3000/verifytoken')
        .send({token: dataStorage.token, userid: dataStorage.userid})
        .set('Accept', 'application/json')
        .end((err, val) => {
            console.log(val)
        })
    }

    handleClickNone() {
        document.getElementById('id01').style.display = 'none'
    }

    handleErrorMessage() {
        if (this.state.errormessage) {
            return (
                <div className="alert alert-warning">
                    <strong>Warning!</strong> {this.state.errormessage}
                </div>
            )
        }
    }

    render() {
        if (this.state.redirect) {
            this.setState({ redirect: false })
            return <Redirect to="/home" />
        }
        return (
            <div>
                <div className="imgcontainer">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTjWuKxVQMEvFb5bo7zGMF6MT1YK6EQdkKcCfs3QkTkPFDek2H" style={{ height: 125 + 'px', width: 125 + 'px' }} alt="Avatar" className="avatar" />
                </div>
                {this.handleErrorMessage()}
                <div className="container">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" onChange={this.onChangeEmail} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" onChange={this.onChangePassword} id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className='row'>
                        <div className='col-md-6' style={{ textAlign: 'left' }}>
                            <button type="button" onClick={this.onSubmit} className="btn btn-danger">Submit</button>
                        </div>
                        <div className='col-md-6' style={{ textAlign: 'right' }}>
                            <button type="button" onClick={this.handleClickNone} className="btn btn-warning">Cancel</button>
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
)(Login)