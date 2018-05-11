import React, { Component } from 'react'
import './form.css'

export default class Login extends Component {
    handleClickNone() {
        document.getElementById('id01').style.display = 'none'
    }

    render() {
        return (
            <div>
                <div className="imgcontainer">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTjWuKxVQMEvFb5bo7zGMF6MT1YK6EQdkKcCfs3QkTkPFDek2H" style={{ height: 125 + 'px', width: 125 + 'px' }} alt="Avatar" className="avatar" />
                </div>
                <div className="container">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className='row'>
                        <div className='col-md-6' style={{ textAlign: 'left' }}>
                            <button type="submit" className="btn btn-danger">Submit</button>
                        </div>
                        <div className='col-md-6' style={{ textAlign: 'right' }}>
                            <button type="button" onClick={this.handleClickNone} className="btn btn-warning">Cancle</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}