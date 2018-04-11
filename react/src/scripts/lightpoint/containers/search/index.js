import React,{Component} from "react";
import {connect} from "react-redux";
import {hashHistory} from "react-router";
import {wp_search} from "../../actions";
import axios from "axios";
// axios.defaults.baseURL = "http://39.108.136.59:7000";
axios.defaults.baseURL="http://localhost:7000";
@connect(
    (state)=>({wp_arr:state.wp_arr})
)
export default class Search extends Component{
    quxiao=()=>{
        if(this.refs.sq.innerHTML=="搜索"){
            axios.get("/wp_search",{
                params:{
                   wp:this.refs.sousuo.value
                }
            }).then(res=>{
                const {dispatch} = this.props;
                var str="";
                var wp_arr=[];
                if(res.data.length!=0){
                    res.data.forEach(function(item,i){
                        if(item!=null){
                            wp_arr.push(item);
                        }
                    });
                   
                    dispatch(wp_search(wp_arr));    
                }else{
                    str="<p>暂时没有您要搜索的图片。。。。。。</p>";
                    this.refs.wp_all.innerHTML=str;
                }
               
            })
        }
        if(this.refs.sq.innerHTML=="取消"){
            this.props.router.goBack();
        }
    }
    sousuo=()=>{
        this.refs.sq.innerHTML="搜索";
        if(this.refs.sousuo.value==""){
            this.refs.sq.innerHTML="取消";
        }
    }
    imgdetail(detail,sql,img){
        hashHistory.push("/detail/"+detail+"/"+sql+"?img="+img);
    }
    render(){
        const {wp_arr} = this.props;
        return(
            <div className="wp_search">
                <div className="header">
                    <input type="text" ref="sousuo" onChange={()=>this.sousuo()} placeholder="输入关键字"/><span className="sq" ref="sq" onClick={()=>this.quxiao()}>取消</span>
                </div>
                <div className="wp_all" ref="wp_all">
                    <ul className="search_content">
                        {
                            wp_arr.map((item,index)=>{
                                return(
                                
                                    <li key={index} onClick={()=>this.imgdetail("detail_new","paper",item.img)}><img src={item.wq}/></li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}