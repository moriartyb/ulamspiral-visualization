from PIL import Image
import numpy as np 
import Tkinter as tk
import sys


global x
global y
def displaySpiral(coordinates1,w,h):
	print "Displaying spiral"
	global coordinates
	global incr
	global data
	global canvas
	global root
	global im
	global spiral
	coordinates=coordinates1
	data = np.empty( (w,h,3), dtype=np.uint8)
	data.fill(0)
	color = [0,255,0]
	root = tk.Tk() 
	w = tk.Label(root, text= "Ulam's Spiral")
	w.pack()
	im = Image.open("spiral.png")
	basewidth = 600


	wpercent = (basewidth / float(im.size[0]))
	hsize = int((float(im.size[1]) * float(wpercent)))
	im = im.resize((basewidth, hsize), Image.ANTIALIAS)
	im.save('spiral-resized.png')
	spiral = tk.PhotoImage(file="spiral-resized.png")

	canvas = tk.Canvas(root,width=im.size[0],height=im.size[1])
	canvas.create_image(0,0, image=spiral,anchor=tk.NW)
	canvas.pack()
	root.mainloop()
	# 	spiral = Image.fromarray(data,'RGB')		# Uses PIL
	# 	spiral.save('spiral.png')					# uses PIL

	# 	if(coordinate[2]):
	# 		if(coordinate[3]):
	# 			data[coordinate[0],coordinate[1]]=patterned
	# 		else:
	# 			data[coordinate[0],coordinate[1]]=color
								


def makePNG(coordinates,w,h):
	#Convert Coordinates to array of pixels
	print "Generating image file and saving to spiral.png"
	data = np.empty( (w,h,3), dtype=np.uint8)
	data.fill(0)
	color = [0,255,0]
	for coordinate in coordinates:
		if(coordinate[2]):
			data[coordinate[0],coordinate[1]]=color
								
	spiral = Image.fromarray(data,'RGB')		# Uses PIL
	spiral.save('spiral.png')					# uses PIL
def generateCoordinates(limit):
	limit = int(limit)
	numbers = sieve(limit)
	global x
	global y
	x = 0
	y = 0
	minX = 0
	minY = 0
	sign = 1
	isHorizontal = True 
	inc = 1
	graph = [[0,0,False]] #Initial case n = 1
	n = 1			
	while(n < len(numbers)-2):
		print "Coordinates "+str(int(float(n)/limit * 100)) + "% generated"
		#The "1" jump
		n+=1
			
		if isHorizontal:
			x+=sign
		else:
			y+=sign
		graph.append([x,y,numbers[n-2]])
		
		inc+=1	#increase increment after every "inc" jump and single jump
		#The "inc" jump
		try:		
			for h in xrange(2):
				for i in xrange(1):   # x then y -- toggle orientation
					for j in xrange(inc):
			
						n+=1	
						if isHorizontal:
							x+=sign
						else:
							y+=sign
						graph.append([x,y,numbers[n-2]])
					isHorizontal = not isHorizontal   # change orientation every 1
		except IndexError:
			break
			
		sign*=-1  #change direction every 2
		if x < minX:
			minX = x
		if y < minY:
			minY = y
		
		

				
		#2-D array [x,y,isPrime]
	
		#keep track of minimum value and add it at the end
	maxX = 0
	maxY = 0
	for i in xrange(len(graph)):
		graph[i][0] = graph[i][0]+abs(minX)	
		if(graph[i][0] > maxX):
			maxX = graph[i][0]
		graph[i][1] = graph[i][1]+abs(minY)
		if(graph[i][1] > maxY):
			maxY = graph[i][1]
	# for row in graph:
	# 	print row	

	x = maxX
	y = maxY

	return graph
def sieve(limit):
	limit = int(limit)
	numbers = [True]*(limit-2)
	max_index = int(limit**0.5)+1	
	
	for i in range(2,max_index):
	    if numbers[i-2]:
	    	count = 1
		j = i**2
		print j
		while(j < limit):
			numbers[j-2] = False
			print "index" + str(j - 2)
			j=i**2 + count*i
			count+=1		
	return numbers
def printSieve(sieve): 
	primes = []
	for n in xrange(len(sieve)):
		if sieve[n] == True:
			primes.append(n+2)
	print primes
def printNPrimes(n):
	return printSieve(sieve(n))


if len(sys.argv) == 2 and sys.argv[1].isdigit():
	userIn = int(sys.argv[1])
else:
	userIn = raw_input("Size of spiral:")
if(not str(userIn).isdigit()):
	sys.exit()

print "Generating spiral to N" 

printNPrimes(1000)
#coord = generateCoordinates(userIn)
#makePNG(coord,x+1,y+1)   #making the last variable!=1 will break the spiral.
#displaySpiral(coord,x+1,y+1)


