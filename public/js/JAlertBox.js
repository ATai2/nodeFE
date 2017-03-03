/********************************************************************
 * JAlertBox
 *********************************************************************/

/*
 * 创建背景层
 */
function CBG(){
	
	var hasBg = document.getElementById("pop_bg");
	
	if(!hasBg){
	    var oBg = document.createElement("div");
	    oBg.setAttribute("id", "pop_bg"); //创建透明背景层(bg) 
	    oBg.setAttribute("class", "pop_bg");
	    /*with (oBg.style) {
	        position = 'absolute';
	        display = 'none';
	        zIndex = '20';
	        width = '100%';
	        height = '100%';
	        left = '0';
	        top = '0';
	        background = '#000000';
	        filter = 'Alpha(opacity=50)';
	        opacity = '0.5';
	    }*/
	    document.body.appendChild(oBg);
	}
    var hasMsg = document.getElementById("pop_msg");
	
	if(!hasMsg){
	
	    var oMsg = document.createElement("div");
	    oMsg.setAttribute("id", "pop_msg"); //创建透明背景层(bg)
	    oMsg.setAttribute("align", "center"); 
	    oMsg.setAttribute("class", "pop_msg"); 
	    /*with (oMsg.style) {
	        position = 'fixed';
	        display = 'none';
	        zIndex = '21';
	        width = '80%';
	        minHeight = '100';
	        marginLeft = '-46%';
	        left = '56%';
	        top = '30%';
	        background = 'rgba(255, 255, 255, 0.92)';
	        borderRadius = '10px';
	    }*/
	    document.body.appendChild(oMsg);
	}
}


function click_link(link){

	if(link){
		$('#pop_div').hide();
    	$("#pop_bg").hide();
        $("#pop_msg").empty().hide(); 
        $("#pop_emsg").empty().hide();
    	window.location.href = link;
    }else{
    	$('#pop_div').hide();
    	$("#pop_bg").hide();
        $("#pop_msg").empty().hide();
        $("#pop_emsg").empty().hide();
    }
}
function pop_close(){

	$("#pop_bg").hide();
	$("#pop_emsg").empty().hide();
    $("#pop_msg").empty().hide(); 
    $('#pop_div').hide();
}

/* 2014-07-07 */
function mAlert(title,content,close_css,ok_btn,ok_link){

	CBG();
	var html = '';
	if(title){
		html += '<div class="pr" id="msgTitle" align="center" onclick="pop_close()">'+title+'</div>';
	}
	if(close_css){
		html += '	<div  class="top_close"  onclick="pop_close()"></div>';
	}
	html += '<div id="msgTxt">'+content+'</div>';
	html += '<div class="bottom_btn"><div class="close_btn" onclick="click_link(\''+ok_link+'\')">'+ok_btn+'</div></div>';
	
	$('#pop_div').hide();
	$("#pop_emsg").empty().hide();
	$("#pop_bg").css("height", $(document).height());
	$("#pop_bg").css("display",'block');
    $("#pop_bg").show();
    $("#pop_msg").empty().html(html).show();
}
//通用正常弹框
function CAlert(title,content,close_css,yes_btn,yes_link,no_btn,no_link){

	CBG();
	var html = '';
	if(title){
		html += '<div class="pr" id="msgTitle" align="center" onclick="pop_close()">'+title+'</div>';
	}
	if(close_css){
		html += '	<div  class="top_close"  onclick="pop_close()"></div>';
	}
	if(content){
		html += '<div id="msgTxt">'+content+'</div>';
	}
	html += '<div class="bottom_btn">';
	if(yes_btn){
		html += '		<div class="m_close_btn" onclick="click_link(\''+yes_link+'\')">'+yes_btn+'</div>';
	}
	if(no_btn){
		html += '		<div class="m_ok_btn" onclick="click_link(\''+no_link+'\')">'+no_btn+'</div>';
	}
	html += '</div>';
	
	$('#pop_div').hide();
	$("#pop_emsg").empty().hide();
	$("#pop_bg").css("height", $(document).height());
	$("#pop_bg").css("display",'block');
    $("#pop_bg").show();
    $("#pop_msg").empty().html(html).show();
}

function CBGO(){
	
	var hasBg = document.getElementById("pop_bg");
	
	if(!hasBg){
	    var oBg = document.createElement("div");
	    oBg.setAttribute("id", "pop_bg"); //创建透明背景层(bg) 
	    oBg.setAttribute("class", "pop_bg");
	    document.body.appendChild(oBg);
	}
    var hasMsg = document.getElementById("pop_emsg");
	
	if(!hasMsg){
	
	    var oMsg = document.createElement("div");
	    oMsg.setAttribute("id", "pop_emsg"); //创建透明背景层(bg)
	    oMsg.setAttribute("align", "center"); 
	    oMsg.setAttribute("class", "pop_emsg"); 
	    document.body.appendChild(oMsg);
	}
}

/* 通用空的弹框,不带背景色*/
function OAlert(html){

	CBGO();
	
	$('#pop_div').hide();
	$("#pop_msg").empty().hide();
	$("#pop_bg").css("height", $(document).height());
	$("#pop_bg").css("display",'block');
    $("#pop_bg").show();
    $("#pop_emsg").empty().html(html).show();
}

/* 通用空的弹框*/
function EAlert(html){

	CBG();
	
	$('#pop_div').hide();
	$("#pop_emsg").empty().hide();
	$("#pop_bg").css("height", $(document).height());
	$("#pop_bg").css("display",'block');
    $("#pop_bg").show();
    $("#pop_msg").empty().html(html).show();
}

//loading
function mloading(){
	
	var has_html = document.getElementById("pop_div");
	
	if(!has_html){
		
		var oMsg = document.createElement("div");
	    oMsg.setAttribute("id", "pop_div");
	    document.body.appendChild(oMsg);
	    
  		var html = '';
		html += '<div id="loading">';
		html += '    <div class="spinner">';
		html += '      <div class="spinner-container container1">';
		html += '        <div class="circle1"></div>';
		html += '        <div class="circle2"></div>';
		html += '        <div class="circle3"></div>';
		html += '        <div class="circle4"></div>';
		html += '      </div>';
		html += '      <div class="spinner-container container2">';
		html += '        <div class="circle1"></div>';
		html += '        <div class="circle2"></div>';
		html += '        <div class="circle3"></div>';
		html += '        <div class="circle4"></div>';
		html += '      </div>';
		html += '      <div class="spinner-container container3">';
		html += '        <div class="circle1"></div>';
		html += '        <div class="circle2"></div>';
		html += '        <div class="circle3"></div>';
		html += '        <div class="circle4"></div>';
		html += '      </div>';
		html += '    </div>';
		html += '</div>';
		
		$('#pop_div').empty().html(html);
	}
	
    $('#pop_div').show();
}
//function close
function mcancel(){
	
	$('#pop_div').hide();
	$("#pop_bg").hide();
    $("#pop_msg").empty().hide(); 
    $("#pop_emsg").empty().hide();
}

