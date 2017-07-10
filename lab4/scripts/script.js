window.onload = function ()
{
	// 1.) x*x + 4*sin(x) = 0;
	// 2.) x*x*x - 3*x*x + 12*x - 9 = 0;
	function parser(param)
	{	
		param = param.replace(new RegExp("sqrt",'g'),'Math.sqrt');
		param = param.replace(new RegExp("sin",'g'),'Math.sin');
		param = param.replace(new RegExp("cos",'g'),'Math.cos');
		param = param.replace(new RegExp("pow",'g'),'Math.pow');
		param = param.replace(new RegExp("log",'g'),'Math.log');
		return param;
	}
	document.getElementById("button2").onclick = function()
	{
		document.getElementsByClassName("invisible")[0].style.display = "none";
		}
	document.getElementById("button").onclick = function()
	{	
		var exp_val = parser(document.getElementById("function").value);
		var der_val = parser(document.getElementById("derivative").value);
		$(function () 
		{
		document.getElementById("placeholder").style.display = "block";
		document.getElementById("hoverdata").style.display = "block";
		var dat1 = [];
		var dat2 = [];
		var dat3 = [];
		var x;
		for (var i = 0; i < 14; i += 0.007)
		{
			x=i;
			x=eval(exp_val);
			dat1.push([i, x]);
			if(x<0.0035 && x>-0.0035)
				dat2.push([i, 0]);
			if(i==0 || i>13.999)
				dat3.push([i, x]);
		}
    	var data = [dat1,dat2,dat3];
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
				panRange: [-3000, 3000] 
			},
        	yaxis: 
			{ 
				zoomRange: [0.01, 200], 
				panRange: [-3000, 3000] 
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
        	},
			{
				color: 'brown',		
            	data: dat3,
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
	function df(x) 
	{ 
		return eval(der_val); 
	} //Её производная
	function f(x)
	{
    	return eval(exp_val);// Заменить ф-ей, корни которой мы ищем
	}
	function findRoot_Nyuton()
	{
 		var  x=0.0001,eps=0.0001,tmp=0.0001+2*0.0001;   //Начальное приближение
    	while(Math.abs(x-tmp)>eps) 
		{ //Выбран останов |x[n]-x[n+1]|<eps
     			tmp=x;
     			x-=f(x)/df(x);
		}
		return x;
   	}
	// a, b - пределы хорды, epsilon - необходимая погрешность
	function findRoot_horda()
	{
		var a = 4, b = 42;
    		while(Math.abs(b - a) > 0.0001)
    		{
				a = b - (b - a) * f(b)/(f(b) - f(a));
        		b = a - (a - b) * f(a)/(f(a) - f(b));
    		}
   	 // a - i-1, b - i-тый члены
   	 return Math.abs(b);
	}
	 var previousPoint = null;
    $("#placeholder").bind("plothover", function (event, pos, item) {
        $("#x").text('Координаты мишы - '+pos.x.toFixed(2));
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
    });
	document.getElementsByClassName("invisible")[0].style.display = "block";
	document.getElementById("solution").innerHTML = "<h3 style='color:white; padding:50px;'>Метод Хорд:</br> &nbsp; &nbsp; &nbsp; &nbsp; X = "+findRoot_horda()+"</br><br/>Метод Касательных:</br> &nbsp; &nbsp; &nbsp; &nbsp; X = "+findRoot_Nyuton()+"</h2>";
	//alert("Метод Хорд:                 X = "+findRoot_horda()+"\nМетод Касательных:   X = "+findRoot_Nyuton());
	
	}
}