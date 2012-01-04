var Gitgraph = function(args){
	if(!args || !args.user || !args.repo){
		throw new Error('Gitgraph: missing user and/or repo arg ');
	}else{		
		this.go = function(){
			this.total 	= this.data.all;
			this.own	= this.data.owner;

			//Populate canvas
			this.graphContainer.innerHTML = '';
			this.canvas	= dojo.create('canvas',{width:this.width,height:this.height,style:'position:relative;margin-top:11px;'},this.graphContainer);

			var img = dojo.create('img',{
				src:'https://a248.e.akamai.net/assets.github.com/images/modules/dashboard/dossier/participation_legend.png?1315937721',
				style:'position:relative;top:-4px'
			},this.graphContainer);
			var context	= this.canvas.getContext("2d"),
				width	= this.width / this.total.length,
				height 	= this.height,
				max		= Math.max.apply(Math, this.total),
				scale  	= max >= height ? parseFloat(height - 1) / max : 1;
			function render(value, index){
				value *= scale;
				context.fillRect(index * width, height - value, width - 1, value);
			}
			context.fillStyle = 'rgb(202, 202, 202)';
			dojo.forEach(this.total, render);
			context.fillStyle = 'rgb(51, 102, 153)';
			dojo.forEach(this.own, render);
		};
		
		this.loadScript = function(sScriptSrc,callbackfunction) {
			//gets document head element
			var oHead = document.getElementsByTagName('head')[0];
			if(oHead){
				//creates a new script tag		
				var oScript = document.createElement('script');

				//adds src and type attribute to script tag
				oScript.setAttribute('src',sScriptSrc);
				oScript.setAttribute('type','text/javascript');

				//calling a function after the js is loaded (IE)
				var loadFunction = function()
					{
						if (this.readyState == 'complete' || this.readyState == 'loaded')
						{
							callbackfunction(); 
						}
					};
				oScript.onreadystatechange = loadFunction;

				//calling a function after the js is loaded (Firefox)
				oScript.onload = callbackfunction;

				//append the script tag to document head element		
				oHead.appendChild(oScript);
			}
		};

		this.bind = function (oThis) {
			if (typeof this !== "function") {
			  // closest thing possible to the ECMAScript 5 internal IsCallable function
			  throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}

			var aArgs = Array.prototype.slice.call(arguments, 1), 
			    fToBind = this, 
			    fNOP = function () {},
			    fBound = function () {
			      return fToBind.apply(this instanceof fNOP
			                             ? this
			                             : oThis || window,
			                           aArgs.concat(Array.prototype.slice.call(arguments)));
			    };

			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();

			return fBound;
		};
		
		this.kickStart = function(){
			dojo.ready(this, function(){
				//Get particiption data
				dojo.xhrGet({
					url: 'http://logicalcognition.com/files/gitgraph.php?user='+args.user+'&repo='+args.repo,
					handleAs: 'json',
					preventCache: true,
					load: dojo.hitch(this,function(data){
						this.data = data;
						this.go();
					})
				});	
			});
		};
		
		this.width 	= 416;
		this.height = 20;
		this.node 	= args.domNode ? args.domNode : document.body;
		
		if(!window.dojo)
			this.loadScript('http://ajax.googleapis.com/ajax/libs/dojo/1.7.1/dojo/dojo.js',this.kickStart.bind(this));
		else
			this.kickStart.bind(this)();
	}
	
	this.graphContainer = document.createElement('div');
	this.graphContainer.innerHTML = '<img src="http://biganimals.com/wp-content/themes/biganimals/images/loading_transparent_4.gif"/>';
	this.graphContainer.style.cssText = 'border-radius:3px;border:1px solid #E5E5E5;'
	+'background:white;height:55px;width:430px;text-align:center;';
	this.node.appendChild(this.graphContainer);
	
	return this.graphContainer;
};

//Make Jquery folks happy
if (window.jQuery) {
    jQuery.fn.gitgraph = function (args) {
		if(!args || !args.user || !args.repo){
			throw new Error('Gitgraph: missing user and/or repo arg ');
		}else{
			this.each(function () {
	            var view = new Gitgraph({ 
	                user    : args.user,     
	                domNode : $(this)[0], 
	                repo : args.repo
	            });
	        });
		}
    };
}