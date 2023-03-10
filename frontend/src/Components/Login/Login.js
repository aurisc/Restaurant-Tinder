import { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addToken, addUser} from '../../Redux/actionCreators'
import {baseUrl} from '../../Shared/baseUrl'
import axios from 'axios'
import "./login.css"




const mapDispatchToProps = (dispatch) => ({
    addToken: () =>  dispatch(addToken()),
    addUser: () => dispatch(addUser()) 
});

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    

    handleLogin = async () => {
        const data = { username: this.state.username, password: this.state.password };
        try
        {
            const userWithToken = await axios.post(baseUrl + '/login', data)
            await this.props.dispatch(addToken(userWithToken.data.token)) 
            await this.props.dispatch(addUser(userWithToken.data.user));
        }
        catch(error)
        {
            alert("Password or Username is incorrect")
        }
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div className='Base'>
                <div className="header">Login</div>
                    <div className="content">
                        <div className="form">
                            <div className = 'form-group'>
                                <label class="sr-only">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        class="form-control"
                                        placeholder="Username"
                                        v-model="user.username"
                                        onChange={this.handleInputChange}
                                        required
                                    />
                            </div>
                            <div className = 'form-group'> 
                                <label class="sr-only">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        class="form-control"
                                        placeholder="Password"
                                        v-model="user.password"
                                        onChange={this.handleInputChange}
                                        required
                                    />
                            </div>
                        </div>
                    </div>
                <div className='SubmitButton'>
                    <button type="submit" onClick={this.handleLogin}>Sign in</button>
                    <Link to="/register">Need an account?</Link>
                </div>
                
                
            </div>
        )
    }
}

export default withRouter(connect(mapDispatchToProps)(Login));