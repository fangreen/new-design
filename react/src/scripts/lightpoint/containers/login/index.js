import React,{Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {change_login} from "../../actions";
import { message, Button } from 'antd';
import axios from "axios";
import log from "../../../../assets/images/bg.jpg";

var loginn={
    background: `url(${log}) no-repeat center center`,
    backgroundSize:"100% 100%"
}

@connect(
    (state)=>({ch_login:state.ch_login})
)
export default class Login extends Component{
    class_back=()=>{ 
        this.props.router.push("/home");
    }
    change_login=()=>{
        var username = this.refs.users.value;
        var password = this.refs.pwds.value;
        const {dispatch} = this.props;
        // dispatch(change_login("/change_login",username,password,dispatch))
        axios.get("/change_login",{
            params:{
               username:username,
               password:password
            }
        }).then(res=>{
           if(res.data==1){
                localStorage.users= this.refs.users.value;
                this.props.router.push("/home");
           }else{
            this.refs.users.value="";
            this.refs.pwds.value="";
             message.error("登陆失败",1);
           }
        })

    }
    // componentDidUpdate(){
    //     const {ch_login} = this.props;
    //     console.log(ch_login)
    //     if(ch_login==1){
    //         localStorage.users= this.refs.users.value;
    //         this.props.router.push("/home");
    //     }else{
    //         this.refs.users.value="";
    //         this.refs.pwds.value="";
    //         message.error("登陆失败",1);
    //     }
    // }
    render(){
        return(
            <div className="login" style={loginn}>
                <div className="header">
                    <i className="iconfont icon-fanhui" onClick={()=>{this.class_back()}}></i>
                    <h2>登陆</h2>
                </div>
                <div className="main">
                    <div className="lm">
                    <p><span><i className="iconfont icon-yonghu"></i></span><input type="text" name="username" ref="users"/></p>
                    <p><span><i className="iconfont icon-mima"></i></span><input type="password" name="password" ref="pwds"/></p>
                    </div>
                    <button onClick={()=>{this.change_login()}}>Login in</button>
                    <p className="fp">Forget Password</p>
                    <Link to="/register">Sign up</Link>
                </div>
            </div>
        )
    }
} 