import React from 'react'
import ReactDOM,{render} from "react-dom";
import '../css/main.css'
import axios from 'axios'
import qs from 'qs'


class Comment extends React.Component{
    constructor(props){
        super(props)

        this.state={
            allComments:[],
            fetching:false,
            content:'',
            currentUserID:null,
            posting:false,
            votes:[]
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.voteSubmit = this.voteSubmit.bind(this)
        this.getVoteDetails = this.getVoteDetails.bind(this)
    }

    componentWillMount(){
        var userID=sessionStorage.getItem('userID')
        console.log('user is '+userID)
        if(userID==null||userID=='null'){
            window.location.href="/register"
        }
        this.getVoteDetails();
    }

    getVoteDetails(){
        var userID=sessionStorage.getItem('userID')
        axios.get('https://commentor-api.herokuapp.com/api/vote/'+userID).then((resp)=>{
            this.setState({
                votes:resp.data.data
            })
        })
    }
    voteSubmit(type,commentID,posterID){
        var userID=sessionStorage.getItem('userID')
        var voteData = this.state.votes||[];
        console.log(posterID+' '+userID)
        if(posterID==userID){
            alert('You cannot vote your own comment!')
            return
        }
        var that=this;
        var flag=0;
        voteData.forEach(function(item,index){
            if(item.commentID==commentID && item.userID==userID && item.type==type){
                flag=1;
            }
        })
        if(flag==1){
            alert('You have already '+type+'ed this comment!')
            return
        }
        axios({
            method: 'POST',
            url: 'https://commentor-api.herokuapp.com/api/comment/update',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify( {
                type:type,
                commentID:commentID,
                userID:userID
            }),
          }).then(function(resp){
              that.setState({
                  content:''
              })
              if(resp.status==200){
                  that.getAllComments();
                  this.getVoteDetails();
              }
          }).catch(function(err){
            alert('some error occured')
        })
    }
    onChange(e){
        var val = e.target.value;
        this.setState({
            content:val
        })
    }

    onSubmit(){
        var content = this.state.content;
        var that=this;

        this.setState({
            posting:true
        })

        if(content==null||content==''){
            alert('Enter a content')
            return
        }

        axios({
            method: 'POST',
            url: 'https://commentor-api.herokuapp.com/api/comment',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify( {
                userID:sessionStorage.getItem('userID'),
                content:content
            }),
          }).then(function(resp){
              that.setState({
                  content:'',
                  posting:false
              })
              if(resp.status==201){
                  that.getAllComments();
              }
          }).catch(function(err){
            alert('some error occured')
        })
    }

    componentDidMount(){
        this.getAllComments();
    }
    getAllComments(){
        var that=this
        axios.get('https://commentor-api.herokuapp.com/api/comment').then(function(response){
            that.setState({
                allComments:response.data.data
            })
        })
    }

    render(){
        var commentData=this.state.allComments;
        if(commentData==undefined){
            commentData=[]
        }
        var that=this;

        if(this.state.posting){
            var postBtn=<button style={{float:'right'}} disabled={true} onClick={()=>that.onSubmit()} type="button" class="btn btn-success">Posting..</button>
        }else{
            var postBtn=<button style={{float:'right'}} onClick={()=>that.onSubmit()} type="button" class="btn btn-success">Post</button>
        }
        return(
            <div>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Sample Post</h5>
                        <p class="card-text">This is a post to test comments. Please put a comment below.</p>
                        <p class="card-text"><small class="text-muted">Added 1 day ago</small></p>
                        <div class="form-group">
                            <textarea placeholder="Type a comment.." className="form-control" onChange={(e)=>that.onChange(e)} value={that.state.content} id="formControlTextarea1" rows="3" name="content"></textarea>
                        </div>
                        {postBtn}
                    </div>
                </div>
                    <div class="card">
                        <div class="card-body">
                            {
                                commentData.map(function(item,index){
                                    return(
                                        <span>
                                            <h5 class="card-title">{item.firstname+' '+item.Lastname}</h5><span></span>
                                            <p class="card-text">{item.content} <span style={{float:'right'}}><i onClick={()=>that.voteSubmit('upvote',item.commentID,item.userID)} class="fa fa-thumbs-o-up" style={{fontSize:"24px",color:"green",cursor:'pointer'}}></i>{' '+item.upvotes+' Upvotes'}<br/><i onClick={()=>that.voteSubmit('downvote',item.commentID,item.userID)} class="fa fa-thumbs-o-down" style={{fontSize:"24px",color:"red",cursor:'pointer'}}></i>{' '+item.downvotes+' Downvotes'}</span></p>
                                            <br/>
                                            <hr/>
                                        </span>
                                    )
                                    
                                })
                            }
                            
                        </div>
                    </div>
                
            </div>
        )
    }
}
export default Comment