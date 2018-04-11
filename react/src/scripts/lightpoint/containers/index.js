import React, {Component} from "react";
import {render} from "react-dom";
import {hashHistory,Router,Route, IndexRedirect,Redirect} from "react-router";

import App from "./app";
import Home from "./home";
import Classify from "./classify";
import Detail from "./detail";
import Mine from "./mine";
import Classpage from "./classpage";
import Shoucang from "./shoucang";
import Login from "./login";
import Register from "./register";
import Search from "./search";
export default class Layout extends Component{
    render(){
        return(
            <Router history={hashHistory}>
            {/* <Redirect from="/react/dist" to="/" /> */}
            <Route path="/" component={App}>
                <IndexRedirect to="/home"/>
                <Route path="home" component={Home}></Route>
                <Route path="classify" component={Classify}></Route>
                <Route path="mine" component={Mine}></Route>
            </Route>

            <Route path="/detail/:ph/:sql" component={Detail}></Route>
            <Route path="/classpage/:ename" component={Classpage}></Route>
            <Route path="/shoucang" component={Shoucang}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/search" component={Search}></Route>
        </Router>
        )
    }
}
