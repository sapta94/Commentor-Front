import React from 'react'
import ReactDOM,{render} from "react-dom";
import '../css/main.css'
import axios from 'axios'
import qs from 'qs'

class LoginForm extends React.Component{
    constructor(props){
        super(props)

        this.state={
            loginForm:{
                'email':'',
                'password':''
            },
            registerForm:{
                'firstName':'',
                'middleName':'',
                'lastName':'',
                'email':'',
                'password':'',
                'confirmPass':''
            },
            registering:false,
            loging:false,
            show:'register'
        }
        this.onChange = this.onChange.bind(this)
        this.onLoginChange = this.onLoginChange.bind(this)
        this.registerSubmit = this.registerSubmit.bind(this)
        this.changeView = this.changeView.bind(this)
    }

    componentWillMount(){
        
    }

    onChange(e){
        var id=e.target.name;
        var val=e.target.value;
        console.log(id+'-'+val)
        var formData = this.state.registerForm;
        formData[id]=val;
        this.setState({
            registerForm:formData
        })
    }

    onLoginChange(e){
        var id=e.target.name;
        var val=e.target.value;
        console.log(id+'-'+val)
        var formData = this.state.loginForm;
        formData[id]=val;
        this.setState({
            loginForm:formData
        })
    }
    changeView(e,type){
        this.setState({
            show:type
        })
    }
    registerSubmit(){

        this.setState({
            registering:true
        })
        var data=this.state.registerForm;
        var that=this

        if(data.confirmPass!=data.password){
            alert("passwords don't match")
            return
        }
        if(data.email==''||data.password==''||data.firstName==''||data.lastName==''){
            alert('Please fill all required fields!')
            return
        }

        axios({
            method: 'POST',
            url: 'http://commentor.test/api/users/register',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify( {
                firstname:data.firstName,
                middlename:data.middleName,
                lastname:data.lastName,
                email:data.email,
                password:data.password
            }),
          }).then(function(resp){
              console.log(resp)
              if(resp.status==201){
                  alert('Successfully Created')
              }
              that.setState({
                  show:'login',
                  registering:false
              })
          }).catch(function(err){
              console.log(err)
          });
    }

    submitLogin(){

        this.setState({
            loging:true
        })
        var data=this.state.loginForm;
        var that=this

        console.log(data)

        if(data.email==''||data.password==''){
            alert('Please fill all required fields!')
            return
        }

        axios({
            method: 'POST',
            url: 'http://commentor.test/api/users/login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify( {
                email:data.email,
                password:data.password
            }),
          }).then(function(resp){
              console.log(resp)
              if(resp.data.response=='success'){
                  alert('Successfully Logged In')
                  var obj = resp.data.data
                  sessionStorage.setItem('userID', obj[0].id);
                  sessionStorage.setItem('userName', obj[0].firstname);
                  sessionStorage.setItem('userLastname', obj[0].lastname);
                  window.location.href="/comments"
              }
              else{
                alert('Wrong Password or no user!')
              }
              that.setState({
                  show:'login',
                  loging:false,
              })
          }).catch(function(err){
              console.log(err)
          });
    }

    

    render(){
        var regData=this.state.registerForm;
        var loginData=this.state.loginForm;
        var that=this

        if(this.state.loging){
            var loginText=<span>Logging in..<i className="fa fa-spinner fa-spin" style={{fontSize:"36px"}}></i> </span>
            var loginDisabled=true
        }
        else{
            var loginText=<span>Log In</span>
            var loginDisabled=false
        }
        if(this.state.show=='register'){
            var signActive='active'
            var regActive=''
            var signDisplay='block'
            var regDisplay='none'
        }
        else{
            var signActive=''
            var regActive='active'
            var signDisplay='none'
            var regDisplay='block'
        }
        return(
            <div className="form">
      
            <ul className="tab-group">
                <li className={"tab "+signActive}><a href="#signup" onClick={(e)=>that.changeView(e,'register')}>Sign Up</a></li>
                <li className={"tab "+regActive}><a href="#login" onClick={(e)=>that.changeView(e,'login')}>Log In</a></li>
            </ul>
            
            
            <div className="tab-content">
                <div id="signup" style={{display:signDisplay}}>   
                <h1>Sign Up for Free</h1>
                
                <div className="top-row">
                    <div className="field-wrap">
                    <input placeholder="First Name *" onChange={(e)=>{that.onChange(e)}} type="text" value={regData.firstName} required autocomplete="off" name="firstName" />
                    </div>
                
                    <div className="field-wrap">
                    
                    <input placeholder="Last Name *" onChange={(e)=>{that.onChange(e)}} name="lastName" value={regData.LastName} type="text"required autocomplete="off"/>
                    </div>
                </div>

                <div className="field-wrap">
                    <input placeholder="Email*" onChange={(e)=>{that.onChange(e)}} name="email" value={regData.email} type="email"required autocomplete="off"/>
                </div>
                
                <div className="field-wrap">
                    <input placeholder="Password *" onChange={(e)=>{that.onChange(e)}} value={regData.password} name="password" type="password"required autocomplete="off"/>
                </div>

                <div className="field-wrap">
                    
                    <input placeholder="Confirm Password *" onChange={(e)=>{that.onChange(e)}} value={regData.confirmPass} name="confirmPass" type="password"required autocomplete="off"/>
                </div>
                
                <button onClick={()=>that.registerSubmit()} className="button button-block">Sign Up</button>
                
                

                </div>
                
                <div id="login" style={{display:regDisplay}}>   
                    <h1>Welcome Back!</h1>
                        <div className="field-wrap">
                        <input placeholder="Email *" value={loginData.email} onChange={(e)=>that.onLoginChange(e)} type="email"required autocomplete="off" name="email"/>
                    </div>
                    
                    <div className="field-wrap">
                        <input placeholder="Password *" value={loginData.password} onChange={(e)=>that.onLoginChange(e)} type="password"required autocomplete="off" name="password"/>
                    </div>
                    
                    <button onClick={()=>that.submitLogin()} className="button button-block">{loginText}</button>

                </div>
                
            </div>
            
        </div>
        )
    }
}

export default LoginForm