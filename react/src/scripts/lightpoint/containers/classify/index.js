import React,{Component} from "react";
import {connect} from "react-redux";
import {classify} from "../../actions";
@connect(
    (state)=>({classify:state.classify})
)
export default class Classify extends Component{
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(classify("/classify",dispatch));
    }
    changeClass=(ename,name)=>{
        this.props.router.push("/classpage/"+ename+"?name="+name)
    }
    search=()=>{
        this.props.router.push("/search");
    }
    render(){
        const {classify} = this.props;
        return(
            <div className="classify">
                <div className="header">
                    <input type="text" className="iconfont" placeholder="&#xe604; 输入关键字" onClick={()=>{this.search()}}/>
                </div>
                <div className="cla_content">
                {
                    classify.map((item,index)=>{
                        return(
                            <dl key={index}>
                                <dt onClick={()=>{this.changeClass(item.ename,item.name)}}><img src={item.cover}/></dt>
                                <dd>{item.name}</dd>
                            </dl>
                        )
                    })
                }
                    
                </div>
            </div>
        )
    }
}