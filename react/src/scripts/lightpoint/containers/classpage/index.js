import React,{Component} from "react";
import {connect} from "react-redux";
import {class_page} from "../../actions";
import {change_page} from "../../actions";
import {hashHistory} from "react-router";
@connect(
    (state)=>({class_page:state.class_page})
)
export default class Classpage extends Component{
    componentWillMount(){
        var ename = this.props.params.ename; 
        const {dispatch} = this.props;
        dispatch(class_page("/"+ename,dispatch));
    }
    class_back=()=>{ 
        const {dispatch} = this.props;
        dispatch(change_page());
        this.props.router.goBack();
    }
    imgdetail(detail,sql,img){
        hashHistory.push("/detail/"+detail+"/"+sql+"?img="+img);
    }
    render(){
        const {class_page} = this.props;
        return(
            <div className="classpage">
                <div className="header">
                   <i className="iconfont icon-fanhui" onClick={()=>{this.class_back()}}></i>
                    <h2>{this.props.location.query.name}</h2>
                </div>
                <ul className="class_content">
                    {
                        class_page.map((item,index)=>{
                            return(
                                <li key={index} onClick={()=>this.imgdetail(this.props.params.ename+"1",this.props.params.ename,item.img)}><img src={item.wp}/></li>
                            )
                        })
                    }
                 </ul>
            </div>
        )
    }
}