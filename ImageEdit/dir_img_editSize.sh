#!/bin/bash
#Scott Efird, last updated Jan 25 2016

#This script will check all the sizes of the images in the folder
#and then resize them to a set scale. 

#SET_PERCENTAGE is a hardcoded var that our images will not be scaled past
#For example, if we are reszing our X from 100 to 1000 and the Y is 1000
# we will never go past the 200px to keep some of the orignal aspect ratio
SET_X_PERCENTAGE=".20"
SET_Y_PERCENTAGE=".20"

clear
#The directory we are looking in
DIR="/home/waffles/git-repos/CoscSrDesignDrones/ImageEdit/Images"
#This should have all our images in it but it might be faster just to check again.
FILE="dir_content.txt"

#Moving to our dir
cd $DIR

#This line saves the number of .jpg to a var
COUNT="$(find . -type f -name '*.jpg' | wc -l)"

#Count is always 1 high? Will look into this later
let COUNT=COUNT-1

echo "There are $COUNT .jpg images in the directory."
echo "----------------------------------------------"

TOTAL_X=0
TOTAL_Y=0

#Looping through the dir
for f in $DIR/*
do	
	$STR identify -ping -format '%w %h' $f
	echo $STR | grep -o -E '[0-9]+' | head -1 | sed -e 's/^0\+//'
	echo \n
done

cd ..
