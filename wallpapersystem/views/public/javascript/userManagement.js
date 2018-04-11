$(function(){
	//根据窗口调整表格高度
    $(window).resize(function() {
        $('#mytab').bootstrapTable('resetView', {
            height: tableHeight()
        })
    })
	//生成用户数据
	$('#mytab').bootstrapTable({
		method : 'post',
		contentType : "application/x-www-form-urlencoded",
		queryParamsType : 'pageSize',
		pagination:true,//是否分页
		queryParams : function(params) {
			return {
				page : params.pageNumber,
				pageSize : params.pageSize,
				uname:$("#search_name").val()
			};
		},
		url : "/users/usermsg",
		cache : true,
		pagination : true,
		toolbar : '#toolbar',
		sidePagination : 'server',
		clickToSelect : true,
		pageSize : 5,
		pageList : [ 5, 10],
		detailFormatter:function(index,rows){
			var str="";
			$.ajax({
				url:"/users/apl",
				type:"post",
				async:false,
				data:{user:rows["username"]},
				 success:function(data){
					 $.each(data,function(i){
						str+='<p class="pl"><span>'+data[i].pinglun+'</span><button class="open mtd" data-toggle="modal" type="button" data-target="#myModal" data-id='+data[i]._id+'>详情</button></p>';
					 })
				 }
			})
			return str;
		}
	});
	//获取评论详情
    $("#mytab").on("click",".mtd",function(){
		var _that=$(this);
		$.ajax({
			 url:"/users/un_apl",
			 type:"post",
			 success:function(data1){
				for(var x=0;x<data1.length;x++){
					if(_that.attr("data-id")==data1[x]._id){	
						var str2='';
						str2=`
							<div class="pld">
								<div><span>评论日期</span><p>${data1[x].dtime}</p></div>
								<div><span>评论内容</span><p>${data1[x].pinglun}</p></div>
								<div><span>评论获赞</span><p>${data1[x].dz}</p></div>
							</div>
						`
					$(".modal-body").html(str2);
					}
				}
			 }
		})
		
	})
	//删除评论
	$(".del_comment").click(function(){
		var dtime = $(".del_comment").prevAll().find(".pld").children().find("p")[0];
		$.ajax({
			url:"/users/del_comment",
			type:"post",
			data:{dtime:dtime.innerHTML},
			success:function(data){
				if(data==0){
					
				}
			}
		})
	})
    /*
     * 用户管理首页事件
     */
		  $('#addForm').bootstrapValidator({
		       	feedbackIcons: {
		               valid: 'glyphicon glyphicon-ok',
		               invalid: 'glyphicon glyphicon-remove',
		               validating: 'glyphicon glyphicon-refresh'
		           },
		           fields: {
		               username: {
		                   validators: {
		                       notEmpty: {
		                           message: '登录名不能为空'
		                       },
		                       stringLength:{
		               			min:3,
		               			max:5,
		               			message:'用户名为3-5位'
		               		}
		                   }
		               },
		              
		               password:{
		               	validators:{
		               		notEmpty:{
		               			message:'密码不能为空'
		               		},
		                       stringLength:{
		                       	min:6,
		                       	max:12,
		                       	message:'密码为6-12位'
		                       }
		               	}
		               	
		               },
		              
		               Attribute: {
		                   validators: {
		                       notEmpty: {
		                           message: '状态不能为空'
		                       }
		                   }
		               }
		           }
		     });
		    $('#editForm').bootstrapValidator({
		       	feedbackIcons: {
		               valid: 'glyphicon glyphicon-ok',
		               invalid: 'glyphicon glyphicon-remove',
		               validating: 'glyphicon glyphicon-refresh'
		           },
		           fields: {
		        	  
		               username: {
		                   validators: {
		                       notEmpty: {
		                           message: '用户名不能为空'
		                       }/*,
		                       stringLength:{
		               			min:5,
		               			max:15,
		               			message:'登录名为5-10位'
		               		}*/
		                   }
		               },
		               password: {
		                   validators: {
		                       notEmpty: {
		                           message: '密码不能为空'
		                       },
		               		stringLength:{
		               			min:2,
		               			max:10,
		               			message:'密码为6-12位'
		               		}
		                   }
		               },
		              
		               Attribute: {
		                   validators: {
		                       notEmpty: {
		                           message: '状态不能为空'
		                       }
		                   }
		               }
		           }
		       });

   function operateFormatter(value,row,index){
    	if(value==2){
    		return '<i class="fa fa-lock" style="color:red"></i>'
    	}else if(value==1){
    		return '<i class="fa fa-unlock" style="color:green"></i>'
    	}else{
    		return '数据错误'
    	}
    }

    //请求服务数据时所传参数
    function queryParams(params){
    	return{
    		pageSize: params.limit,
    		pageIndex:params.pageNumber,
    		uname:$("#search_name").val()
    	}
    }
    //查询按钮事件
    $('#search_btn').click(function(){
		var val = $("#search_name").val();
    	$('#mytab').bootstrapTable('refresh', {url: '/users/username'});
    })
    
    //增加按钮事件
    $('#btn_add').click(function(){
		$('.tableBody').addClass('animated slideOutLeft');
		setTimeout(function(){
			$('.tableBody').removeClass('animated slideOutLeft').css('display','none');
		},500)
		$('.addBody').css('display','block');
		$('.addBody').addClass('animated slideInRight');
    })
    //删除按钮与修改按钮的出现与消失
    $('.bootstrap-table').change(function(){
    	var dataArr=$('#mytab .selected');
    	if(dataArr.length==1){
    		$('#btn_edit').css('display','block').removeClass('fadeOutRight').addClass('animated fadeInRight');
    	}else{
    		$('#btn_edit').addClass('fadeOutRight');
    		setTimeout(function(){
    			$('#btn_edit').css('display','none');
    		},400);	
    	}
    	if(dataArr.length>=1){
    		$('#btn_delete').css('display','block').removeClass('fadeOutRight').addClass('animated fadeInRight');
    	}else{
    		$('#btn_delete').addClass('fadeOutRight');
    		setTimeout(function(){
    			$('#btn_delete').css('display','none');
    		},400);	
    	}
    });
    //修改按钮事件
    $('#btn_edit').click(function(){
		var dataArr=$('#mytab').bootstrapTable('getSelections');
		$.ajax({
			url:"/users/edit_user",
			type:"post",
			data:{
				id:dataArr[0]._id
			},
			success:function(data){
				$('#edit_LoginName').val(data.username);
				$('#edit_Pwd').val(data.password);
			}
		})
    	$('.tableBody').addClass('animated slideOutLeft');
		setTimeout(function(){
			$('.tableBody').removeClass('animated slideOutLeft').css('display','none');
		},500)
		$('.changeBody').css('display','block');
		$('.changeBody').addClass('animated slideInRight');
		
		if(dataArr[0].Attribute==1){
			$("#editForm input[name=Attribute]:eq(0)").prop("checked",true);
			$("#editForm input[name=Attribute]:eq(1)").prop("checked",false);
		}
		else if(dataArr[0].Attribute==2){
			$("#editForm input[name=Attribute]:eq(1)").prop("checked",true);
			$("#editForm input[name=Attribute]:eq(0)").prop("checked",false);
		}
    })
    /*
     * 用户管理增加用户页面所有事件
    */
    //增加页面表单验证   
    $('#add_saveBtn').click(function() {
	   //点击保存时触发表单验证
	   var username = $("#add_LoginName").val();
	   var password = $("#add_Pwd").val();
	  
	   if(/^[\u4e00-\u9fa5]{3,5}$/.test(username)&&/^\w{6,10}$/.test(password)){
		$.ajax({
			url:"/users/re_success",
			type:"post",
			data:{
				username:username,
				password:password
			},
			success:function(data){
				if(data==0){
					$('.addBody').addClass('animated slideOutLeft');
					setTimeout(function(){
						$('.addBody').removeClass('animated slideOutLeft').css('display','none');
					},500);
					$('.tableBody').css('display','block').addClass('animated slideInRight');
					$('#mytab').bootstrapTable('refresh', {url: '/users/usermsg'});
					$('#addForm').data('bootstrapValidator').resetForm(true);
					//隐藏修改与删除按钮
					$('#btn_delete').css('display','none');
					$('#btn_edit').css('display','none');
				}else{
					$("#add_LoginName").val("");
					$("#add_Pwd").val("");
				}
			}
		})
	}else{
		$("#add_LoginName").val("");
		$("#add_Pwd").val("");
	}
})  
    
    //增加页面返回按钮事件
    $('#add_backBtn').click(function() {
    	$('.addBody').addClass('animated slideOutLeft');
    	setTimeout(function(){
			$('.addBody').removeClass('animated slideOutLeft').css('display','none');
		},500)
    	$('.tableBody').css('display','block').addClass('animated slideInRight');  
    	$('#addForm').data('bootstrapValidator').resetForm(true);
    });
    /*
     * 用户管理修改用户页面所有事件
    */
    //修改页面回退按钮事件
    $('#edit_backBtn').click(function(){
    	$('.changeBody').addClass('animated slideOutLeft');
    	setTimeout(function(){
			$('.changeBody').removeClass('animated slideOutLeft').css('display','none');
		},500)
    	$('.tableBody').css('display','block').addClass('animated slideInRight'); 
    	$('#editForm').data('bootstrapValidator').resetForm(true);
    })
    //修改页面保存按钮事件
    $('#edit_saveBtn').click(function(){
		var username = $("#edit_LoginName").val();
		var password = $("#edit_Pwd").val();
		if(/^[\u4e00-\u9fa5]{3,5}$/.test(username)&&/^\w{6,10}$/.test(password)){
		 $.ajax({
			 url:"/users/edit_up",
			 type:"post",
			 data:{
				 username:username,
				 password:password
			 },
			 success:function(data){
				 if(data==0){
					 $('.changeBody').addClass('animated slideOutLeft');
					 setTimeout(function(){
						 $('.changeBody').removeClass('animated slideOutLeft').css('display','none');
					 },500);
					 $('.tableBody').css('display','block').addClass('animated slideInRight');
					 $('#mytab').bootstrapTable('refresh', {url: '/users/usermsg'});
					 $('#addForm').data('bootstrapValidator').resetForm(true);
					 //隐藏修改与删除按钮
					 $('#btn_delete').css('display','none');
					 $('#btn_edit').css('display','none');
				 }else{
					 $("#edit_Pwd").val("");
				 }
			 }
		 })
	 }else{
		 $("#edit_Pwd").val("");
	 }
    })
    //删除事件按钮
    $('#btn_delete').click(function(){
		var dataArr=$('#mytab').bootstrapTable('getSelections');
    	$('.popup_de .show_msg').text('确定要删除该用户吗?');
    	$('.popup_de').addClass('bbox');
    	$('.popup_de .btn_submit').one('click',function(){
			$.ajax({
				url:"/users/edit_user",
				type:"post",
				data:{
					id:dataArr[0]._id
				},
				success:function(data){
					$.ajax({
						url:"/users/delete_user",
						type:"post",
						data:{
							username:data.username
						},
						success:function(data1){
							if(data1==0){
								$('.popup_de .show_msg').text('删除成功！');
								$('.popup_de .btn_cancel').css('display','none');
								$('.popup_de').addClass('bbox');
								$('.popup_de .btn_submit').one('click',function(){
									$('.popup_de').removeClass('bbox');
								})
								$('#mytab').bootstrapTable('refresh', {url: '/users/usermsg'});
							}
						}
					})
				}
			})
    	 })
    })
    //弹出框取消按钮事件
   　　$('.popup_de .btn_cancel').click(function(){
	   $('.popup_de').removeClass('bbox');
   　　})
    //弹出框关闭按钮事件
     $('.popup_de .popup_close').click(function(){
	   $('.popup_de').removeClass('bbox');
   　　})
 
})
function tableHeight() {
    return $(window).height() - 140;
}
