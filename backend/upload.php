<?php


$tempPath = $_FILES[ 'file' ][ 'tmp_name' ];

// $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
$uploadPath = ".." . DIRECTORY_SEPARATOR . "img" .DIRECTORY_SEPARATOR. "files" . DIRECTORY_SEPARATOR . $_GET["idmi"];
// echo $uploadPath;
if(!is_dir($uploadPath)){
  mkdir($uploadPath, 777);  
}

$contador=1;
$dir = opendir($uploadPath);
while ($elemento = readdir($dir)){
    if( $elemento != "." && $elemento != ".."){
        $contador++;
    }
}
echo $contador;

// // $uploadPath = '../img/files/';
// // $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];

// // 
move_uploaded_file( $tempPath, $uploadPath .DIRECTORY_SEPARATOR. $contador );

// $answer = array( 'answer' => 'File transfer completed' );
// $json = json_encode( $answer );

// echo $json;


?>