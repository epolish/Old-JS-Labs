window.onload = function ()
{
	function input(name)
	{
		var temp = 0;
		var mass = [[]];
		if(name == 'input_b')
			for(var i = 0; i < document.getElementById(name).getElementsByTagName('input').length; i++)	
				mass [i] = Number(document.getElementsByName(name)[i].value);
		else
			for(var i = 0; i < document.getElementById(name).getElementsByTagName('input').length/4; i++)	
			{
				mass[i] = [];
				for(var j = 0; j < document.getElementById(name).getElementsByTagName('input').length/4; j++)	
				{
					mass [i][j] = Number(document.getElementsByName(name)[temp].value);
					temp++;
				}
			}
		return mass;
	}
	// Метод Гауса - Gaus
	function Gaus(a, b, x, n)
	{
		//прямой ход
		var v,i,j,im;
		for(var k=0; k<n-1; k++)
		{
			im=k;
			for(i=k+1;i<n;i++)
				if( Math.abs(a[im][k]) < Math.abs(a[i][k]))
					im=i;
			if(im!=k)
			{
				for(j=0; j<n; j++)
				{
					v=a[im][j];
					a[im][j]=a[k][j];
					a[k][j]=v;
				}
				v=b[im];
				b[im]=b[k];
				b[k]=v;
			}
			for(i=k+1; i<n; i++)
			{
				v= 1.0*a[i][k]/a[k][k];
				a[i][k]=0;
				b[i]= b[i]-v*b[k];
				if(v!=0)
					for(j=k+1; j<n; j++)
						a[i][j]=a[i][j]-v*a[k][j];
			}
		}
		//обратный ход
		var s=0;
		x[n-1]=1.0*b[n-1]/a[n-1][n-1];
		for(var i=n-2, j; 0<=i; i--)
		{
			s=0;
			for(j=i+1; j<n; j++)
				s=s+a[i][j]*x[j];
			x[i]=1.0*(b[i]-s)/a[i][i];
		}
		return x;
	}
	// Метод Гауса - Зейделя  - Zeidel
	function converge(xk, xkp, n)
	{
		for (var i = 0; i < n; i++)
    		if(Math.abs(xk[i] - xkp[i]) >= 1.11E-16) 
				return false;
		return true;
	}
	function Zeidel(a, b, n)
	{
		var p = [], x = [];
		for (var i = 0; i <n; i++)
			x[i] = 0;
		do
		{
  			for(var i = 0; i < n; i++)
			{
    			var v = 0;
    			for (j = 0; j < n; j++) 
      				if (j != i) 
						v += (a[i][j] * x[j]);
    			p[i] = x[i];
    			x[i] = (b[i] - v) / a[i][i];
  			}
		}
		while (!converge(x, p));
		return x;
	}
	function print_html(mass, n, method)
	{
		var str = '';
		if(method == 'Gaus')
			str ='<hr/><h2>Метод Гауса</h2></br>';
		else
			str ='<hr/><h2>Метод Гауса-Зейделя</h2></br>';
		for(var i=0; i< n; i++)
			str += "X<sub>"+(n-i)+"</sub> = "+mass[i]+"<hr/><br/>";
		if(method == 'Gaus')
		{
			document.getElementById("rez").innerHTML = str; 
			document.getElementById("rez").style.display = "block";
		}
		else
		{
			document.getElementById("rez2").innerHTML = str; 
			document.getElementById("rez2").style.display = "block";
		}
	}
	document.getElementById("button").onclick = function()
	{	
		var n = Number(document.getElementById("input_b").getElementsByTagName('input').length);
		var massA = input('input_a'), massB = input('input_b'), massC = [];
		print_html(Gaus(massA, massB, massC, n), n, 'Gaus');
		print_html(Zeidel(massA, massB, n), n, 'Zeidel');
	}
	function print_r( array, return_val ) {	// Prints human-readable information about a variable
	// 
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// + namespaced by: Michael White (http://crestidg.com)

	var output = "", pad_char = " ", pad_val = 4;

	var formatArray = function (obj, cur_depth, pad_val, pad_char) {
		if(cur_depth > 0)
			cur_depth++;

		var base_pad = repeat_char(pad_val*cur_depth, pad_char);
		var thick_pad = repeat_char(pad_val*(cur_depth+1), pad_char);
		var str = "";

		if(obj instanceof Array) {
			str += "Array\n" + base_pad + "(\n";
			for(var key in obj) {
				if(obj[key] instanceof Array) {
					str += thick_pad + "["+key+"] => "+formatArray(obj[key], cur_depth+1, pad_val, pad_char);
				} else {
					str += thick_pad + "["+key+"] => " + obj[key] + "\n";
				}
			}
			str += base_pad + ")\n";
		} else {
			str = obj.toString(); // They didn't pass in an array.... why? -- Do the best we can to output this object.
		};

		return str;
	};

	var repeat_char = function (len, char) {
		var str = "";
		for(var i=0; i < len; i++) { str += char; };
		return str;
	};

	output = formatArray(array, 0, pad_val, pad_char);

	if(return_val !== true) {
		document.write("<pre>" + output + "</pre>");
		return true;
	} else {
		return output;
	}
	}
}
	
	