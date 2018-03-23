import React,{Component} from "react";
import Foot from "../../component/foot";
export default class App extends Component{
    render(){
        return(
            <div className="app">
                {this.props.children}
                <Foot/>
            </div>
        )
    }
}