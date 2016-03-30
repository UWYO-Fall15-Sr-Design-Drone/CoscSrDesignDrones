+==============================================================================================+
This is an overview for the ImageEdit code that will combine our map images into a master images
+==============================================================================================+
+											       +
+			NOTE: Most current information at the top        		       +
+											       +
+==============================================================================================+

Program Design Overview:
------------------------
	Must have core requirements:
	----------------------------
	1.	Loads a unknown number of images from the server to the program.
	2.	Figures out the orientation that the images were taken from on the drone.
	3.	Combines images onto a single webpage.

	Secondary program design goals:
	-------------------------------
	1.	A transparency fade between map images.
	2.	Modular coding style with many small and independent parts.
	3.	A master config text file where all fixed values will be placed.
	4.	Metadata handled by a secondary set of scripts
	
	“Nice to have” design ideas:
	----------------------------
	1.	Google Maps's API overlaid on the final webpage
	2.	Humanless and dynamic handling of all data passed to it.
	3.	Stats and data pulled from the Metadata transformed into something human readable

+==============================================================================================+
+				Image naming and mapping format:			       +
+											       +
+==============================================================================================+
Naming Format:
	1. Images coming from the phone will be stored as a .jpg
	2. Images will match the namming pattern of "Photo_X_Y.jpg
		a. Where X is longitude
		b. Where Y is Latitude
	3. The X and Y values start at 1, 1. 

Mapping Format: 
	1. The first image in the grid is lcoated in the lower left corner
	2. The next image will follow to the right of that image until the Y increases

+==============================================================================================+
+				Current programs breakdown:				       +
+											       +
+==============================================================================================+

dir_img_list.sh	
Overview: Bashscript to be run by the server to index the images placed in the directory

	dir_img_list.sh		
		\---> Creates a text document "dir_content.txt"
		   \---> If text document already exists, it is removed and then recreated with new information. 

------------------------------------------------------------------------------------------------

combine_imgs_map.sh
Overview: Bashscript to loop through all the images mapping the set pattern and then combining them into a master img
	\---> Note, see image format above
	
	combine_imgs_map.sh
		\--->Finds all the images that match our pattern

------------------------------------------------------------------------------------------------

dir_img_editSize.sh
Overview: Bashscript to be run by the server to make sure all the images in the dir are about the same size

	dir_img_editSize.sh
		\---> loops through the dir, calculating the avg length and width of the images
		   \---> Using the calculated avgs, will atempt to resize the images to the set dir avg
		      \---> Uses two set control values that limit the maxamum strech of each image
		      					\---> Will not stretch past 20% of the original aspect ratio
		      								|--->SET_X_PERCENTAGE=".20"
										\--->SET_Y_PERCENTAGE=".20"
	
------------------------------------------------------------------------------------------------

dir_img_EXIF_Scraper.sh
Overview: Bashscript to be run by the server to output our EXIF data to a handy dandy textfile.

	dir_img_EXIF_Scraper.sh
		\ --->Loops through the dir, grabbing all the exif metadata from the images
					\---> Saves the meta data as "exif_data.txt"

------------------------------------------------------------------------------------------------


ImageEdit.html
Overview: HTML with Javascript embedded to handle the combing of the images

	ImageEdit.html
	      |---> main() is called creating an HTML5 canvas environment
	      			|---> readTextFile() is called
	      			| 		|---> dir_content.txt's information is parsed
	      			|		 \---> createPhotoVariables() is called
	      			|				|--->Images are placed into Image() objects
	      			|				|--->Image() objects are placed into a global array 
	      			|---> loadImages() is called
					     |---> loadCanvas() is called
					     |		|---> The canvas object is created
			   		     |---> initializeCanvas() is called
							|---> loadImages()is called
								    |--->Images are placed onto the canvas
------------------------------------------------------------------------------------------------
!!!!This script is dead, doing this on the phone.!!!

dir_img_editImageNames.sh
Overview: Bash script to change all the photo names to the format of "Photo_#.jpg"

	dir_img_editImageNames.sh
		\--->Loops through the dir looking for photos
					\---> Uses a count to change the name matching the format

+==============================================================================================+
+			Out of date information, kept for reference			       +
+==============================================================================================+

Other program design goals:
1.	A basic API so that the app on the phone can simply pass the program the images and a config file to worth with. 
2.	A transparency fade with Google's API use.  
3.	Run everything from a config file so that other programs may edit that instead of running the imageEdit program. 
4.	Pull basic GPS info off the images and parse their data. 


Things to keep in mind: 
	-We are going to have to figure out the orientation that the image was taken from
		-Could use the GPS info from the photo? This needs to be looked at
-Might have to go inside the flight planner config file, scrape and parse that data to figure out how the images were taken in relation to the flight path. 

(Look at this link later)
http://www.w3resource.com/html5-canvas/html5-canvas-compositing.php




Problem: Javascript can't touch things it doesn't know about it. 
No way to handle to do an directory listing on a folder and pull the images in. 
What we can do, because we were talking about doing this on a webserver is first running a unix command
something like "ls | grep .jpg > imageDir.txt" should pull all our images from the current directory and 
save the list to a folder. Could run this all with a simple bash script too. 

Then we know for a fact that this file will always exists we can build a parser inside the Javascript code to to run like: var _image+count.scr.load(x,y) to dynamically pull this stuff in. 

This idea could fail here. Don't know if Javascript can dynamically add new vars. 

	NEED A WEBSERVER
		Javascript wont take in any data from the user
			We can get around this by prompting the user to give data but that sounds like a bad idea


