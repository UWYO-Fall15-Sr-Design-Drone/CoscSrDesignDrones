#!/bin/bash
#Scott Efird, last updated Feb 8 2016

#This script will check all the sizes of the images in the folder
#and then resize them to a set scale. 

#SET_PERCENTAGE is a hardcoded var that our images will not be scaled past
#For example, if we are reszing our X from 100 to 1000 and the Y is 1000
# we will never go past the 200px to keep some of the orignal aspect ratio
SET_X_PERCENTAGE=".20"
SET_Y_PERCENTAGE=".20"
#We will store our set percentage vals here, need an upper/lower bounds
SET_X_VAL_UPPER="0"
SET_Y_VAL_UPPER="0"
SET_X_VAL_LOWER="0"
SET_Y_VAL_LOWER="0"


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
echo "Maximum change to aspect ratio is: $SET_X_PERCENTAGE"
echo "-----------------------"

TOTAL_X=0
TOTAL_Y=0

#Looping through the dir
for f in $DIR/*
do	
	#Taking the output of the identify commnad and saving it in SRT
	STR=$(identify -ping -format '%w %h' $f)
	#Running some regx to find the first number and saving it in a tmp
	TMPX=$(echo $STR | grep -o -E '[0-9]+' | head -1 | sed -e 's/^0\+//')
	TOTAL_X=$((TOTAL_X + TMPX))
	#echo "Sum of x is $TOTAL_X"
	#Xsize is the number of char X is	
	XSIZE=${#TMPX}
	#Add 1 for the space
	XSIZE=$((XSIZE + 1))
	#Cutting the size of the first number off the total string
	TMPY=$(echo ${STR:XSIZE})
	TOTAL_Y=$((TOTAL_Y + TMPY))
	#Sum the Ys together. 

	#Now we have both our X and Y, need to calc the ratio and compare it to 
	#our two set values. Bash only uses int so we have to use bc to get our 	floats
	CMPR_X=$(echo "$TOTAL_X/$TOTAL_Y" | bc -l)
	CMPR_Y=$(echo "$TOTAL_Y/$TOTAL_X" | bc -l)
	#echo "CMPR_X is $CMPR_X and CMPR_Y is $CMPR_Y"
done
#This block of code finds our avg and bounds
#----------------------------------------
AVG_X=$(echo $((TOTAL_X / $COUNT)))
AVG_Y=$(echo $((TOTAL_Y / $COUNT)))

#Now that we have our avg, need to fill in our bounds. 
#Lets start and find our change
X_BOUNDS=$(echo "$AVG_X * $SET_X_PERCENTAGE" | bc -l)
Y_BOUNDS=$(echo "$AVG_Y * $SET_Y_PERCENTAGE" | bc -l)
SET_X_VAL_UPPER=$(echo "$AVG_X + $X_BOUNDS" | bc -l)
SET_Y_VAL_UPPER=$(echo "$AVG_Y + $Y_BOUNDS" | bc -l)
SET_X_VAL_LOWER=$(echo "$AVG_X - $X_BOUNDS" | bc -l)
SET_Y_VAL_LOWER=$(echo "$AVG_Y - $Y_BOUNDS" | bc -l)
#----------------------------------------
	
#Because you gotta love bash, just going to make this global var
#to work as a return val
isBuggerBool=false

#Figures out what needs to be resized
resizer(){
	local imageName=$0
	local VALX=$1
	local VALY=$2
	local file=$3

	#Comparing our image to the avg
	if [[ "$VALX" -gt "$AVG_X" ]]
	then
		isBiggerX $VALX $VALY $file 
	fi	
	if [[ "$VALY" -lt "$AVG_Y" ]]
	then
		isBiggerY $VALX $VALY $file 
	fi
	if [[ "$AVG_Y" -lt "$VALY" ]]
	then
		isBiggerY $VALX $VALY $file 
	fi
	if [[ "$AVG_X" -gt "$VALX" ]]
	then
	 	isBiggerX $VALX $VALY $file 
	fi
}

#Funtion that checks if our image X is past the set size limit
isBiggerX(){
	local VALX=$1
	local VALY=$2
	local file=$3
	#Converting our float to an int
	CheckValX=${CheckValX%.*}
	if [[ "$CheckValX" -gt "$AVG_X" ]] 
	then
		echo "New X Val is :$CheckValX"
		convert $file -resize $VALXx$VALY\! $file
	else
		echo "New X Val is :$AVG_X"
		convert $file -resize $VALXx$VALY\! $file
	fi
}

#Funtion that checks if our image Y is past the set size limit
isBiggerY(){
	local VALX=$1
	local VALY=$2
	local file=$3

	#Converting our float to an int
	CheckValY=${CheckValY%.*}
	if [[ "$CheckValY" -gt "$AVG_Y" ]]
	then
		echo "New Y Val is :$CheckValY"
		convert $file -resize $VALXx$VALY\! $file
	else
		echo "New Y Val is :$AVG_Y"
		convert $file -resize $VALXx$VALY\! $file
	fi
}

#IF Check Val is 

#Used to create the filename
nameCount=1
fileName=""

#Looping through the dir a second time, to compare images to the avg
for g in $DIR/*
do

	fileName=$(echo "Photo_$nameCount")
	nameCount=$((nameCount + 1))
	#Okay, there has to be a better way where we just store this data the first time we get it into an array
	#but I'm a hair short on time so I'm just going to suck it up and calc it all again. Sorry Richard Stallman
	#This code just puts our X and Y into X and Y, changed var names to help break apart the loops. 
	STR=$(identify -ping -format '%w %h' $g)
	VALX=$(echo $STR | grep -o -E '[0-9]+' | head -1 | sed -e 's/^0\+//')
	XSIZE=${#VALX}
	XSIZE=$((XSIZE + 1))
	VALY=$(echo ${STR:XSIZE})
	echo "Average Image size: $AVG_X  $AVG_Y and $fileName is $VALX $VALY"

	#Creating our resize amounts, doing this ahead of time even though
	#we might not use it because I don't want to have to calc it 4 times
	CheckValX=$(echo "$VALX - ($VALX * $SET_X_PERCENTAGE)" | bc -l)
	CheckValY=$(echo "$VALY - ($VALY * $SET_Y_PERCENTAGE)" | bc -l)
	#echo "80% of X is $CheckValX and Y is $CheckValY"

	#Check image size to the avg and call a resizer funtion
	#----------------------------------------
	#If by some crazy chance they are the same size
	if [[ "$AVG_X" -eq "$VALX" ]]&& [[ "$AVG_Y" -eq "$VALY" ]]
	then
		echo "Images are the same size, making no changes"	 	
	else
		#Calling our funtion checking sizes and creating a temp file name
		jpg=".jpg"
		tempFileName=$fileName$jpg
		resizer $filename $VALX $VALY $tempFileName
	fi
	#----------------------------------------

echo "-----------------------"
done

#Dumping us back to our home directory
cd ..
