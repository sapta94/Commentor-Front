import React from "react";
import ReactDOM,{render} from "react-dom";
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import Comment from './components/Comment'

class App extends React.Component{
    render(){
        return (
            <div className="container">
                <Header />
                <Comment />
            </div>
        )
    }
}
render(<App />,window.document.getElementById('root'));