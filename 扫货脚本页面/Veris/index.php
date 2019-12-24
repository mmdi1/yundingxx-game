<?php
/**
 * 爱贪玩助手 - 云顶修仙
 * @author Veris
 * @update 2019-12-24
 */

define('ROOT_PATH', __DIR__);
define('APP_PATH', __DIR__ . '/app');

$s = isset($_GET['s']) ? $_GET['s'] : '';
@list($module, $controller, $action) = explode('/', $s);
is_null($module) && $module = 'index';
is_null($controller) && $controller = 'index';
is_null($action) && $action = 'index';
$controller = ucfirst($controller);
$action     = strtolower($action);
define('__MODULE__', $module);
define('__CONTROLLER__', $controller);
define('__ACTION__', $action);

foreach (glob(__DIR__ . '/app/controller/*.php') as $start_file) {
	require_once $start_file;
}
foreach (glob(__DIR__ . '/app/lib/*.php') as $start_file) {
	require_once $start_file;
}
require_once ROOT_PATH . '/app/function.php';

$className = 'app\\controller\\' . $controller;
if (!class_exists($className)) {
	throw new \Exception("不存在控制器[{$controller}]");
}
$class = new $className();
if (!method_exists($class, $action)) {
	throw new \Exception("不存在方法[{$action}]");
}
echo $class->$action();