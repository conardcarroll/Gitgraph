##gitgraph

Pure JS github participation graph using canvas element. To see it in action, visit [gitgraph.logicalcognition.com](http://gitgraph.logicalcognition.com).

![Alt text](http://logicalcognition.com/Projects/gitgraph/demo/images/screenshot.png)

##Supported Browsers

* Safari 4+
* Chrome 9+
* Firefox 4+
* Internet Explorer 8+

##Usage

1. Paste into your page's HEAD

	```console
	<script src="http://ajax.googleapis.com/ajax/libs/dojo/1.7.1/dojo/dojo.js" type="text/javascript"></script>
	<script src="http://logicalcognition.com/Projects/gitgraph/gitgraph.js"></script>
	```

2. From within a script tag or a JS file
	
	```console
	var graph = new gitgraph({ 
	  user    : 'bouchon',                // any github username
	  repo    : 'coweb',                  // name of repo
	  domNode : document.body,  // domNode to attach to (optional)
	});
	```
##Issues & Features

File under the Issues section and feel free to fork and pull-request

##License

WTFPL