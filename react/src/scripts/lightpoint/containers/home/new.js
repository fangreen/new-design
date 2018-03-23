import React,{Component} from "react";
import axios from "axios";
// axios.defaults.baseURL = "http://39.108.136.59:7000";
axios.defaults.baseURL="http://localhost:7000";

import {hashHistory} from "react-router";
import {connect} from "react-redux";
import {new_picture} from "../../actions";
@connect(
    (state)=>({paper:state.paper})
)
export default class Recommend extends Component{
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(new_picture("/new",dispatch))
    }
    imgdetail(detail,paper,img){
        hashHistory.push("/detail/"+detail+"/"+paper+"?img="+img);
    }
    render(){
        const {paper} = this.props;
        return(
            <div className="recommend">
                <ul className="re_content">
                    {
                        paper.map((item,index)=>{
                            if(index>paper.length-22){
                                return(
                               
                                    <li key={index} onClick={()=>this.imgdetail("detail_new","paper",item.img)}><img src={item.wq}/></li>
                              )
                            }
                        })
                    }
                 </ul>
            </div>
        )
    }
}