import React ,{Component} from "react";
import {connect} from "react-redux";
import {detail} from "../../actions";
import {change_show,shou_add,shou_pop,user_add} from "../../actions";
import { message, Button } from 'antd';
import axios from "axios";
@connect(
    (state)=>({detail:state.detail,show:state.show})
)
export default class Detail extends Component{
    componentWillMount(){
        var img = this.props.location.query.img;
        var path = this.props.params.ph;
        const {dispatch} = this.props;
        dispatch(detail("/"+path,img,dispatch));
        axios.get("/sc",{
            params:{
                img:img
            }
        }).then(res=>{
            if(res.data==1){
                dispatch(change_show())
            }
        })
    }
    goback=()=>{
        const {dispatch,show} = this.props;
        if(show==true){
            dispatch(change_show())
        }
        this.props.router.goBack();
    }
    shoucang=(img,sql)=>{
        if(localStorage.users){
            const {dispatch,show} = this.props;
            dispatch(change_show())
            if(show==false){
                message.success("收藏成功",1);
                dispatch(user_add("/user",localStorage.users,img,sql,this.props.params.ph,dispatch));
                // dispatch(shou_add("/shou_add",localStorage.users,img,sql,dispatch));
                
            }else{
                message.success("已经取消收藏",1);
                dispatch(shou_pop("/shou_pop",localStorage.users,img,sql,dispatch));
            }
        }else{
            this.props.router.push("/login");
        }
        
    }
    render(){
        const {detail,show} = this.props;
        if(detail!=""){
            var data = new Date(detail.atime)
            var year = data.getFullYear()+47;
            var month = data.getMonth()+1;
            var day = data.getDate();
            var hours = data.getHours();
            var minute = data.getMinutes();
            var second = data.getSeconds();
        }
        return(
            <div className="detail">
                <div className="de_content">
                    <div className="de_img">
                       <img src={this.props.location.query.img}/>
                       <i className="iconfont icon-fanhui" onClick={()=>{this.goback()}}></i>
                    </div>
                    <dl>
                        <dt><img src={detail.avatar}/></dt>
                        <dd>
                            <p>{detail.name}</p>
                            <p><span>{year}-{month}-{day}</span><span>{hours}:{minute}:{second}</span></p>
                        </dd>
                    </dl>
                    <div className="comment">
                        <p>还没有评论，快来抢沙发哦~</p>
                    </div>
                    <ul>
                        <li></li>
                    </ul>
                </div>
                <div className="de_footer">
                    <i className="iconfont icon-xiazai1"></i>
                    <i className={"iconfont icon-wodeshoucang- "+(show==true?"active":"")} onClick={()=>{this.shoucang(detail.img,this.props.params.sql)}}></i>
                    <i className="iconfont icon-comment"></i>
                    <i className="iconfont icon-share"></i>
                </div>
            </div>
        )
    }
}