var Load = {
		isBack : false,
		loading : function(isBack, img, msg, id){
			 Load.isBack = isBack;
			 //创建div
			 var bodyEle = $("body");
			 bodyEle.append('<div id="' + id +'" style="position:relative;" class="loadDiv"></div>');
		     var info = '';
		     if(isBack == true){
		    	 //添加白色背景层
		    	 info += '<div class="loading-mask"></div>';
		     }
		     //不添加
		     info += '<div class="loading">'+
			  		    '<div class="loading-indicator" >'+
			 	    	'<div style="margin: 0 auto; width: 30px; height: 30px;">'+
			 	    		//'<img src="../../../style/js/loading/default/' + img + '.gif" width="32px" height="32px"/>'+
			 	    		//替换为CSS版本
			 	    		
			 	    		//'<div class="cssload-container">'+
				 	    		//'<div class="cssload-speeding-wheel"></div>'+
				 	    	//'</div>'+
			 	    		'<div class="loaders-container">'+
							     '<div class="container">'+
						 	       '<div class="circle"></div>'+
						 	     '</div>'+
		     				'</div>'+
			 	    		
				 	    	
			 	    	'</div>'+
			 	    	'<div>'+
			 	    		'<span class="loading-msg">' + msg +'</span>'+
			 	    	'</div>'+
			 	    '</div>'+
			 	'</div>';
		     $('#' + id).html(info);
		     
		     //手持设备 OR PC
		     var isPc = IsPC();
		     if(isPc){
		    	 $(".loading").css("left", "44%");
		     }
		},
		close : function(id){
			/**
			 * 为了得到更好的体验，同时避免冲突，加上id,id根据new Date()计算出来
			 */
			if(Load.isBack){
				$("#" + id + " .loading-mask").css("display","none");
			}
			$("#" + id).css("display", "none");
		}
};
