var size = 100000;
		var primesPerFrame = 100//Math.sqrt(size)/4;

		

		var spiralCanvas = document.getElementById("spiral-canvas");
		var graph = [[0,0,false]];
		var maxX=1;
		var maxY=1;
		var spiral = spiralCanvas.getContext("2d");
		// spiral.fillRect(50, 25, 150, 100);

		var i = 0;
		var refresh = false;
		document.getElementById('go').addEventListener('click',function(){
			clear();
			nInput = document.getElementById("n");
			speedInput = document.getElementById("animation_speed");

			if(nInput.value.length !=0)
			{
				size = nInput.value;
			}
			if(speedInput.value.length !=0)
			{
				primesPerFrame = speedInput.value;
				
			}
			

		// var maxX=1;
		// var maxY=1;
		// var graph = [[0,0,false]];
		// var url = window.location.href;
		// var params = url.split('?');
		// size = params[1];

		generateCoordinates();
		spiralCanvas.width = maxX;
		spiralCanvas.height = maxY;
		// var spiral = spiralCanvas.getContext("2d");
		// // spiral.fillRect(50, 25, 150, 100);
		// spiralCanvas.width = maxX;
		// spiralCanvas.height = maxY;

		
		
		
		
	});	
		put_prime();

	function put_prime()
	{
		if(document.getElementById("animate").checked)
		{
			generateCoordinates();
			requestAnimationFrame(put_prime);
		}
	  	var id = spiral.createImageData(1,1); // only do this once per page
		var d  = id.data;                        // only do this once per page
		d[0]   = 255;
		d[1]   = 255;
		d[2]   = 255;
		d[3]   = 100;
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
				if(document.getElementById("animate").checked)
				{
					clear();
					i = 0;
				}
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
		var max_index = Math.floor(Math.sqrt(limit));  <!--All numbers in js are floats-->
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
			// document.write("<p>"+primes+"</p>");
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