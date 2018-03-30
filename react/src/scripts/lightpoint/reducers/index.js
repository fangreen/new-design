
import login from "../../../assets/images/login.png";
import shou from "../../../assets/images/shou_bg.png";

var initState = {
    footList:[
        {path:"/home",txt:"首页",icon:"icon-uitap10"},
        {path:"/classify",txt:"分类",icon:"icon-fenlei11"},
        {path:"/mine",txt:"我的",icon:"icon-wode"},
    ],
    nav:[
        {path:"/recommend",txt:"推荐"},
        {path:"/new",txt:"最新"},
        {path:"/hot",txt:"热门"}
    ],
    paper:[],
    re_paper:[],
    hot_paper:[],
    classify:[],
    detail:[],
    class_page:[],
    login,
    show:false,
    shou,
    re_s:"",
    ch_login:"",
    str:"",
    click:"lo",
    click1:"lg",
    p:"",
    pl:false,
    all_pl:[],

}


export default (state=initState,action)=>{
    switch(action.type){
        case "get_new_picture":
        state.paper = action.json;
        return Object.assign({},state);
        break;
        case "get_recommend":
        state.re_paper = action.json;
        return Object.assign({},state);
        break;
        case "get_hot":
        state.hot_paper = action.json;
        return Object.assign({},state);
        break;
        case "classify":
        state.classify = action.json;
        return Object.assign({},state);
        break;
        case "class_page":
        state.class_page = action.json;
        return Object.assign({},state);
        break;
        case "detail":
        state.detail = action.json[0];
        return Object.assign({},state);
        break;
        case "change_page":
        state.class_page = [];
        return Object.assign({},state);
        break;
        case "change_show":
        state.show = !state.show;
        return Object.assign({},state);
        break;
        case "change_pl":
        state.pl = !state.pl;
        return Object.assign({},state);
        break;
        case "add_comment":
        state.all_pl = action.data;
        return Object.assign({},state);
        break;
        // case "re_success":
        // state.re_s = action.json;
        // return Object.assign({},state);
        // break;
        // case "change_login":
        // state.ch_login = action.json;
        // return Object.assign({},state);
        // break;
        case "change_user":
        state.str = action.users;
        return Object.assign({},state);
        break;
        case "change_click":
        state.click = "lg";
        return Object.assign({},state);
        break;
        case "change_click1":
        state.click1 = "lo";
        return Object.assign({},state);
        break;
        case "change_click2":
        state.click1 = "lg";
        return Object.assign({},state);
        break;
        case "change_click3":
        state.click = "lo";
        return Object.assign({},state);
        break;
        case "change_p":
        state.p = "退出登陆";
        return Object.assign({},state);
        break;
        case "change_p1":
        state.p = "";
        return Object.assign({},state);
        break;
        default:
        return Object.assign({},state);
        break;
    }
}