/** 
 * Toast效果  
 * 
 * @param config 
 * @return 
 * 
 * @date 2015-08-31
 */  
var Toast = function(config){  
    this.context = config.context==null?$('body'):config.context;//上下文  
    this.message = config.message;//显示内容  
    this.time = config.time==null?3000:config.time;//持续时间  
    this.left = config.left;//距容器左边的距离  
    this.top = config.top;//距容器上方的距离  
    this.init();  
}

var msgEntity;  
Toast.prototype = {  
		
    //初始化显示的位置内容等  
    init : function(){  
	
        $("#toastMessage").remove();  
        
        //设置消息体  
        var msgDIV = new Array();  
        msgDIV.push('<div id="toastMessage">');  
        msgDIV.push('<span>'+this.message+'</span>');  
        msgDIV.push('</div>');  
        msgEntity = $(msgDIV.join('')).appendTo(this.context);
        
        //设置消息样式  
        var left = this.left == null ? '50%': this.left;
        var top = this.top == null ? '25%' : this.top;  
        msgEntity.css({
        	position:'absolute',
        	top:top,
        	'z-index':'9999',
        	left:left,
        	transform: 'translateX(-50%)',
        	'background-color':'rgba(0, 0, 0, 0.8)',
        	borderRadius:'5px',
        	color:'#ffffff',
            'font-size':'1rem',
            'font-weight':'600',
        	padding:'38px 21px',
        	margin:'10px 0',  
        	//whiteSpace: 'nowrap',
	        //textOverflow: 'ellipsis',
            maxWidth: '63%',
            minWidth: '55%',
            textAlign: 'center',
	        lineHeight: '1.2',
	        overflow: 'hidden'
        }); 
        
        msgEntity.hide();  
    },  
    //显示动画  
    show :function(){  
        msgEntity.fadeIn(this.time/4).delay(this.time/2).fadeOut(this.time/4);
    }  
}  