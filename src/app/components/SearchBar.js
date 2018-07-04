import React from 'react'
import ReactDOM,{render} from "react-dom";
import axios from 'axios'
import Results from './Results'

class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.state={
            formData:{
                'name':'',
                'loc':'',
                'repo':'',
                'lang':'',
                'commit':''
            },
            isSearching:false,
            userData:[],
            retained:[]
        }
        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
        this.retainData=this.retainData.bind(this)
    }

    retainData(arr){
        this.setState({
            retained:arr
        })
    }
    onChange(e){
        var id=e.target.name;
        var val=e.target.value;
        console.log(id+'-'+val)
        var formData = this.state.formData;
        formData[id]=val;
        this.setState({
            formData:formData
        })
    }

    onSubmit(){
        this.setState({
            isSearching:true
        })
        var that=this
        var formData = this.state.formData;
        var url="https://api.github.com/search/users?q="
        if(formData.name!=''){
            url+=formData.name
        }
        if(formData.loc!=''){
            url+="+location:"+formData.loc
        }
        if(formData.repo!=''){
            url+="+repos:"+formData.repo
        }
        if(formData.lang!=''){
            url+="+language:"+formData.lang
        }
        if(formData.commit!=''){
            url+="+commits:"+formData.commit
        }

        axios.get(url)
        .then(function (response) {
            console.log('now this is printed')
            console.log(that.state.retained);
            var retain=that.state.retained
            that.setState({
                isSearching:false,
                userData:retain.concat(response.data.items)
            })
            window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
        })
        .catch(function (error) {
            console.log(error);
            alert('Cannot perform search')
            this.setState({
                isSearching:false
            })
        });
        console.log('here')
    }

    render(){
        var data=this.state.formData;
        var resData=this.state.userData;
        var that=this;
        if(this.state.isSearching){
            var button=<button type="button" disabled onClick={that.onSubmit} className="btn btn-primary">Searching <i className="fa fa-spinner fa-spin" style={{fontSize:'24px'}}> </i></button>
        }
        else{
            var button=<button type="button" onClick={that.onSubmit} className="btn btn-primary">Search</button>
        }
        if(resData.length>0){
            var results = <Results retainData={this.retainData} result={resData}/>
        }
        else{
            var results='';
        }
        return(
            <div className="container-fluid">
                <div className="searchHead">
                    <p>-Search Here-</p>
                </div>
                <div className="row justify-content-md-center">
                <div className="form-group col-md-8">
                    <label for="name">Name:</label>
                    <input type="text" onChange={(e)=>{that.onChange(e)}} value={data.name} class="form-control" name="name"/>
                </div>
                <div className="form-group col-md-8">
                    <label for="loc">Location:</label>
                    <input type="text" onChange={(e)=>{that.onChange(e)}} value={data.loc} class="form-control" name="loc"/>
                </div>
                <div className="form-group col-md-8">
                    <label for="repo">Repositories:</label>
                    <input type="text" onChange={(e)=>{that.onChange(e)}} value={data.repo} class="form-control" name="repo"/>
                </div>
                <div className="form-group col-md-8">
                    <label for="lang">Language:</label>
                    <input type="text" onChange={(e)=>{that.onChange(e)}} value={data.lang} class="form-control" name="lang"/>
                </div>
                <div className="form-group col-md-8">
                    <label for="commit">Commits:</label>
                    <input type="text" onChange={(e)=>{that.onChange(e)}} value={data.commit} class="form-control" name="commit"/>
                </div>
                </div>
                <center>{button}</center>
                <br/>
                {results}
            </div>
        )
    }
}

export default SearchBar