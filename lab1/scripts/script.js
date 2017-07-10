window.onload = function ()
{
	function input(name)
	{
		var mass = [[]];
		if(name=='val_y')
			for(var i = 0; i< document.getElementById('input_x').getElementsByTagName('input').length; i++)	
				mass [0][i] = Number(document.getElementsByName(name).item(i).value);
		else
		{
			mass [1] = [];
			mass [2] = [];
			for(var i = 0; i< document.getElementById('input_x').getElementsByTagName('input').length; i++)	
				{
					mass [0][i] = 1;
					mass [1][i] = Number(document.getElementsByName(name).item(i).value);
					mass [2][i] = mass [1][i]* mass [1][i];
				}
		}
		return mass;
	}
	
	document.getElementById("button").onclick = function()
	{	
		var massX = input('val_x'), massY = input('val_y');
		var bool = true;
		try
		{
			massRez = MultiplyMatrix(InverseMatrix(MultiplyMatrix((massX), TransMatrix(massX))), MultiplyMatrix((massX), TransMatrix(massY)));
			var a0 = (massRez[0]+'').substr(0, 5), a1 = (massRez[1]+'').substr(0, 5), a2 = (massRez[2]+'').substr(0, 5);
			var string_rezult = "Уравнение: y = ("+a2+')*x<sup>2</sup> + ('+a1+')*x + ('+a0+').';
			document.getElementsByTagName('h2').item(0).innerHTML = string_rezult;
		}catch(e){
			alert("Невозможно найти обратную матрицу та как определитель равен 0")
			bool = false;
			}
		if(bool)
		$(function () 
		{
		document.getElementById("placeholder").style.display = "block";
		document.getElementById("hoverdata").style.display = "block";
		var dat1 = [];
		for (var t = -10; t <= 10; t += 0.1)
			dat1.push([t, massRez[2]*t*t+massRez[1]*t+massRez[0]*1]); 
		var dat2 = [];
			dat2.push([massX[1][0], massY[0][0]]); 
			dat2.push([massX[1][1], massY[0][1]]);
			dat2.push([massX[1][2], massY[0][2]]);
			dat2.push([massX[1][3], massY[0][3]]);
			dat2.push([massX[1][4], massY[0][4]]);
			dat2.push([massX[1][5], massY[0][5]]);
    	var data = [ dat1 , dat2];
	    var placeholder = $("#placeholder");
    	var options = 
		{
        	series: 
			{ 
	
				lines: 
				{  
					show: true, 
					fill: true, 
					fillColor: "rgba(150, 150, 50, 0.15)" 
					,lineWidth:2
				}, 
				shadowSize: 2 
			},
        	xaxis: 
			{ 
				zoomRange: [0.01, 200], 
				panRange: [-200, 200] 
			},
        	yaxis: 
			{ 
				zoomRange: [0.01, 200], 
				panRange: [-200, 200] 
			},
        	zoom: 
			{
            	interactive: true
        	},
			grid: { hoverable: true, clickable: true },
        	pan: 
			{
            	interactive: true
        	}	
    	};
    	var plot = 
			$.plot(placeholder, [
			{
            	color: 'blue',
				data: dat1,
            	lines: 
				{ 
					show: true, 
					fill: false 
				}
        	},
			{
				color: 'red',		
            	data: dat2,
            	lines: 
				{ 
					show: true, 
					fill: false 
				},
				points: 
				{ 
					show: true 
				}
        	}
			], options);
	});
	
	 var previousPoint = null;
    $("#placeholder").bind("plothover", function (event, pos, item) {
        $("#x").text('Координаты мыши - '+pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));

        if ($("#enableTooltip:checked").length > 0) {
            if (item) {
                if (previousPoint != item.datapoint) {
                    previousPoint = item.datapoint;
                    
                    $("#tooltip").remove();
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);
                    
                    showTooltip(item.pageX, item.pageY,
                                item.series.label + " of " + x + " = " + y);
                }
            }
            else {
                $("#tooltip").remove();
                previousPoint = null;            
            }
        }
    });}
}