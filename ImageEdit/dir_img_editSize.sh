#!/bin/bash
#Scott Efird, last updated Jan 25 2016

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
echo "----------------------------------------------"

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
	#echo "Sum of y is $TOTAL_Y"
	


	#Now we have both our X and Y, need to calc the ratio and compare it to 
	#our two set values. Bash only uses int so we have to use bc to get our 	floats
	CMPR_X=$(echo "$TOTAL_X/$TOTAL_Y" | bc -l)
	CMPR_Y=$(echo "$TOTAL_Y/$TOTAL_X" | bc -l)
	#echo "CMPR_X is $CMPR_X and CMPR_Y is $CMPR_Y"
done
#Calc our avgs 
AVG_X=$(echo "$TOTAL_X/$COUNT" | bc -l)
AVG_Y=$(echo "$TOTAL_Y/$COUNT" | bc -l)

#Now that we have our avg, need to fill in our bounds. 
#Lets start and find our change
X_BOUNDS=$(echo "$AVG_X - ($AVG_X * $SET_X_PERCENTAGE" | bc -l)
Y_BOUNDS=$(echo "$AVG_Y - ($AVG_Y * $SET_Y_PERCENTAGE" | bc -l)
echo "X bounds = $X_BOUNDS , Y bounds = $Y_BOUNDS"
SET_X_VAL_UPPER="0"
SET_Y_VAL_UPPER="0"
SET_X_VAL_LOWER="0"
SET_Y_VAL_LOWER="0"


echo "The total X is $TOTAL_X and the total Y is $TOTAL_Y"	
echo "The avg X is $AVG_X and $AVG_Y"

#Looping through the dir a second time, to compare images to the avg
for g in $DIR/*
do
	#Okay, there has to be a better way where we just store this data the first time we get it into an array
	#but I'm a hair short on time so I'm just going to suck it up and calc it all again. Sorry Richard Stallman
	#This code just puts our X and Y into X and Y, changed var names to help break apart the loops. 
	STR=$(identify -ping -format '%w %h' $f)
	VALX=$(echo $STR | grep -o -E '[0-9]+' | head -1 | sed -e 's/^0\+//')
	XSIZE=${#VALX}
	XSIZE=$((XSIZE + 1))
	VALY=$(echo ${STR:XSIZE})
	
	echo "Working on $g, its X is $VALX and its Y is $VALY"
	CheckValX=$(echo "$VALX - ($VALX * $SET_X_PERCENTAGE)" | bc -l)
	CheckValY=$(echo "$VALY - ($VALY * $SET_Y_PERCENTAGE)" | bc -l)
	echo "80% of X is $CheckValX and Y is $CheckValY"
done

#Dumping us back to our home directory
cd ..
