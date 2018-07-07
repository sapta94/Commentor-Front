import React,{Component} from 'react'
import {BrowserRouter,Route} from 'react-router-dom'


import Header from './Header'
import LoginForm from './LoginForm'
import Comment from './Comment'
class App extends Component{
    componentDidMount(){
       
    }

    render() {
        return(
            <div className="container">
            <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={LoginForm} />
                        <Route exact path="/comments" component={Comment} />
                        <Route exact path="/register" component={LoginForm} />
                    </div>
            </BrowserRouter>
            </div>
        )
    }
}

export default App