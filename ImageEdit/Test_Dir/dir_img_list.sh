#!/bin/bash
#Scott Efird, last updated Jan 4 2016

#This script looks in the dir listed below and prints a text file
#called "dir_content.txt" with a list of jpg images in the directory.

#Everything is currently hardcoded, not sure why we would make this dynamic. -Scotty

#Clears the terminal
clear
#The directory we are looking in
DIR="~/git-repos/CoscSrDesignDrones/ImageEdit/Test_Dir"
FILE="dir_content.txt"

#Checking and removing the old dir_content file.
if [ -f $FILE ]; then
	echo "~/git-repos/.../Test_Dir/dir_content.txt already exists."
	echo "Removing old dir_content.txt"
	rm $FILE
fi

#Listing the directory and grabbing only the jpg files from it. 
for file in DIR
do
	ls | grep .jpg > dir_content.txt
done

#Checking to see if the new file was created
if [ -f $FILE ]; then
	echo "dir_content.txt was created successfully."
else
	echo "Something happend, new dir_content.txt WAS NOT created."
fi
