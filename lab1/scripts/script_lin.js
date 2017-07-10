window.onload = function ()
{
	Array.prototype.input = function(name,lenght)
	{
		for(var i = 0; i< lenght ; i++)
			this [i] = document.getElementsByName(name).item(i).value;
	}
	document.getElementById("button").onclick = function()
	{
		var x = document.getElementById("x").value;
		var size = document.getElementById('input_x').getElementsByTagName('input').length;
		var Pr1=1, Pr2=1, Sum=0;
		var massX = new Array();
		var massY = new Array();
		massY.input('val_y',size);
		massX.input('val_x',size);
		for(var i=0;i<size;i++)
		{
			for(var j=0;j<size;j++)
				if(i!=j)
				{
					Pr1 *= x-massX[j];
					Pr2 *= massX[i] - massX[j];
				}
			Sum += massY[i]*(Pr1/Pr2);
			Pr1=Pr2=1;
		}
		document.getElementsByTagName('h2').item(0).innerHTML = "Ответ:&nbsp;  &nbsp; " + Sum;
	}
}