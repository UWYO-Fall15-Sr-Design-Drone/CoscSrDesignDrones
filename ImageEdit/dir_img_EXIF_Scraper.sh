!/bin/bash
#Scott Efird, last updated Feb 8 2016

#This will open a dir, hunt for all the images and then 
#output all the exif data into a text file. 

clear
#The directory we are looking in
DIR="/home/waffles/git-repos/CoscSrDesignDrones/ImageEdit/Images"
FILE="exif_data.txt"
#Moving to our dir

cd $DIR

if [ -f $FILE ]; then
	echo "---------------------------------------------"
	echo "~/git-repos/.../exif_data.txt already exists."
	echo "Removing old exif_data.txt"
	echo "---------------------------------------------"
	rm $FILE
fi



#Looping through the dir
for f in *.jpg; do
 	#TODO
	#Add if statement to check if image.
	echo "============================================="
	echo "File: $f" >> $FILE
	echo "---------------------------------------------"
	string=$(echo identify -format %[exif:*] $f) 
	echo string >> $FILE
	echo "============================================="
done
#Dumping us back to our home directory
cd ..
