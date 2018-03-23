import React,{Component} from "react";
import {connect} from "react-redux";
import {change_user,change_click,change_click1,change_click2,change_click3,change_p,change_p1} from "../../actions";
@connect(
    (state)=>({login:state.login,str:state.str,click:state.click,click1:state.click1,p:state.p})
)
export default class Mine extends Component{
    componentWillMount(){
        if(localStorage.users){
            const {dispatch} = this.props;
            dispatch(change_user(localStorage.users));
            dispatch(change_click());
            dispatch(change_click1());
            dispatch(change_p());
        }
    }
    shoucang=()=>{
        this.props.router.push("/shoucang");
    }
    login=()=>{
        this.props.router.push("/login");
    }
    tuichu=()=>{
        localStorage.users="";
        if(localStorage.users==""){
            const {dispatch} = this.props;
            dispatch(change_user(localStorage.users));
            dispatch(change_click2());
            dispatch(change_click3());
            dispatch(change_p1());
        }
    }
    render(){
        const {login,str,click,p,click1} = this.props;
        return(
            <div className="mine">
                <div className="head">
                    <img src={login}/>
                     <p onClick={()=>this.tuichu()}>{p}</p>
                     <h2>{str}</h2>
                    <div className={"login "+click} onClick={()=>{this.login()}}>登陆</div>
                    <div className={"login1 "+click1}>已登陆</div>
                </div>
                <div className="my_content">
                    <div className="collection" onClick={()=>{this.shoucang()}}><i className="iconfont icon-wodeshoucang-"></i><span>我的收藏</span></div>
                    <div className="fenjie"></div>
                    <ul>
                        <li><i className="iconfont icon-guanyu"></i><span>关于我们</span></li>
                    </ul>
                </div>
            </div>
        )
    }
}