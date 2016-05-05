//@dev Sam Smith
//@purpose ACS Website
//@description A simple php script that takes 64 bit image data and saves it to a .png file


//intake data
$fileStr = ($_POST['inputFile'], FILTER_SANITIZE_STRING);
$imageName = ($_POST['inputName'], FILTER_SANITIZE_STRING);
$filePath = ($_POST['inputLocation], FILTER_SANITIZE_STRING);

//explode data
list($type, $fileStr) = explode(';', $fileStr);
list(, $fileStr)      = explode(',', $fileStr);

//decode string
$fileStr = base64_decode($fileStr);

//save file
file_put_contents($filePath.'/'.$imageName.'.png', $fileStr);