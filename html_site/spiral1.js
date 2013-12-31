var size = 100000;
var primesPerFrame = 10//Math.sqrt(size)/4;
var spiralCanvas = document.getElementById("spiral-canvas");
var graph = [[0,0,false]];
var maxX=1;
var maxY=1;
var spiral = spiralCanvas.getContext("2d");
// spiral.fillRect(50, 25, 150, 100);

var i = 0;
var refresh = false;


generateCoordinates();
spiralCanvas.width = maxX;
spiralCanvas.height = maxY;
var id = spiral.createImageData(1,1); // only do this once per page
var d  = id.data;                        // only do this once per page
d[0]   = 255;
d[1]   = 255;
d[2]   = 255;
d[3]   = 100;

document.getElementById('spiral-canvas').addEventListener('click',put_prime);
document.getElementById('submit_sieve').addEventListener('click',outputSieve);

function put_prime()
{
	requestAnimationFrame(put_prime);


for(inc = 0; inc < primesPerFrame; inc++)
{
	if(i<graph.length)
	{

		if(graph[i][2])
		{
			// document.write("<p>"+graph[i][0]+","+ graph[i][1]+"</p>");
			spiral.putImageData( id, graph[i][0], graph[i][1]);

		}
		i++;
	// setInterval(put_prime(), 100);
	}
	else 
	{
	clear();
	i = 0;		
	}
}
}

function clear() {
spiral.fillStyle = "black";
spiral.fillRect(0, 0, spiralCanvas.width, spiralCanvas.height);
}

function sieve(limit) {
var numbers = []
for(i = 0; i<limit-2; i++)
{
	numbers.push(true);
}
var max_index = Math.floor(Math.sqrt(limit)+1);
var j = 0;
var count = 1;
for(i = 2; i<max_index; i++)
{
	if(numbers[i-2])
	{
		count = 1;
	}
	j = Math.pow(i,2);

	while(j < limit)
	{
		numbers[j-2] = false;
		j = i*i + count*i;
		count+=1;
	}

}
return numbers;
}
function printSieve(sieve) {
var primes = [];
for(n = 0; n < sieve.length;n++)
{
	if(sieve[n])
	{
		primes.push(n+2);
	}

}
return primes
}


function outputSieve()
{
document.getElementById("sieve_output").value = "";
s = sieve(parseInt(document.getElementById("prime_sieve").value));
output_primes = printSieve(s);
for(a = 0; a < output_primes.length; a++)
{
	document.getElementById("sieve_output").value+=output_primes[a]+" "
}
 
}
function generateCoordinates()
{
//var size = 1000;
var numbers = sieve(size);
var x = 0;
var y = 0;
var minX = 0;
var minY = 0;
var sign = 1;
var isHorizontal = true;
var inc = 1;
// var graph = [[0,0,false]];
var n = 1;
while(n < numbers.length-2)
{
	n+=1;
	if(isHorizontal)
	{
		x+=sign;
	}
	else
	{
		y+=sign;
	}
	graph.push([x,y,numbers[n-2]]);

	inc+=1;

	for(h=0; h<2; h++)
	{
		for(i=0; i<1; i++)
		{
			for(j=0; j<inc; j++)
			{
				n+=1;
				if(isHorizontal)
				{
					x+=sign;
				}
				else
				{
					y+=sign;
				}
				graph.push([x,y,numbers[n-2]]);

			}
			isHorizontal = !isHorizontal;

		}

	}
	sign*=-1;
	if(x < minX)
	{
		minX = x;
	}
	if(y < minY)
	{
		minY = y;
	}

	// document.write("<p>"+n+" "+inc+" "+x+" "+" "+y+"</p>");

}
// var maxX =0;
// var maxY = 0;
for(i = 0; i<graph.length;i++)
{
	graph[i][0] = graph[i][0]+Math.abs(minX);
	if(graph[i][0] > maxX)
	{
		maxX = graph[i][0];
	}
	graph[i][1] = graph[i][1] + Math.abs(minY);
	if(graph[i][1] > maxY)
	{
		maxY = graph[i][1];
	}

}

}