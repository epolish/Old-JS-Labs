window.onload = function ()
{
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

		var exp_val = parser(document.getElementById("function").value);
		var n = Number(document.getElementById("size").value);
		var h = Number(document.getElementById("step").value);
		var x = Number(document.getElementById("begg_x").value);
		var y = Number(document.getElementById("begg_y").value);
		function f(x,y)
		{
    		return eval(exp_val);
		}
		//h = (b - a) / n; 
		//метод Эйлера
		function Eiler()
		{
			var table='<hr/><h2>Метод Эйлера</h2></br><table style="border:2px solid"><tr><td>X</td><td>Y(x)</td></tr>';	
    		for (var i = 0; i <= n; i++)
   			{
				y += h * f(x, y);
				table += "<tr>"
				table += "<td style='padding:2px; border:2px solid'>"+x+"</td>";
				table += "<td style='padding:2px; border:2px solid'>"+y+"</td>";
				table += "</tr>"
        		x += h;
    		}
			document.getElementById("rez").innerHTML = table+"</table>";
			document.getElementById("rez").style.display = 'block';
		}
		// Модифицированный метод Эйлера
		function Embeded_Eiler()
		{
			var py=0,fy=0;
			var table='<hr/><h2>Улучшенный метод Эйлера</h2></br><table style="border:2px solid"><tr><td>X</td><td>Y(x)</td></tr>';	
    		for (var i = 0; i <= n; i++)
			{
				fy = f(x, y);
				py = y + h * fy;
				y += h / 2 * (fy + f(x, py));
				table += "<tr>"
				table += "<td style='padding:2px; border:2px solid'>"+x+"</td>";
				table += "<td style='padding:2px; border:2px solid'>"+y+"</td>";
				table += "</tr>"
				x += h;
			}
			document.getElementById("rez2").innerHTML = table+"</table>";
			document.getElementById("rez2").style.display = 'block';
		}
		Eiler();
		Embeded_Eiler();
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
	
	