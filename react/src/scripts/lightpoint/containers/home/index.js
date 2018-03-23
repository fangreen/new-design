

import React,{Component} from "react";
import {Link} from "react-router";

import Recommend from "./recommend";
import New from "./new";
import Hot from "./hot";
import "../../../utils/swiper-3.3.1.min";
import {connect} from "react-redux";

@connect(
    (state)=>({...state})
)

export default class Picture extends Component{
    constructor(props){
        super(props)
        this.state = {
            swiperIndex:0
        }
    }
    changeIndex=(idx)=>{
        this.mySwiper.slideTo(idx);
    }

    render() {
        const {nav} = this.props;
        const {swiperIndex} = this.state;
        return (
            <div className="home">
                <div className="home_nav">
                    {
                        nav.map((item,index)=>{
                            return (
                                <div key={index} onClick={()=>this.changeIndex(index)} className={swiperIndex==index?"p_active":""}>
                                    {item.txt}
                                    <i></i>
                                </div>
                            )
                        })
                    }
                  <i className="iconfont icon-sousuo2"></i>
                </div>

                <div className="swiper-container " id="swipe">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slide1" >
                            <Recommend/>
                        </div>
                        <div className="swiper-slide slide1">
                            <New/>
                        </div>
                        <div className="swiper-slide slide1">
                            <Hot/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount(){
        const {swiperIndex} = this.state
        var that = this
        this.mySwiper = new Swiper("#swipe",{
            loop:false,
            autoplay: false,
            direction:"horizontal",
            pagination: '.swiper-pagination',
            resistanceRatio:0,
            calculateHeight:true,
            initialSlide:0,
            autoHeight:true,
            onSlideChangeEnd(swiper){
                that.setState({
                    swiperIndex:swiper.activeIndex
                })
            }    
        });
    }

}