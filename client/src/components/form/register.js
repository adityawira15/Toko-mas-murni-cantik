import React, { Component } from 'react'

export default class Register extends Component {
    handleClickNone() {
        document.getElementById('id01').style.display = 'none'
    }
    
    render() {
        return (
            <div>
                <div className="container">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword2">Retype Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Retype Password" />
                    </div>
                    <div className='row'>
                        <div className='col-md-6' style={{ textAlign: 'left' }}>
                            <button type="submit" className="btn btn-danger">Submit</button>
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