var blog_directory;

$(function() {
	$.getJSON("https://xujianguo.github.io/data/blog_directory.json", function(result) {
		blog_directory = eval(result);
		$.getJSON("https://xujianguo.github.io/data/common.json", function(result) {
			var target = eval(result.type);
			var content = '<h2>博文分类</h2>';
			var target_array;
			for(var i = 0; i < target.length; i++) {
				target_array = eval('blog_directory.' + target[i].id);
				content += '<a href="#" class="list-group-item" onclick="getDirectory(' + "'"
					+ target[i].id + "'" + ')">' + target[i].content + '(' + target_array.length + ")" + '</a>';
			}
			$("#template-json").html(content);
			var strs = window.location.pathname.split("/");
			var current_page = strs[strs.length-1];
			if(current_page == 'blog.html') {
				var pid = getQueryString("id");
				if(pid) {
					getDirectory(pid);
				} else {
					getDirectory(target[0].id);
				}
			}
		});
	});
});

function getDirectory(type) {
	var strs = window.location.pathname.split("/");
	var current_page = strs[strs.length-1];
	if(current_page != 'blog.html') {
		window.location.href = '../../blog.html?' + "id=" + type;
	} else {
		var target = eval('blog_directory.' + type);
		var content = "";
		for(var i = 0; i < target.length; i++) {
			content += 
			  '<div class="blogbox"><h2><a href="' + target[i].address + '">' 
			  + target[i].title + '</a></h2><p>' + target[i].outlook + '</p><sub>' + target[i].time + '</sub></div>';
		}
		$("#directory").html(content);	
	}
}

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) 
		return unescape(r[2]); 
	return null; 
} 


