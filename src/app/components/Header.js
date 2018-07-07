import React from 'react'
import ReactDOM,{render} from "react-dom";
import '../css/main.css'
import axios from 'axios'
import {Link} from 'react-router-dom'


class Header extends React.Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.callAPI();
    }

    onLogout(){
        sessionStorage.setItem('userID',null);
        sessionStorage.setItem('userName', null);
        sessionStorage.setItem('userLastname', null);
        window.location.href="/register"
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
        var userID=sessionStorage.getItem('userID')
        var that=this;
        console.log(userID)

        if(userID==null||userID==undefined||userID=='null'){
            return(
                <div className="">
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a class="navbar-brand" href="#">Commentor</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                            </ul>
                        </div>
                        </nav>
                </div>
            )
            
        }
        else{
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
                                <Link className="nav-link" to='/comments'>Comments</Link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" onClick={()=>that.onLogout()} href="javascript:void(0)">Logout</a>
                            </li>
                            </ul>
                        </div>
                        </nav>
                </div>
            )
        }

        
    }
}
export default Header