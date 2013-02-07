<?php
include('../errorHandler.php');
include('../settings.php');

$class = explode('/',$_SERVER['REQUEST_URI']);

if ($class[1] == '') {
    $class[1] = 'app';
}
if (!class_exists($class[1])) { jsonNotFound(); }

$page = new $class[1]($class);