import React from "react";
import ReactDOM,{render} from "react-dom";
import Header from './components/Header'
import LoginForm from './components/LoginForm'

class App extends React.Component{
    render(){
        return (
            <div>
                <Header />
                <LoginForm />
            </div>
        )
    }
}
render(<App />,window.document.getElementById('root'));