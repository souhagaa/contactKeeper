import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'

const Login = (props) => {
     const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)

    const { setAlert } = alertContext
    const { loginUser, error, clearErrors, isAuthenticated } = authContext

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/') //redirect to the home page if user authenticated
        }
        if(error === 'Invalid Credentials') { // better to have an id for the errors for larger apps
            setAlert(error, 'danger')
            clearErrors()
        }
        // eslint-disable-next-line
    }, [error, props.history, isAuthenticated])

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { email, password } = user;

    const onChange = e => {
        setUser({ ...user, [e.target.name] : e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        if(email === '' || password === '') {
            setAlert('Please fill in all the fiels', 'danger')
        } else {
            loginUser({
                email,
                password
            })
        }
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary"> Login </span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={onChange} 
                        required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={onChange}
                        required/>
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>

            </form>
        </div>
    )
}

export default Login
