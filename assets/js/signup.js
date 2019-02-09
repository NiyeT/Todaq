const cookies={
	setCookie:function(name,value,days){
	    var expires = "";
	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime() + (days*24*60*60*1000));
	        expires = "; expires=" + date.toUTCString();
	    }
	    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
	},
	getCookie:function(name){
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;

	},
	eraseCookie:function(name){
	    document.cookie = name+'=; Max-Age=-99999999;';  
	}
}

function changePage(email){
	if(email.indexOf("@")!=-1 && email.length>3){
		window.location.href="main/index.html";
	}
}

const email_input=document.querySelector("#email_input");
const password_input=document.querySelector("#password_input");

document.querySelector("#submit-button").addEventListener("click",function(e){
	const email=email_input.value;
	const password=password_input.value;
	const url=`http://localhost:8007/createAccount?email=${email}&password=${password}`;
	console.log('url:',url)
	$.ajax({
		url:url,
		success:function(data){
			cookies.setCookie("userid",data.userid)
			changePage(email);
		}
	})

	return false;
})