import React,{Component} from "react";
import {connect} from "react-redux";
import axios from "axios";
import {Link} from "react-router"
@connect(
    (state)=>({shou:state.shou})
)
export default class Shoucang extends Component{
    componentDidMount(){
        const {shou} = this.props;
    if(localStorage.users){
        axios.get("/shouc",{
            params:{
                user:localStorage.users
            }
        }).then(res=>{
            if(res.data==1){
                axios.get("/paper",{
                    params:{
                        user:localStorage.users
                    }
                }).then(res=>{
                    var str="";
                    for(var i=0;i<res.data.length;i++){
                        //  str+=`<li><a href="/react/dist/#/detail/${res.data[i].ph}/${res.data[i].sql}?img=${res.data[i].img}"><img src=${res.data[i].img}></a></li>`
                        str+=`<li><a href="#/detail/${res.data[i].ph}/${res.data[i].sql}?img=${res.data[i].img}"><img src=${res.data[i].img}></a></li>`
                    }
                   this.refs.shou.innerHTML=`
                   <ul class="paper_ul">
                   ${str}
                   </ul>
                  `; 
                //   var paper_li = document.getElementById("paper_li");
                 
             })
           
            }else{
                this.refs.shou.innerHTML=`
                <img src=${shou} class="nono"/>
               <p>还没有任何收藏呢~</p>`; 
            }
        })
    }else{
        this.refs.shou.innerHTML=`
             <img src=${shou} class="nono"/>
            <p>还没有任何收藏呢~</p>`;
    }
    }
    www=()=>{
        console.log("ssss");
    }
    class_back=()=>{
        this.props.router.goBack();
    }
    render(){
        const {shou} = this.props;
        return(
            <div className="shoucang">
                <div className="header">
                    <i className="iconfont icon-fanhui" onClick={()=>{this.class_back()}}></i>
                    <h2>我的收藏</h2>
                </div>
                <div className="shou_content">
                    <div className="no" ref="shou">
                    </div>
                </div>
            </div>
        )
    }
}