import React from 'react'
import ReactDOM,{render} from "react-dom";
import axios from 'axios'
import Modal from 'react-awesome-modal';

class Results extends React.Component{
    constructor(props){
        super(props)
        this.state={
            modal:false,
            moreDetails:false,
            moreData:{

            },
            compareData:[],
            compareResponse:[],
            display:'none',
            compareDisplay:false,
            compareModal:false
        }
        this.getDetails=this.getDetails.bind(this)
        this.closeModal=this.closeModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.compareData = this.compareData.bind(this)
    }
    getDetails(url){
        var that=this
        that.setState({
            moreDetails:true,
            modal:true
        })
        axios.get(url).then(function(response){
            that.setState({
                moreData:response.data,
                modal:true,
                moreDetails:false
            })
        })
    }


    handleChange(e,item){
        console.log(e.target.checked)
        var arr=this.state.compareData
        if(e.target.checked){
            arr.push(item)
        }
        else{
            arr.forEach(function(anItem,index){
                if(anItem.login==item.login){
                    arr.splice(index,1)
                }
            })
        }
        console.log(arr)
        this.setState({
            compareData:arr
        })
        this.props.retainData(arr)
    }
    closeModal(){
        this.setState({
            modal:false,
            compareModal:false
        })
    }

    compareData(){
        var that=this;
        that.setState({
            compareDisplay:true,
            display:''
        })
        var compare=this.state.compareData;
        var compareResponse=that.state.compareResponse;
        compare.forEach(function(anItem,index){
            axios.get(anItem.url).then(function(response){
                compareResponse.push(response.data)
                if(index==compare.length-1){
                    that.setState({
                        compareResponse:compareResponse,
                        compareDisplay:false,
                        display:'none',
                        compareModal:true
                    })
                }
            })
        })
    }
    render(){
        var data=this.props.result
        var that=this;
        if(this.state.modal){
            var modalView=<Details visible={that.state.modal} data={this.state.moreData} closeModal={that.closeModal}/>
        }
        else{
            var modalView=""
        }

        if(this.state.compareModal){
            var compareView = <CompareView visible={that.state.compareModal} data={this.state.compareResponse} closeModal={that.closeModal}/>
        }
        else{
            var compareView=""
        }
        
        return(
            <div style={{backgroundColor:'#d6dd9d'}}>
                <div className="searchHead">
                    <p>-Results Here-</p>
                </div>
            <div className="row">
            {
                data.map(function(item,index){
                    if(that.state.moreDetails){
                        var detailView=<span><a href="javascript:void(0);" onClick={()=>that.getDetails(item.url)}  className="card-link"></a><i className="fa fa-spinner fa-spin" style={{fontSize:'24px'}}></i></span>
                    }
                    else{
                        var detailView=<a href="javascript:void(0);" onClick={()=>that.getDetails(item.url)}  className="card-link">More details</a>
                    }
                    return(
                        <div className="card col-md-3 resultCards">
                        <img className="card-img-top" src={item.avatar_url} alt="Card image cap"/>
                        <div className="card-body">
                            <p className="card-text"><b>GITHUB ID: </b>{item.login} </p>
                            <p className="card-text"><b>Score: </b>{item.score} </p>
                            <p>Add to Compare <input onChange={(e)=>that.handleChange(e,item)} type="checkbox" className=""/></p>
                            <a href={item.html_url} target="_blank" className="card-link">View Profile</a>
                            <a href="javascript:void(0);" onClick={()=>that.getDetails(item.url)}  className="card-link">More details</a>
                            
                        </div>
                        </div>
                    )
                })
            }

            </div>
                {modalView}
                {compareView}
                <center><button type="button" disabled={this.state.compareDisplay} onClick={() => this.compareData()} class="btn btn-primary">Compare<i  className="fa fa-spinner fa-spin" style={{fontSize:'24px',display:this.state.display}}></i></button></center>
            </div>
        )
    }
}

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : this.props.visible
        }
    }
 
    openModal() {
        this.setState({
            visible : this.props.visible
        });
    }
 
    closeModal() {
        this.setState({
            visible : false
        });
    }
 
    render() {
        var data=this.props.data
        console.log(this.props.data)
        if(data.login==undefined){
            return (
                <Modal visible={true} width="600" height="500" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <center><h1><i>Loading</i></h1></center>
                        <center><img src="../extra/animated_spinner.gif" height="200" weight="200"/></center>
                        <center><button type="button" onClick={() => this.props.closeModal()} class="btn btn-primary">Close</button></center>
                    </div>
                </Modal>
            )
        }
        return (
            
                <Modal visible={true} width="600" height="500" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <center><h1><i>Details:</i></h1></center>
                        <table class="table table-bordered">
                            <tr>
                                <th>Name:</th>
                                <td>{(data.name||data.login)}</td>
                            </tr>
                            <tr>
                                <th>Bio:</th>
                                <td>{data.bio||'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Company:</th>
                                <td>{data.company||'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>{data.email||'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Location:</th>
                                <td>{data.location}</td>
                            </tr>
                            <tr>
                                <th>Followers:</th>
                                <td>{data.followers}</td>
                            </tr>
                            <tr>
                                <th>Following:</th>
                                <td>{data.following}</td>
                            </tr>
                        </table>
                        {/* <h1>Details</h1>
                        <p>Name: {data.name}</p>
                        <p>Bio: {data.bio}</p>
                        <p>Company: {data.company}</p>
                        <p>Email: {data.email}</p>
                        <p>Location: {data.location}</p>
                        <p>Followers: {data.followers}</p>
                        <p>Following: {data.following}</p> */}
                        <center><button type="button" onClick={() => this.props.closeModal()} class="btn btn-primary">Close</button></center>
                    </div>
                </Modal>
            
        );
    }
}

class CompareView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : this.props.visible
        }
    }
 
    openModal() {
        this.setState({
            visible : this.props.visible
        });
    }
 
    closeModal() {
        this.setState({
            visible : false
        });
    }
 
    render() {
        var data=this.props.data
        console.log('data is')
        console.log(this.props.data)
        return (
            
                <Modal visible={true} width="90%" height="500" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <center><h1><i>Details:</i></h1></center>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name:</th>
                                    <th>Bio:</th>
                                    <th>Company:</th>
                                    <th>Email:</th>
                                    <th>Location:</th>
                                    <th>Followers:</th>
                                    <th>Following:</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                data.map(function(item,index){
                                    return(
                                    <tr key={index}>
                                        <td>{item.name||'N/A'}</td>
                                        <td>{item.bio||'N/A'}</td>
                                        <td>{item.company||'N/A'}</td>
                                        <td>{item.email||'N/A'}</td>
                                        <td>{item.location}</td>
                                        <td>{item.followers}</td>
                                        <td>{item.following}</td>
                                    </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        <center><button type="button" onClick={() => this.props.closeModal()} class="btn btn-primary">Close</button></center>
                    </div>
                </Modal>
            
        );
    }
}

export default Results