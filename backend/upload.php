<?php

// definir las direcciones
$tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
$uploadPath = ".." . DIRECTORY_SEPARATOR . "img" .DIRECTORY_SEPARATOR. "files" . DIRECTORY_SEPARATOR . $_GET["idmi"];

// crear directorio si no existe
if(!is_dir($uploadPath)){
  mkdir($uploadPath, 777);  
}

// identificar el número de archivo
$contador=1;
$dir = opendir($uploadPath);
while ($elemento = readdir($dir)){
    if( $elemento != "." && $elemento != ".."){
        $contador++;
    }
}
// mover
move_uploaded_file( $tempPath, $uploadPath .DIRECTORY_SEPARATOR. $contador );
echo $contador;
?>