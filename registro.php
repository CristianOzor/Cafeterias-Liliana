<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>database</title>
</head>
<body>

    <?php
        //base de datos
        $servername = "localhost";
        $database = "cafeteria";
        $username = "Cristian";
        $password = "Cerbero07";

        //recuperación de variables del html
        $nombre = $_POST['nombre'];
        $email = $_POST['email'];
        $telefono = $_POST['telefono'];
        $ciudad = $_POST['ciudad'];
        $motivo = $_POST['motivo_contacto'];

        //Conexion a la database
        $conexion = mysqli_connect($servername,$username,$password,$database);

        //ingresando valores 
        $sql = "INSERT INTO contacto (nombre, email, telefono, ciudad, motivo) 
        values ('$nombre','$email','$telefono','$ciudad','$motivo')";

        if (mysqli_query($conexion, $sql)){
            echo "Registro completado";
        }
    ?>
    <br>
    <button><a href="./contacto.html">Regresar al inicio</a></button>

</body>
</html>