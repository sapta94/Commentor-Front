import React from 'react'
import ReactDOM,{render} from "react-dom";
import '../css/main.css'
import axios from 'axios'


class Header extends React.Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.callAPI();
    }

    callAPI(){
        axios.get('http://commentor.test/api/comment').then(function(response){
            console.log(response)
        })
    }
    render(){
        var image = this.props.imgUrl
        var mainText = this.props.mainText
        var subText = this.props.subText

        return(
            <div className="">
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">Commentor</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Comments</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Logout</a>
                        </li>
                        </ul>
                    </div>
                    </nav>
            </div>
        )
    }
}
export default Header