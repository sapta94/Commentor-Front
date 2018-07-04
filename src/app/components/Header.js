import React from 'react'
import ReactDOM,{render} from "react-dom";
import '../css/main.css'



class Header extends React.Component{

    constructor(props){
        super(props)
    }
    render(){
        var image = this.props.imgUrl
        var mainText = this.props.mainText
        var subText = this.props.subText

        return(
            <div>
                <div className='header'>
                        <div className='layer'>
                            <p className="animated fadeInDown">Dev View</p>
                            <div className="divider">
                                <div className="separator">
                                
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}
export default Header