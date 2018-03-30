import React ,{Component} from "react";
import {connect} from "react-redux";
import {detail} from "../../actions";
import {change_show,change_pl,shou_add,shou_pop,user_add,add_comment} from "../../actions";
import { message, Button,Input} from 'antd';
import axios from "axios";
@connect(
    (state)=>({detail:state.detail,show:state.show,pl:state.pl,all_pl:state.all_pl})
)
export default class Detail extends Component{
    componentWillMount(){
        var img = this.props.location.query.img;
        var path = this.props.params.ph;
        const {dispatch} = this.props;
        dispatch(detail("/"+path,img,dispatch));
        this.setState({cpl:<p>还没有评论，快来抢沙发哦~</p>});
        axios.get("/sc",{
            params:{
                img:img,
                user:localStorage.users
            }
        }).then(res=>{
            if(res.data==1){
                dispatch(change_show())
            }
        })

        axios.get("/spl",{
            params:{
               "img":img
            }
        }).then(res=>{
                if(res.data[0]){
                   this.setState({cpl:<div><span></span><p>最新评论</p></div>});
                }else{
                    this.setState({cpl:<p>还没有评论，快来抢沙发哦~</p>});
                }
                dispatch(add_comment(res.data));
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
    comment=()=>{
        const {dispatch,pl} = this.props;
        dispatch(change_pl());
        this.setState({cpl:<div><input id="pinglun" type="text" placeholder="请输入评论"/><button onClick={()=>{this.cbtn()}}>提交</button></div>});
    }
    cbtn=()=>{
        const {dispatch,pl} = this.props;
        var img = this.props.location.query.img;
        dispatch(change_pl());
        var pinglun = document.getElementById("pinglun");
        var d = new Date();
        var y = d.getFullYear();
        var m = d.getMonth()+1;
        var r = d.getDate();
        var h = d.getHours();
        var f = d.getMinutes();
        var s = d.getSeconds();
        var nt = y+"-"+m+"-"+r+"   "+h+":"+f+":"+s;
        axios.get("/comment",{
            params:{
                pinglun:pinglun.value,
                user:localStorage.users,
                dtime:nt,
                img:img
            }
        }).then(res=>{
                axios.get("/spl",{
                    params:{
                    "img":img
                    }
                }).then(res=>{
                        if(res.data[0]){
                        this.setState({cpl:<div><span></span><p>最新评论</p></div>});
                        }else{
                            this.setState({cpl:<p>还没有评论，快来抢沙发哦~</p>});
                        }
                        dispatch(add_comment(res.data));
                })
        })
        this.setState({cpl:<div><span></span><p>最新评论</p></div>});
    }
    render(){
        const {detail,show,pl,all_pl} = this.props;
        return(
            <div className="detail">
                <div className="de_content">
                    <div className="de_img">
                       <img src={this.props.location.query.img}/>
                       <i className="iconfont icon-fanhui" onClick={()=>{this.goback()}}></i>
                    </div>
                   
                    <div className="comment">
                        {this.state.cpl}
                    </div>
                    <ul ref="pinglun" className="pinglun">
                        {
                        all_pl.map((item,d)=>{
                                return (
                                    <li key={d}>
                                        <div className="upl">
                                            <div>

                                            </div>
                                            <div>
                                                
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="de_footer">
                    <i className="iconfont icon-xiazai1"></i>
                    <i className={"iconfont icon-wodeshoucang- "+(show==true?"active":"")} onClick={()=>{this.shoucang(detail.img,this.props.params.sql)}}></i>
                    <i className={"iconfont icon-comment "+(pl==true?"active":"")} onClick={()=>{this.comment()}}></i>
                    <i className="iconfont icon-share"></i>
                </div>
            </div>
        )
    }
}