<?php
/**
 * 视图类
 * @author Veris
 * @update 2019-12-24
 */

namespace lib;
class View
{
	public static $params = [];

	public static function assign($item, $value)
	{
		self::$params[$item] = $value;
	}

	public static function fetch()
	{
		$path = APP_PATH . '/view/' . strtolower(__CONTROLLER__) . '.' . strtolower(__ACTION__) . '.html';
		if (!file_exists($path)) {
			throw new \Exception("不存在视图文件[{$path}]");
		}
		foreach (self::$params as $k => $v) {
			$data = var_export($v, true);
			eval("$$k = $data;");
		}
		include $path;
	}
}