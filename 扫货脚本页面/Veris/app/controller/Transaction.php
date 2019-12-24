<?php

namespace app\controller;

use app\controller\BaseController;
use lib\View;

class Transaction extends BaseController
{
	private function _getSellGoodsList($page = 1)
	{
		$data      = $this->_reqGet('getSellGoods', [
			'pageIndex' => $page,
			'tid'       => 'all',
		]);
		$goodsList = [];
		foreach ($data['playerSellUser'] as $v) {
			if (isset($v['goods']) && $v['goods']) {
				$goodsList[] = [
					'id'        => $v['_id'],
					'user'      => $v['user'],
					'name'      => $v['goods']['name'],
					'tag'       => '',
					'score'     => 0,
					'desc'      => $v['goods']['info'],
					'price'     => $v['game_gold'],
					'num'       => $v['count'],
					'status'    => $v['status'],
					'create_at' => strtotime($v['created_at']),
					'sell_at'   => strtotime($v['sell_at']),
					'type'      => 'normal',
					'type_id'   => $v['goods']['goods_type'],
					'detail'    => null,
				];
			} elseif (isset($v['user_equipment']) && $v['user_equipment']) {
				$equipmentInfo = $this->_getEquipmentInfo($v['user_equipment']);
				$goodsList[]   = [
					'id'        => $v['_id'],
					'user'      => $v['user'],
					'name'      => $v['user_equipment']['name'],
					'tag'       => $equipmentInfo['tag'],
					'score'     => $v['user_equipment']['score'],
					'desc'      => $v['user_equipment']['info'],
					'price'     => $v['game_gold'],
					'num'       => $v['count'],
					'status'    => $v['status'],
					'create_at' => strtotime($v['created_at']),
					'sell_at'   => strtotime($v['sell_at']),
					'type'      => 'zb',
					'type_id'   => 'zb_' . $v['user_equipment']['type'],
					'detail'    => [
						'type'  => $v['user_equipment']['type'],
						'attrs' => $equipmentInfo['attrs'],
					],
				];
			}
		}
		if ($goodsList) {
			$goodsList = array_merge($this->_getSellGoodsList(++$page), $goodsList);
		}
		return $goodsList;
	}

	private function _getEquipmentInfo($eq)
	{
		$attrs   = [];
		$eq_type = "武";
		if ($eq['wear_level']) {
			$attrs[] = "佩戴等级|" . $eq['wear_level'];
		}
		if ($eq['level'] > 0) {
			$attrs[] = "星|" . $eq['level'];
			$eq_type = "+" . $eq['level'] . $eq_type;
		}
		if ($eq['physical_damage'] > 0) {
			$attrs[] = "物理伤害|" . $eq['physical_damage'];
		}
		if ($eq['magic_damage'] > 0) {
			$attrs[] = "魔法伤害|" . $eq['magic_damage'];
		}
		if ($eq['physical_defense'] > 0) {
			$attrs[] = "物理防御|" . $eq['physical_defense'];
		}
		if ($eq['magic_defense'] > 0) {
			$attrs[] = "魔法防御|" . $eq['magic_defense'];
		}
		if ($eq['restore_damage'] > 0) {
			$attrs[] = "治疗能力|" . $eq['restore_damage'];
		}
		if ($eq['ph_num'] > 0) {
			$attrs[] = "气血上限|" . $eq['ph_num'];
		}
		if ($eq['force_num'] > 0) {
			$attrs[] = "武力|" . $eq['force_num'];
		}
		if ($eq['iq_num'] > 0) {
			$attrs[] = "智力|" . $eq['iq_num'];
		}
		if ($eq['faith_num'] > 0) {
			$attrs[] = "信仰|" . $eq['faith_num'];
		}
		if ($eq['speed'] > 0) {
			$attrs[] = "速度|" . $eq['speed'];
		}
		if ($eq['endurance_num'] > 0) {
			$attrs[] = "耐力|" . $eq['endurance_num'];
		}
		if ($eq['agile_num'] > 0) {
			$attrs[] = "敏捷|" . $eq['agile_num'];
		}
		if ($eq['crit'] > 0) {
			$attrs[] = "暴击|" . $eq['crit'];
		}
		if ($eq['type'] == 2) {
			// 1武器 2衣服 3头盔 4项链 5腰带 6鞋
			$eq_type = "甲";
		} else if ($eq['type'] == 3) {
			$eq_type = "头";
		} else if ($eq['type'] == 4) {
			$eq_type = "饰";
		} else if ($eq['type'] == 5) {
			$eq_type = "腰";
		} else if ($eq['type'] == 6) {
			$eq_type = "靴";
		}
		foreach ($attrs as &$v) {
			list($item, $value) = explode('|', $v);
			$v = [
				'item'  => $item,
				'value' => $value,
			];
		}
		unset($v);
		return [
			'tag'   => $eq_type,
			'attrs' => $attrs,
		];
	}

	public function index()
	{
		$goodsList = cache('goodsList');
//		$goodsList=[];
		if (!$goodsList) {
			$goodsList = $this->_getSellGoodsList();
			cache('goodsList', $goodsList, 180);
		}
		$goodsStatis = $this->_getGoodsStatis($goodsList);

		// 获取按低价升序，高评分降序排序后的商品列表
		$names  = array_column($goodsList, 'name');
		$prices = array_column($goodsList, 'price');
		$scores = array_column($goodsList, 'score');
		array_multisort($names, SORT_ASC, SORT_STRING, $scores, SORT_DESC, SORT_NUMERIC, $prices, SORT_ASC, SORT_NUMERIC, $goodsList);
//		array_multisort($scores, SORT_DESC, SORT_NUMERIC, $goodsList);
		$goodsList2 = [];
		foreach ($goodsList as $v) {
			$goodsList2[$v['type_id']]['list'][] = $v;
		}
		sort($goodsList2);
//		var_dump($goodsList2);
		View::assign('goodsList', $goodsList);
		View::assign('goodsList2', $goodsList2);
		View::assign('goodsStatis', $goodsStatis);
		return View::fetch();
	}

	protected function _getGoodsStatis($goodsList = null)
	{
		if ($goodsList === null) {
			$goodsList = $this->_getSellGoodsList();
		}
		// 计算市场均价
		$goodsStatis = [];
		foreach ($goodsList as $v) {
			if (!isset($goodsStatis[$v['name']])) {
				$goodsStatis[$v['name']] = [
					'goods_name'  => $v['name'],
					'price_total' => 0,
					'num_total'   => 0,
					'create_at'   => time(),
				];
			}
			$goodsStatis[$v['name']]['price_total'] += $v['price'];
			$goodsStatis[$v['name']]['num_total']   += $v['num'];
			$goodsStatis[$v['name']]['price_avg']   = round($goodsStatis[$v['name']]['price_total'] / $goodsStatis[$v['name']]['num_total'], 2);
		}
		return $goodsStatis;
	}

	public function buyGoods()
	{
		$goods_id = isset($_POST['goods_id']) ? $_POST['goods_id'] : '';
		try {
			$data = $this->_reqPost('byPalyerGoods', [
				'usgid' => $goods_id,
			]);
		} catch (\Exception $e) {
			return J(0, $e->getMessage());
		}
		return J(1, '购买成功');
	}
}
