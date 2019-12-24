<?php
/**
 * 公共函数
 * @author Veris
 * @update 2019-12-24
 */

function config($key)
{
	if (trim($key) === '') {
		return null;
	}
	$config = include APP_PATH . '/config.php';
	$keys   = explode('.', $key);
	$str    = 'return $config';
	foreach ($keys as $v) {
		$str .= "['{$v}']";
	}
	$str .= ';';
	return eval($str);
}

function J($code, $msg, $data = [])
{
	header('content-type:appliaction/json;charse=utf-8');
	$return = [
		'code'      => $code,
		'msg'       => $msg,
		'data'      => $data,
		'timestamp' => time(),
	];
	die(json_encode($return));
}

function cache($key, $value = null, $expire = null)
{
	$path = ROOT_PATH . '/runtime/cache/' . md5($key) . '.php';
	if ($value === null) {
		if (!file_exists($path)) {
			return null;
		}
		// 过期判断
		$expireTime = include $path;
		if ($expireTime != -1 && $expireTime < time()) {
			unlink($path);
			return null;
		}
		$content = file_get_contents($path);
		$need    = 'veris_serialize:';
		return unserialize(substr($content, strpos($content, $need) + strlen($need)));
	} else {
		$data = serialize($value);
		if ($expire === null) {
			$expireTime = -1;
		} else {
			$expireTime = time() + $expire;
		}
		file_put_contents($path, <<<EOF
<?php 
return {$expireTime};
exit();
?>
veris_serialize:{$data}
EOF
		);
		return true;
	}
}