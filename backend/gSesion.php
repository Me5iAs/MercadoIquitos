<?php
session_start();
// unset($_SESSION["sId"]       );
// unset($_SESSION["sIdPersona"]);
// unset($_SESSION["sUsuario"]  );
// unset($_SESSION["sIdPerfil"] );

    $data = json_decode(file_get_contents('php://input'));
    if ($data->a=="set"){
        require_once('gQuery.php');
        $ObjCn = new Conexion();        
        $sql ="CALL sp_usuario_login('".$data->Usuario."', '".$data->Clave."')";
        // echo $sql;
        $rs = $ObjCn->EjecutarStore($sql);
        if (mysqli_num_rows($rs)>0){
            $f = mysqli_fetch_array($rs);
            $_SESSION["sId"]        = $f[0];
            $_SESSION["sIdPersona"] = $f[1];
            $_SESSION["sNombre"]    = $f[2];
            $_SESSION["sApellidos"] = $f[3];
            $_SESSION["sOpciones"]  = $f[4];

            echo(json_encode($_SESSION));
        }
    }elseif($data->a=="get"){
        if (isset($_SESSION['sId'])){
            print "g";
        }
    }elseif($data->a=="opc"){
        if (isset($_SESSION['oCod'])){
            $arr = explode(",", $_SESSION["oOpciones"]);    
            $length = count($arr);    
            $length2 = count($arr); 
            $length3 = count($arr); 
            $cn1 = 0;
            $cn2 = 0;
            $cn3 = 0;

            //revisar padres
            for ($i = 0; $i < $length; $i++) {     
                $padre = explode("|",$arr[$i]);

                if ($padre[2]==1){
                    $array[$cn1]['opCod'] = $padre[0];
                    $array[$cn1]['Ficha'] = $padre[3];
            
                    // hijo
                    $cn2 = 0;
                    for ($j = 0; $j < $length2; $j++){                
                        // echo $i . " ->  $length " . $j;
                        $hijo = explode("|",$arr[$j]);
                        if ($hijo[2]==2 && $hijo[1]==$padre[0]){
                            $array[$cn1]['marco'][$cn2]['opCod'] = $hijo[0];
                            $array[$cn1]['marco'][$cn2]['Campo'] = $hijo[3];

                            //nieto
                            $cn3 = 0;

                            for($k =0; $k< $length3; $k++){                        
                                $nieto = explode('|',$arr[$k]);
                                if ($nieto[2]==3 && $nieto[1]==$hijo[0]){
                                    $array[$cn1]['marco'][$cn2]['opcion'][$cn3]['opCod'] = $nieto[0];
                                    $array[$cn1]['marco'][$cn2]['opcion'][$cn3]['Opcion'] = $nieto[3];
                                    $array[$cn1]['marco'][$cn2]['opcion'][$cn3]['icono'] = $nieto[4];
                                    $array[$cn1]['marco'][$cn2]['opcion'][$cn3]['Direccion'] = $nieto[5];
                                    $cn3++;
                                }
                            }
                            $cn2++;
                        }
                    }
                    $cn1++;
                }
            }
            echo(json_encode($array));
        } 
    }elseif($data->a=="del"){
            unset($_SESSION["sId"]       );
            unset($_SESSION["sIdPersona"]);
            unset($_SESSION["sNombre"]   );
            unset($_SESSION["sApellidos"]);
            unset($_SESSION["sOpciones"] );
    }
?>