
import React,{Component} from "react"
import {Link} from "react-router"
import {connect} from "react-redux";

@connect(
    (state)=>({footList:state.footList})
)
export default class Foot extends Component{
    static defaultProps = {
       
    }

    render(){
        return (
            <div className="foot">

                    {
                        this.props.footList.map((item,d)=>{
                            return (
                                <Link onlyActiveOnIndex={true} activeClassName="active" key={d} to={item.path} >
                                    <i className={"iconfont "+item.icon}></i>
                                    <span>{item.txt}</span>
                                </Link>
                            )
                        })
                    }
            </div>
        )
    }
} 