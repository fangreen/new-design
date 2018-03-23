import React,{Component} from "react";
import axios from "axios";
// axios.defaults.baseURL = "http://39.108.136.59:7000";
axios.defaults.baseURL="http://localhost:7000";
import {connect} from "react-redux";
import {recommend, detail} from "../../actions";
import {hashHistory} from "react-router";
@connect(
    (state)=>({re_paper:state.re_paper})
)
export default class Recommend extends Component{
  
    componentWillMount(){
       const {dispatch} = this.props;
       dispatch(recommend("/recommend",dispatch));
    }
    imgdetail(detail,recommend,img){
        hashHistory.push("/detail/"+detail+"/"+recommend+"?img="+img);
    }
    render(){
        const {re_paper} = this.props;
        return(
            <div className="recommend">
                <ul className="re_content">
                    {
                        re_paper.map((item,index)=>{
                            return(
                               
                                    <li key={index} onClick={()=>this.imgdetail("detail_re","recommend",item.img)}><img src={item.wp}/></li>
                            )
                        })
                    }
                 </ul>
            </div>
        )
    }
}