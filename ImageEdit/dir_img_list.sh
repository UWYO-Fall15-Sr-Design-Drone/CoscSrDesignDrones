#!/bin/bash
#Scott Efird, last updated Jan25 2016

#This script looks in the dir listed below and prints a text file
#called "dir_content.txt" with a list of jpg images in the directory.

#Everything is currently hardcoded, not sure why we would make this dynamic. -Scotty

#Clears the terminal
clear
#The directory we are looking in
DIR="~/git-repos/CoscSrDesignDrones/ImageEdit/Images"
FILE="dir_content.txt"

#Checking and removing the old dir_content file.
if [ -f $FILE ]; then
	echo "~/git-repos/.../dir_content.txt already exists."
	echo "Removing old dir_content.txt"
	rm $FILE
fi

#Listing the directory and grabbing only the jpg files from it. 
cd /home/waffles/git-repos/CoscSrDesignDrones/ImageEdit/Images
for file in DIR
do
	ls | grep .jpg > dir_content.txt
done

#Copying file from image dir up upper dir
cp dir_content.txt ..
#Removing orignal file
rm dir_content.txt
#Moving up a dir to check to make sure the file was created
cd ..
#Checking to see if the new file was created
if [ -f $FILE ]; then
	echo "dir_content.txt was created successfully."
else
	echo "Something happend, new dir_content.txt WAS NOT created."
fi
