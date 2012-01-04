var gitgraph = function(args){
	if(!args || !args.user || !args.repo){
		throw new Error('gitgraph: missing user and/or repo arg ');
	}else{
		this.width 	= 416;
		this.height = 20;
		this.node 	= args.domNode ? args.domNode : document.body;
		
		//Build canvas
		this.graphContainer = dojo.create('div',{
			innerHTML:'<img src="http://biganimals.com/wp-content/themes/biganimals/images/loading_transparent_4.gif"/>',
			style:'border-radius:3px;border:1px solid #E5E5E5;'
			+'background:white;height:55px;width:430px;text-align:center;'
		},this.node);
		
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
		
		this.go = function(){
			this.total 	= this.data.all;
			this.own	= this.data.owner;

			//Populate canvas
			this.graphContainer.innerHTML = '';
			this.canvas	= dojo.create('canvas',{width:this.width,height:this.height,style:'position:relative;margin-top:11px;'},this.graphContainer);

			var img = dojo.create('img',{
				src:'https://a248.e.akamai.net/assets.github.com/images/modules/dashboard/dossier/participation_legend.png?1315937721',
				style:'position:relative;top:-6px'
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
		
		return this.graphContainer;
	}
};

