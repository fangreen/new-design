import React,{Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {re_success} from "../../actions";
import log from "../../../../assets/images/bg.jpg";
import axios from "axios";
import { message, Button } from 'antd';
var loginn={
    background: `url(${log}) no-repeat center center`,
    backgroundSize:"100% 100%"
}
@connect(
    (state)=>({re_s:state.re_s})
)
export default class Register extends Component{
    class_back=()=>{ 
        this.props.router.push("/home");
    }
    sign=()=>{
        var username = this.refs.user.value;
        var password = this.refs.pwd.value;
        if(/^[\u4e00-\u9fa5]{3,5}$/.test(username)&&/^\w{6,10}$/.test(password)){
            const {dispatch} = this.props;
            // dispatch(re_success("/re_success",username,password,dispatch));
            axios.get("/re_success",{
                     params:{
                        username:username,
                         password:password
                    }
                }).then(res=>{
                    if(res.data==0){
                        localStorage.users= this.refs.user.value;
                        this.props.router.push("/home");
                    }else{
                         this.refs.user.value = "";
                         this.refs.pwd.value = "";  
                         message.error("用户名已注册",1);
                     } 
                })
        }else{
            this.refs.user.value = "";
            this.refs.pwd.value = "";  
            message.error("注册失败",1);
        }
    }
    // componentDidUpdate(){
    //     const {re_s} = this.props;
    //     if(re_s==0){
    //         this.props.router.push("/home");
    //     }else{
    //         this.refs.user.value = "";
    //         this.refs.pwd.value = "";  
    //         message.error("用户名已注册",1);
    //     }
    // }
    render(){
        return(
            <div className="login" style={loginn}>
                <div className="header">
                    <i className="iconfont icon-fanhui" onClick={()=>{this.class_back()}}></i>
                    <h2>注册</h2>
                </div>
                <div className="main">
                    <div className="lm">
                        <p><span><i className="iconfont icon-yonghu"></i></span><input type="text" name="username" ref="user"  placeholder="用户名3~5位汉字"/></p>
                        <p><span><i className="iconfont icon-mima"></i></span><input type="password" name="password" ref="pwd" placeholder="密码6~10位数字字母组合"/></p>
                    </div>
                    <button onClick={()=>{this.sign()}}>Sign up</button>
                    <p className="fp">Forget Password</p>
                    <Link to="/login">Login in</Link>
                </div>
            </div>
        )
    }
} 