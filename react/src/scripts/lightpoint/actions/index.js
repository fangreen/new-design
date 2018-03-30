import axios from "axios";
// axios.defaults.baseURL="http://39.108.136.59:7000";
axios.defaults.baseURL="http://localhost:7000";

export function new_picture(url,dispatch){
    return axios.get(url)
    .then(res=>{
        return res.data;
    })
    .then(json=>{
        return dispatch({type:"get_new_picture",json})
    })
}
export function recommend(url,dispatch){
    return axios.get(url)
    .then(res=>{
        return res.data;
    })
    .then(json=>{
        return dispatch({type:"get_recommend",json})
    })
}
export function hot_picture(url,dispatch){
    return axios.get(url)
    .then(res=>{
        return res.data;
    })
    .then(json=>{
        return dispatch({type:"get_hot",json})
    })
}
export function classify(url,dispatch){
    return axios.get(url)
    .then(res=>{
        return res.data;
    })
    .then(json=>{
        return dispatch({type:"classify",json})
    })
}
export function class_page(url,dispatch){
    return axios.get(url)
    .then(res=>{
        return res.data;
    })
    .then(json=>{
        return dispatch({type:"class_page",json})
    })
}
export function detail(url,img,dispatch){
    return axios.get(url,{
        params:{
           img:img
        }
    }).then(res=>{
        return res.data;
    }).then(json=>{
        return dispatch({type:"detail",json})
    })
}
export function change_page(){
    return {
        type:"change_page",
    }
}
export function change_user(users){
    return {
        type:"change_user",
        users
    }
}

export function change_click(){
    return {
        type:"change_click",
    }
}
export function change_click1(){
    return {
        type:"change_click1",
    }
}
export function change_click2(){
    return {
        type:"change_click2",
    }
}
export function change_click3(){
    return {
        type:"change_click3",
    }
}
export function change_p(){
    return {
        type:"change_p",
    }
}
export function change_p1(){
    return {
        type:"change_p1",
    }
}
// export function change_show(detailimg){
//     return {
//         type:"change_show",
//         detailimg
//     }
// }
export function change_show(){
    return {
        type:"change_show",
    }
}
export function change_pl(){
    return {
        type:"change_pl",
    }
}
export function shou_add(url,user,img,sql,dispatch){
    return axios.get(url,{
        params:{
           user:user,
           img:img,
           sql:sql
        }
    }).then(res=>{
        return res.data;
    }).then(json=>{
        return dispatch({type:"shou_add",json})
    })
}
export function shou_pop(url,user,img,sql,dispatch){
    return axios.get(url,{
        params:{
           user:user,
           img:img,
           sql:sql
        }
    }).then(res=>{
        return res.data;
    }).then(json=>{
        return dispatch({type:"shou_pop",json})
    })
}
export function user_add(url,user,img,sql,ph,dispatch){
    return axios.get(url,{
        params:{
           user:user,
           img:img,
           sql:sql,
           ph:ph
        }
    }).then(res=>{
        return res.data;
    }).then(json=>{
        return dispatch({type:"user_add",json})
    })
}
// export function re_success(url,username,password,dispatch){
//     return axios.get(url,{
//         params:{
//            username:username,
//            password:password
//         }
//     }).then(res=>{
//         return res.data;
//     }).then(json=>{
//         return dispatch({type:"re_success",json})
//     })
// }
// export function change_login(url,username,password,dispatch){
//     return axios.get(url,{
//         params:{
//            username:username,
//            password:password
//         }
//     }).then(res=>{
//         return res.data;
//     }).then(json=>{
//         return dispatch({type:"change_login",json})
//     })
// }
//添加评论
export function add_comment(data){
    return {
        type:"add_comment",
        data
    }
}