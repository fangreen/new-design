import React,{Component} from "react";
import axios from "axios";
// axios.defaults.baseURL = "http://39.108.136.59:7000";
axios.defaults.baseURL="http://localhost:7000";
import {hashHistory} from "react-router";
import {connect} from "react-redux";
import {hot_picture} from "../../actions";
@connect(
    (state)=>({hot_paper:state.hot_paper})
)
export default class Recommend extends Component{
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(hot_picture("/hot",dispatch))
    }
    imgdetail(detail,hot,img){
        hashHistory.push("/detail/"+detail+"/"+hot+"?img="+img);
    }
    render(){
        const {hot_paper} = this.props;
        return(
            <div className="recommend">
                <ul className="re_content">
                    {
                        hot_paper.map((item,index)=>{
                            return(
                               
                                    <li key={index} onClick={()=>this.imgdetail("detail_hot","hot",item.img)}><img src={item.wq}/></li>
                            )
                        })
                    }
                 </ul>
            </div>
        )
    }
}