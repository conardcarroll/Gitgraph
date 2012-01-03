var gitgraph = function(args){
	if(!args || !args.user || !args.repo){
		throw new Error('gitgraph: missing user and/or repo arg ');
	}else{
		//Get particiption data
		dojo.xhrGet({
			url: 'http://logicalcognition.com/files/gitgraph.php?user='+args.user+'&repo='+args.repo,
			handleAs: 'json',
			sync:true,
			preventCache: true,
			load: dojo.hitch(this,function(data){
				this.data = data;
			})
		});

		this.total 	= this.data.all;
		this.own	= this.data.owner;
		this.width 	= 416;
		this.height = 20;
		this.node 	= args.domNode ? args.domNode : document.body;
		
		//Build canvas and populate
		this.graphContainer = dojo.create('div',{
			style:'border-radius:3px;border:1px solid #E5E5E5;'
			+'background:white;height:55px;width:430px;text-align:center;'
		},this.node);
		var canvas	= dojo.create('canvas',{width:this.width,height:this.height,style:'position:relative;top:11px;'},this.graphContainer);
		dojo.create('br',{},this.graphContainer);
		var img = dojo.create('img',{
			src:'https://a248.e.akamai.net/assets.github.com/images/modules/dashboard/dossier/participation_legend.png?1315937721',
			style:'position:relative;top:7px;'
		},this.graphContainer);
		var context	= canvas.getContext("2d"),
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
	}
};

