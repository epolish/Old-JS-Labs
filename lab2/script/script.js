window.onload = function ()
{
	// 	standard-test-function ->	(1/x)*sin(3.14*x/2) x = 1..2 | answer = 0.481682
	function square(fun,a,b,n,set)
	{
		var table='<table style="border:2px solid"><tr><td>i</td><td>X</td><td>Y(x)</td></tr>';
		var h = (b-a)/n, s = 0, x = 0, xb = 0;
		set == 'left' ? xb = a*1 : xb = a*1+h/2;
		for(var i=0;i<n;i++)
		{
			table += "<tr>"
			table += "<td>"+i+"</td>";
			table += "<td>"+x+"</td>";
			x = i*h+xb;
			s += eval(parser(fun));
			table += "<td>"+s*h+"</td>";
			table += "</tr>"
		}
		document.getElementById("table2").style.display = set == 'left' ? true : "block";
		document.getElementById("table1").style.display = set == 'left' ? "block" : true;
		if(set != 'left')
			document.getElementById("table2").innerHTML = table;
		if(set == 'left')
			document.getElementById("table1").innerHTML = table;
		return s*h;
	}
	function trapezoid(fun,a,b,n)
	{
		var table='<table style="border:2px solid"><tr><td>i</td><td>X</td><td>Y(x)</td></tr>';
		var h = (b-a)/n; s = 0;
		x = a;	s = eval(parser(fun));
		x = b;	s += eval(parser(fun))*0.5;
		x = a*1;
		for(var i=0;i<n-1;i++)
		{
			table += "<tr>"
			table += "<td>"+i+"</td>";
			table += "<td>"+x+"</td>";
			x += h;
			s += eval(parser(fun));
			table += "<td>"+s*h+"</td>";
			table += "</tr>"
		}
		table += "</table>";
		document.getElementById("table3").style.display = "block" ;
		document.getElementById("table3").innerHTML = table;
		return s*h;
	}
	function simpson(fun,a,b,n)
	{
		var table='<table style="border:2px solid"><tr><td>i</td><td>X</td><td>Y(x)</td></tr>';
		var h = (b-a)/n; s = 0;
		x = a;	s = eval(parser(fun));
		x = b;	s += eval(parser(fun))*0.5*h;
		for(var i=0;i<n;i++)
		{
			table += "<tr>"
			table += "<td>"+i+"</td>";
			x = a*1+h*i;
			table += "<td>"+x+"</td>";
			s += eval(parser(fun));
			table += "<td>"+s*h+"</td>";
			table += "</tr>"
		}
		table += "</table>";
		document.getElementById("table4").style.display = "block" ;
		document.getElementById("table4").innerHTML = table;
		return s*h;
	}
	//////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////
	var flag = 1;
	function parser(param)
	{	
		param = param.replace(new RegExp("sqrt",'g'),'Math.sqrt');
		param = param.replace(new RegExp("sin",'g'),'Math.sin');
		param = param.replace(new RegExp("cos",'g'),'Math.cos');
		param = param.replace(new RegExp("pow",'g'),'Math.pow');
		param = param.replace(new RegExp("log",'g'),'Math.log');
		return param;
	}
	document.getElementById("button").onclick = function()
	{
		if(flag == 1) 
		{
			var fun = document.getElementsByName("function")[0].value;
			var b = document.getElementsByName("lin_a")[0].value;
			var a = document.getElementsByName("lin_b")[0].value;
			var n = document.getElementsByName("step")[0].value;
			alert("Приближенное значение интеграла: "+square(fun,a,b,n,'left'));
		}
		if(flag == 2)  
		{
			var fun = document.getElementsByName("function2")[0].value;
			var b = document.getElementsByName("lin_a2")[0].value;
			var a = document.getElementsByName("lin_b2")[0].value;
			var n = document.getElementsByName("step2")[0].value;
			alert("Приближенное значение интеграла: "+square(fun,a,b,n,'center'));
		}
		if(flag == 3) 
		{
			var fun = document.getElementsByName("function3")[0].value;
			var b = document.getElementsByName("lin_a3")[0].value;
			var a = document.getElementsByName("lin_b3")[0].value;
			var n = document.getElementsByName("step3")[0].value;
			alert("Приближенное значение интеграла: "+trapezoid(fun,a,b,n));
		}
		if(flag == 4) 
		{
			var fun = document.getElementsByName("function4")[0].value;
			var b = document.getElementsByName("lin_a4")[0].value;
			var a = document.getElementsByName("lin_b4")[0].value;
			var n = document.getElementsByName("step4")[0].value;
			alert("Приближенное значение интеграла: "+simpson(fun,a,b,n));
		}
	}
	function display(param1,param2,param3,param4,param5,param6,param7,param8,param9,param10,param11,param12)
	{
		document.getElementsByClassName("square_left_right")[0].style.color = param1;
		document.getElementsByClassName("square_left_right")[0].style.background = param2;
		document.getElementsByClassName("square_center")[0].style.color = param3;
		document.getElementsByClassName("square_center")[0].style.background = param4;
		document.getElementsByClassName("square_trapezoid")[0].style.color = param5;
		document.getElementsByClassName("square_trapezoid")[0].style.background = param6;
		document.getElementsByClassName("square_simpson")[0].style.color = param7;
		document.getElementsByClassName("square_simpson")[0].style.background = param8;
		document.getElementsByClassName("input")[0].style.display = param9;
		document.getElementsByClassName("input")[1].style.display = param10;
		document.getElementsByClassName("input")[2].style.display = param11;
		document.getElementsByClassName("input")[3].style.display = param12;
	}
	document.getElementsByClassName("square_left_right")[0].onclick = function() 
	{
		display("#333","#CCC","#CCC","#333333","#CCC","#333333","#CCC","#333333","block","none","none","none");
		flag = 1;
	}
	document.getElementsByClassName("square_center")[0].onclick = function() 
	{
		display("#CCC","#333333","#333","#CCC","#CCC","#333333","#CCC","#333333","none","block","none","none");
		flag = 2;
	}
	document.getElementsByClassName("square_trapezoid")[0].onclick = function() 
	{
		display("#CCC","#333333","#CCC","#333333","#333","#CCC","#CCC","#333333","none","none","block","none");
		flag = 3;
	}
	document.getElementsByClassName("square_simpson")[0].onclick = function() 
	{
		display("#CCC","#333333","#CCC","#333333","#CCC","#333333","#333","#CCC","none","none","none","block");
		flag = 4;
	}
	jQuery( document ).ready(function() 
	{
		jQuery('#scrollup img').mouseover( 
								function(){jQuery( this ).animate({opacity: 0.65},100);})
							.mouseout( 
								function(){jQuery( this ).animate({opacity: 1},100);})
							.click( 
								function(){jQuery('html, body').animate( {scrollTop: 0},'slow'); return false;});

			jQuery(window).scroll(
						function()
						{
							if ( jQuery(document).scrollTop() > 0 ) 
								jQuery('#scrollup').fadeIn('slow');
							else 
								jQuery('#scrollup').fadeOut('slow');	
						})});
}