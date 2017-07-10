function TransMatrix(A)       //Транспонирование матрицы - На входе двумерный массив 
{
    var m = A.length, n = A[0].length, AT = [];
    for (var i = 0; i < n; i++)
     { AT[i] = [];
       for (var j = 0; j < m; j++) AT[i][j] = A[j][i];
     }
    return AT;
}

function SumMatrix(A,B)       //Сложение матриц - На входе двумерные массивы одинаковой размерности
{   
    var m = A.length, n = A[0].length, C = [];
    for (var i = 0; i < m; i++)
     { C[i] = [];
       for (var j = 0; j < n; j++) C[i][j] = A[i][j]+B[i][j];
     }
    return C;
}

function multMatrixNumber(a,A)  //Умножение матрицы на число - a - число, A - матрица (двумерный массив)
{   
    var m = A.length, n = A[0].length, B = [];
    for (var i = 0; i < m; i++)
     { B[i] = [];
       for (var j = 0; j < n; j++) B[i][j] = a*A[i][j];
     }
    return B;
}

function MultiplyMatrix(A,B) // Умножение матриц
{
    var rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];
    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[i] = [];
    for (var k = 0; k < colsB; k++)
     { for (var i = 0; i < rowsA; i++)
        { var t = 0;
          for (var j = 0; j < rowsB; j++) t += A[i][j]*B[j][k];
          C[i][k] = t;
        }
     }
    return C;
}

function MatrixPow(n,A) //Возведение матрицы в степень
{ 
    if (n == 1) return A;     // Функцию MultiplyMatrix см. выше
    else return MultiplyMatrix( A, MatrixPow(n-1,A) );
}

function Determinant_Laplas(A)            //Функция для вычисления определителя матрицы A по теореме Лапласа:
{  
    var n = A.length, subA = [], detA = 0;
        
    if (n==1) return A[0][0];
    if (n==2) return (A[0][0]*A[1][1]-A[0][1]*A[1][0]);
    if (n==3)
       { return ((A[0][0]*A[1][1]*A[2][2]+A[0][1]*A[1][2]*A[2][0]+A[0][2]*A[1][0]*A[2][1])
                 -(A[0][0]*A[1][2]*A[2][1]+A[0][1]*A[1][0]*A[2][2]+A[0][2]*A[1][1]*A[2][0]));
       }

    for (var i=0; i<n; i++)
        { for (var h=0; h<n-1; h++) subA[h]=[];
          for (var a=1; a<n; a++)
              { for (var b=0; b<n; b++)
                    { if (b<i)       subA[a-1][ b ] = A[ a ][ b ];
                      else if (b>i)  subA[a-1][b-1] = A[ a ][ b ];
                    }
              }
          var sign = (i%2==0) ? 1 : -1;
          detA += sign * A[0][i] * Determinant(subA);
        }

    return detA;  //@ http://mathhelpplanet. com/viewtopic.php?f=44&t=22390
}

function Determinant(A)   //Определитель матрицы -  Используется алгоритм Барейса, сложность O(n^3)
{
    var N = A.length, B = [], denom = 1, exchanges = 0;
    for (var i = 0; i < N; ++i)
     { B[i] = [];
       for (var j = 0; j < N; ++j) B[i][j] = A[i][j];
     }
    for (var i = 0; i < N-1; ++i)
     { var maxN = i, maxValue = Math.abs(B[i][i]);
       for (var j = i+1; j < N; ++j)
        { var value = Math.abs(B[j][i]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { var temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       var value1 = B[i][i];
       for (var j = i+1; j < N; ++j)
        { var value2 = B[j][i];
          B[j][i] = 0;
          for (var k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[i][k]*value2)/denom;
        }
       denom = value1;
     }
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}

function MatrixRank(A) // Ранг матрицы
{
    var m = A.length, n = A[0].length, k = (m < n ? m : n), r = 1, rank = 0;
    while (r <= k)
     { var B = [];
       for (var i = 0; i < r; i++) B[i] = [];
       for (var a = 0; a < m-r+1; a++)
        { for (var b = 0; b < n-r+1; b++)
           { for (var c = 0; c < r; c++)
              { for (var d = 0; d < r; d++) B[c][d] = A[a+c][b+d]; }
             if (Determinant(B) != 0) rank = r;
           }       // Функцию Determinant см. выше
        }
       r++;
     }
    return rank;
}

function AdjugateMatrix(A)   //Союзная матрица - A - двумерный квадратный массив
{                                        
    var N = A.length, adjA = [];
    for (var i = 0; i < N; i++)
     { adjA[i] = [];
       for (var j = 0; j < N; j++)
        { var B = [], sign = ((i+j)%2==0) ? 1 : -1;
          for (var m = 0; m < j; m++)
           { B[m] = [];
             for (var n = 0; n < i; n++)   B[m][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m][n-1] = A[m][n];
           }
          for (var m = j+1; m < N; m++)
           { B[m-1] = [];
             for (var n = 0; n < i; n++)   B[m-1][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m-1][n-1] = A[m][n];
           }
          adjA[i][j] = sign*Determinant(B);   // Функцию Determinant см. выше
        }
     }
    return adjA;
}

function InverseMatrix_2(A)   //Обратная матрица -  A - двумерный квадратный массив первый способ.
{   
    var det = Determinant(A);                // Функцию Determinant см. выше
    if (det == 0) return false;
    var N = A.length, A = AdjugateMatrix(A); // Функцию AdjugateMatrix см. выше
    for (var i = 0; i < N; i++)
     { for (var j = 0; j < N; j++) A[i][j] /= det; }
    return A;
}

function InverseMatrix(A)   // Обратная матрица
{
    var det = Determinant(A);
    if (det == 0) return false;
    var N = A.length, invA = [];
    for (var i = 0; i < N; i++)
     { invA[i] = [];
       for (var j = 0; j < N; j++)
        { var B = [], sign = ((i+j)%2==0) ? 1 : -1;
          for (var m = 0; m < j; m++)
           { B[m] = [];
             for (var n = 0; n < i; n++)   B[m][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m][n-1] = A[m][n];
           }
          for (var m = j+1; m < N; m++)
           { B[m-1] = [];
             for (var n = 0; n < i; n++)   B[m-1][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m-1][n-1] = A[m][n];
           }
          invA[i][j] = sign*Determinant(B)/det;
        }
     }
    return invA;
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