#!/bin/bash
#Scott Efird, last updated Jan 25 2016

#This script will check all the sizes of the images in the folder
#and then resize them to a set scale. 

#SET_PERCENTAGE is a hardcoded var that our images will not be scaled past
#For example, if we are reszing our X from 100 to 1000 and the Y is 1000
# we will never go past the 200px to keep some of the orignal aspect ratio
SET_X_PERCENTAGE=".20"
SET_Y_PERCENTAGE=".20"

#The directory we are looking in
DIR="~/git-repos/CoscSrDesignDrones/ImageEdit"
#This should have all our images in it but it might be faster just to check again.
FILE="dir_content.txt"
#This line saves the number of .jpg to a var
COUNT="$(find . -type f -name '*.jpg' | wc -l)"
echo "${COUNT}" 
