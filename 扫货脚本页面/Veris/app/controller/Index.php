<?php

namespace app\controller;

use app\controller\BaseController;
use lib\View;

class Index extends BaseController
{
	public function index()
	{
		return View::fetch();
	}
}