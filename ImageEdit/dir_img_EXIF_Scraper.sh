!/bin/bash
#Scott Efird, last updated Feb 22 2016

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
	echo "=============================================">> $FILE 
	echo "File: $f" >> $FILE
	echo "---------------------------------------------">> $FILE 
	OUTPUT="$(identify -format %[exif:*] $f)"
	echo "${OUTPUT}" >> $FILE 
	echo "=============================================">> $FILE 
done
#Dumping us back to our home directory
cd ..
