import React from 'react'
import ReactDOM,{render} from "react-dom";
import '../css/main.css'
import axios from 'axios'


class Comment extends React.Component{
    constructor(props){
        super(props)

        this.state={
            allComments:[],
            fetching:false,
            content:''
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(e){
        var val = e.target.value;
        this.setState({
            content:val
        })
    }

    // componentDidMount(){

    // }
    // getAllComments(){
    //     axios.get('')
    // }

    render(){
        var commentData=this.state.allComments;
        var that=this;
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
                        <button style={{float:'right'}} type="button" class="btn btn-success">Post</button>
                    </div>
                    </div>
            </div>
        )
    }
}
export default Comment