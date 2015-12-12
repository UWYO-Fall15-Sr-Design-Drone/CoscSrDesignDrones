Readme file for the Drone group
========================================
Use Cases
Use Case: 1 Automate Flight
CHARACTERISTIC INFORMATION

Goal in Context: Have the drone take off, fly up, forward, backwards, rotate, and land in the same spot it took off from
Scope: Company
Level: Summary
Preconditions: We know Buyer, their address, etc.
Success End Condition: Drone flies without control, everyone drinks happily.
Failed End Condition: Drone needs retrieval, everyone drinks sadly.
Primary Actor: Drone, APX flight controller board.
Trigger: Button on RC Controller is toggled on.


MAIN SUCCESS SCENARIO
		1.	Button is toggled on.
		2.	Drone initiates startup check.
		3.	Drone takes off and flies 20 feet into the air.
		4.	Drone hoovers for 5 seconds.
		5.	Drone flies forward 15 feet.
		6.	Drone flies backwards for 5 feet.
		7.	Drone spins around to face takeoff pad.
		8.	Drone flies forward 10 feet to pad.
		9.	Drone lands.
EXTENSIONS
		•	2a. Drone fails initial startup check
			o	2.a1 Power off and on Drone, try again.
SUB-VARIATIONS
		•	2a. Drone fails pre-setup check.
RELATED INFORMATION
Priority: top
Performance Target: 5-minutes max
Frequency: 5 times for testing
Superordinate Use Case: 
Subordinate Use Cases:
Channel to primary actor: Drone
Secondary Actors: RC Controller.
Channels to Secondary Actors:
OPEN ISSUES
		•	What happens if the Drone goes off course? 
		•	What happens if the drone crashes into something?
SCHEDULE
Due Date: January 15, 2016

Use Cases
Use Case: 2 Automated User Mapping
CHARACTERISTIC INFORMATION
Goal in Context: A user sets the flight zone and other configurable from mobile device. Upon a successful flight a map of the flight zone will be returned to the user.
Scope: Company 
Level: Primary task
Preconditions: Drone and phone both have charged batteries.
Success End Condition: User has high resolution map of area.
Failed End Condition: User has no map.
Primary Actor: Drone and User.
Trigger: Start button on users app.
MAIN SUCCESS SCENARIO
		1.	User sets map and accepts user’s agreement.
		2.	User attaches phone to drone.
		3.	User hits ‘Start’ on the app to initiate flight.
		4.	Drone takes map and flies a pattern until the entire area is mapped.
		5.	Drone lands.
		6.	Pictures are upload to server.
		7.	Server parses photos and creates one large picture
		8.	Map is emailed to user
EXTENSIONS
		•	1a. User does not accept user agreement 
			o	1.a1 App shuts down.
		•	4a. Drone does not fly correct pattern
			o	4.a1 User restarts application and tries again.
		•	6a. Some pictures are not uploaded to server
			o	User will be notified and asked to provide missing photos
		•	7a. Photos cannot be parsed.
			o	7.a1 User will be asked to upload unparsed photos.
		•	7.a1 Photos still cannot be parsed.
			o	7.a1.1 user will be asked to fly the rout again.

SUB-VARIATIONS
		•	1a. User may not like user agreement.
		•	4a. GPS signal may get temporarily lost.
		•	6a. Any number of internet reliability issues may cause photos to not successfully upload.
		•	7a. Bits could be missing after upload, i.e. partial or corrupted upload.
RELATED INFORMATION
Priority: top
Performance Target: Depending on size of area, no longer than 20 minutes.
Frequency: Once a day
Superordinate Use Case: 
Subordinate Use Cases: 

Channel to primary actor: Phone and Drone
Secondary Actors: SQL database, Parsing Scripts, Google Maps, Email Service
Channels to Secondary Actors:
OPEN ISSUES
		•	No Wifi or 3G when flying?
		•	What happens if the Drone or phone run out of batteries?
		•	What will the Drone do if there is bad weather?
		•	What if the server becomes unreachable?
SCHEDULE
Due Date: February 1, 2016





========================================
Mission Statement: 

	Project	
	 Deliverables	
	  Requirements
	
	Deliver a Beer		
		Get Drone and Computer Communicating	
			Download software
			Establish Communication link
			
		Automate Flight	
			Take off and land
			Lift off and rotate
			Fly x feet and fly back
			Fly to GPS coordinates and back
			
		Deliver beer	
			Manually lift and fly beer
			Fly and retriever beer
			Drink Beer
			
	Google Map Overlay		
		Take Picture	
			Take a picture
			Upload picture to computer
			Figure scale on picture
		Picture manipulation	
			Get metadata off pictures - GPS/Altitudes
			Stich pictures together
			Scale and layer pictures to make single image
			
		Map Overlay	
			Put single picture on google maps
			Overlay large image onto google maps
			
Helpful sites:
http://www.xheli.com/05p-flightcontrol-mega-mx.html
