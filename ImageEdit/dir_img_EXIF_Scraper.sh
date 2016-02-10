!/bin/bash
#Scott Efird, last updated Feb 8 2016

#This will open a dir, hunt for all the images and then 
#output all the exif data into a text file. 

clear
#The directory we are looking in
DIR="/home/waffles/git-repos/CoscSrDesignDrones/ImageEdit/Images"

#Moving to our dir
cd $DIR

#Looping through the dir
for f in *.jpg; do
	
	#TODO
	#Add if statement to check if image.
	identify -verbose f | grep "exif:"
done
#Dumping us back to our home directory
cd ..
