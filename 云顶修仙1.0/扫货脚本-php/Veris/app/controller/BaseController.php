<?php

namespace app\controller;
use lib\HttpService;

class BaseController
{
	protected $config = [];

	public function __construct()
	{
		$this->controller = __CONTROLLER__;
		$this->action     = __ACTION__;
	}

	protected function _reqGet($api, $params)
	{
		$url  = 'http://joucks.cn:3344/api/' . $api;
		$res  = HttpService::get($url, $params, 5, [
			config('game.cookie'),
		]);
		$data = json_decode($res, true);
		if (!isset($data['code'])) {
			throw new \Exception('请求接口错误');
		}
		if ($data['code'] != 200) {
			throw new \Exception($data['msg']);
		}
		return $data['data'];
	}

	protected function _reqPost($api, $params)
	{
		$url  = 'http://joucks.cn:3344/api/' . $api;
		$res  = HttpService::post($url, $params, 5, [
			config('game.cookie'),
		]);
		$data = json_decode($res, true);
		if (!isset($data['code'])) {
			throw new \Exception('请求接口错误');
		}
		if ($data['code'] != 200) {
			throw new \Exception($data['msg']);
		}
		return $data['data'];
	}
}