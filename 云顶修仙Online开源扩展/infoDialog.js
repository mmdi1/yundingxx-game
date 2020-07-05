// ==UserScript==
// @name         test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  enjoy left!
// @author       智慧树
// @match        http://yundingxx.com:3366/
// @grant        unsafeWindow
// @require      https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js
// @require      https://cdn.jsdelivr.net/npm/element-ui@2.13.2/lib/index.js
// @require      https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.js
// ==/UserScript==

'use strict';

$('head').append(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-ui@2.13.2/lib/theme-chalk/index.css">`)

// unsafeWindow.my = null

$('.username').append(`
<div id="newApp">
    <el-dialog :visible.sync="visible" title="个人信息" width='50%' :modal='false' :append-to-body='true'>
      <el-tabs :tab-position="'left'" style="height: 100%" @tab-click='changeTab'>
        <el-tab-pane label="人物信息">
          <el-row style="text-align: left">
            <el-col :span='6'>
              <span>角色:</span>
              <span>{{userInfo.nickname}}</span>
            </el-col>
            <el-col :span='6'>
              <span>等级:</span>
              <span>{{userInfo.level}}</span>
            </el-col>
          </el-row>
          <!-- 个人属性 -->
          <el-row style="text-align: left">
            <el-col :span='6'>
              <div>
                <span>血量:</span>
                <span>{{userInfo.hp}}</span>
              </div>
              <div>
                <span>物理攻击:</span>
                <span>{{parseInt(userInfo.physical_damage)}}</span>
              </div>
              <div>
                <span>物理暴击:</span>
                <span>{{parseInt(userInfo.physical_crit)}}</span>
              </div>
              <div>
                <span>物理防御:</span>
                <span>{{parseInt(userInfo.physical_defense)}}</span>
              </div>
            </el-col>
            <el-col :span='6'>
              <div>
                <span>魔力:</span>
                <span>{{userInfo.mp}}</span>
              </div>
              <div>
                <span>法术攻击:</span>
                <span>{{parseInt(userInfo.magic_damage)}}</span>
              </div>
              <div>
                <span>法术暴击:</span>
                <span>{{parseInt(userInfo.magic_crit)}}</span>
              </div>
              <div>
                <span>法术防御:</span>
                <span>{{parseInt(userInfo.magic_defense)}}</span>
              </div>
            </el-col>
            <el-col :span='6'>
              <div>
                <span>速度:</span>
                <span>{{parseInt(userInfo.speed)}}</span>
              </div>
              <div>
                <span>治疗:</span>
                <span>{{parseInt(userInfo.restore_damage)}}</span>
              </div>
              <div>
                <span>闪避:</span>
                <span>{{parseInt(userInfo.dodge)}}</span>
              </div>
            </el-col>
            <!-- 生活技能 -->
            <el-col :span='6'>
              <div style="font-size: 18px;">生活技能</div>
              <div>
                <span>强身:</span>
                <span>{{userInfo.fation_hp_level}}</span>
              </div>
              <div>
                <span>冥想:</span>
                <span>{{userInfo.fation_mp_level}}</span>
              </div>
              <div>
                <span>神速:</span>
                <span>{{userInfo.fation_speed_level}}</span>
              </div>
              <div>
                <span>烹饪:</span>
                <span>{{userInfo.fation_cooking_level}}</span>
              </div>
              <div>
                <span>炼药:</span>
                <span>{{userInfo.fation_drug_level}}</span>
              </div>
              <div>
                <span>打造:</span>
                <span>{{userInfo.fation_build_level}}</span>
              </div>
              <div>
                <span>机关:</span>
                <span>{{userInfo.fation_mechanism_level}}</span>
              </div>
              <div>
                <span>追捕:</span>
                <span>{{userInfo.fation_zhuibu_level}}</span>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="武器装备">
          <el-row>
            <el-col :span='3'>
              <div class="clothes-title">武器饰品</div>
              <div v-for='item in leftWap' :key='item.id' class="wap-item">
                <!-- 武器 -->
                <el-popover placement="right" title="装备信息" width="150" trigger="hover" v-if='item.eq_type === 1'>
                  <div>
                    <div>
                      {{item.info}}
                    </div>
                    <div>
                      <span>佩戴等级:</span>
                      <span>{{item.wear_level}}</span>
                    </div>
                    <div>
                      <span>物理伤害:</span>
                      <span>{{item.physical_damage}}</span>
                    </div>
                    <div>
                      <span>法术伤害:</span>
                      <span>{{item.magic_damage}}</span>
                    </div>
                    <div>
                      <span>治疗:</span>
                      <span>{{item.restore_damage}}</span>
                    </div>
                    <div v-if='item.physical_crit !== 0' style='color:violet;font-weight:500;'>
                      <span>物理暴击:</span>
                      <span>{{item.physical_crit}}</span>
                    </div>
                    <div v-if='item.magic_crit !== 0' style='color:violet;font-weight:500;'>
                      <span>法术暴击:</span>
                      <span>{{item.magic_crit}}</span>
                    </div>
                    <div v-if='item.str !== 0' style='color:green;font-weight:500;'>
                      <span>耐</span>
                      <span>{{item.str}}</span>
                    </div>
                    <div v-if='item.vit !== 0' style='color:green;font-weight:500;'>
                      <span>武</span>
                      <span>{{item.vit}}</span>
                    </div>
                    <div v-if='item.agi !== 0' style='color:green;font-weight:500;'>
                      <span>速</span>
                      <span>{{item.agi}}</span>
                    </div>
                    <div v-if='item.int !== 0' style='color:green;font-weight:500;'>
                      <span>魔</span>
                      <span>{{item.int}}</span>
                    </div>
                    <div v-if='item.con !== 0' style='color:green;font-weight:500;'>
                      <span>体</span>
                      <span>{{item.con}}</span>
                    </div>
                    <div v-if='item.skill' style="color:orchid;">
                      <span>特效</span>
                      <span>{{item.skill}}</span>
                    </div>
                    <div>
                      <span>评分:</span>
                      <span>{{item.score}}</span>
                    </div>
                  </div>
                  <div slot="reference" v-if='item.wear_level >= 50'
                    style="text-shadow:1px 1px px darkgoldenrod;color:darkgoldenrod;">
                    {{item.name}}
                  </div>
                  <div slot="reference" v-if='item.wear_level < 50'>
                    {{item.name}}
                  </div>
                </el-popover>
                <!-- 项链 -->
                <el-popover placement="right" title="装备信息" width="150" trigger="hover" v-if='item.eq_type === 4'>
                  <div>
                    <div>
                      {{item.info}}
                    </div>
                    <div>
                      <span>佩戴等级:</span>
                      <span>{{item.wear_level}}</span>
                    </div>
                    <div>
                      <span>魔法伤害:</span>
                      <span>{{item.magic_damage}}</span>
                    </div>
                    <div>
                      <span>魔法防御:</span>
                      <span>{{item.magic_defense}}</span>
                    </div>
                    <div>
                      <span>治疗能力:</span>
                      <span>{{item.restore_damage}}</span>
                    </div>
                    <div v-if='item.physical_crit !== 0' style='color:violet;font-weight:500;'>
                      <span>物理暴击:</span>
                      <span>{{item.physical_crit}}</span>
                    </div>
                    <div v-if='item.magic_crit !== 0' style='color:violet;font-weight:500;'>
                      <span>法术暴击:</span>
                      <span>{{item.magic_crit}}</span>
                    </div>
                    <div v-if='item.str !== 0' style='color:green;font-weight:500;'>
                      <span>耐</span>
                      <span>{{item.str}}</span>
                    </div>
                    <div v-if='item.vit !== 0' style='color:green;font-weight:500;'>
                      <span>武</span>
                      <span>{{item.vit}}</span>
                    </div>
                    <div v-if='item.agi !== 0' style='color:green;font-weight:500;'>
                      <span>速</span>
                      <span>{{item.agi}}</span>
                    </div>
                    <div v-if='item.int !== 0' style='color:green;font-weight:500;'>
                      <span>魔</span>
                      <span>{{item.int}}</span>
                    </div>
                    <div v-if='item.con !== 0' style='color:green;font-weight:500;'>
                      <span>体</span>
                      <span>{{item.con}}</span>
                    </div>
                    <div v-if='item.skill' style="color:orchid;">
                      <span>特效</span>
                      <span>{{item.skill}}</span>
                    </div>
                    <div>
                      <span>评分:</span>
                      <span>{{parseInt(item.score)}}</span>
                    </div>
                  </div>
                  <div slot="reference" v-if='item.wear_level >= 50'
                    style="text-shadow:1px 1px px darkgoldenrod;color:darkgoldenrod;">
                    {{item.name}}
                  </div>
                  <div slot="reference" v-if='item.wear_level < 50'>{{item.name}}</div>
                </el-popover>
                <!-- 腰带 -->
                <el-popover placement="right" title="装备信息" width="150" trigger="hover" v-if='item.eq_type === 5'>
                  <div>
                    <div>
                      {{item.info}}
                    </div>
                    <div>
                      <span>佩戴等级:</span>
                      <span>{{item.wear_level}}</span>
                    </div>
                    <div>
                      <span>物理防御:</span>
                      <span>{{parseInt(item.physical_defense)}}</span>
                    </div>
                    <div>
                      <span>气血:</span>
                      <span>{{parseInt(item.hp_cap)}}</span>
                    </div>
                    <div v-if='item.physical_crit !== 0' style='color:violet;font-weight:500;'>
                      <span>物理暴击:</span>
                      <span>{{item.physical_crit}}</span>
                    </div>
                    <div v-if='item.magic_crit !== 0' style='color:violet;font-weight:500;'>
                      <span>法术暴击:</span>
                      <span>{{item.magic_crit}}</span>
                    </div>
                    <div v-if='item.str !== 0' style='color:green;font-weight:500;'>
                      <span>耐</span>
                      <span>{{item.str}}</span>
                    </div>
                    <div v-if='item.vit !== 0' style='color:green;font-weight:500;'>
                      <span>武</span>
                      <span>{{item.vit}}</span>
                    </div>
                    <div v-if='item.agi !== 0' style='color:green;font-weight:500;'>
                      <span>速</span>
                      <span>{{item.agi}}</span>
                    </div>
                    <div v-if='item.int !== 0' style='color:green;font-weight:500;'>
                      <span>魔</span>
                      <span>{{item.int}}</span>
                    </div>
                    <div v-if='item.con !== 0' style='color:green;font-weight:500;'>
                      <span>体</span>
                      <span>{{item.con}}</span>
                    </div>
                    <div v-if='item.skill' style="color:orchid;">
                      <span>特效</span>
                      <span>{{item.skill}}</span>
                    </div>
                    <div>
                      <span>评分:</span>
                      <span>{{parseInt(item.score)}}</span>
                    </div>
                  </div>
                  <div slot="reference" v-if='item.wear_level >= 50'
                    style="text-shadow:1px 1px px darkgoldenrod;color:darkgoldenrod;">
                    {{item.name}}
                  </div>
                  <div slot="reference" v-if='item.wear_level < 50'>{{item.name}}</div>
                </el-popover>
              </div>
            </el-col>
            <el-col :span='12'>
              <div align='center'>
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593343846064&di=97a86fe902b9754de368f02e336e4eab&imgtype=0&src=http%3A%2F%2Fwww.11xzb.com%2Fd%2Ffile%2Fmoban5%2F201909020832%2F1567158444899421.png"
                  class="xiuxian-img">
              </div>
            </el-col>
            <el-col :span='3'>
              <div class="clothes-title">衣服装备</div>
              <div v-for='item in rightBase' :key='item.id' class="wap-item">
                <!-- 衣服 -->
                <el-popover placement="left" title="装备信息" width="150" trigger="hover" v-if='item.eq_type === 2'>
                  <div>
                    <div>
                      {{item.info}}
                    </div>
                    <div>
                      <span>佩戴等级:</span>
                      <span>{{item.wear_level}}</span>
                    </div>
                    <div>
                      <span>物理防御</span>
                      <span>{{parseInt(item.physical_defense)}}</span>
                    </div>
                    <div>
                      <span>魔法防御</span>
                      <span>{{parseInt(item.magic_defense)}}</span>
                    </div>
                    <div>
                      <span>气血</span>
                      <span>{{parseInt(item.hp_cap)}}</span>
                    </div>
                    <div v-if='item.physical_crit !== 0' style='color:violet;font-weight:500;'>
                      <span>物理暴击:</span>
                      <span>{{item.physical_crit}}</span>
                    </div>
                    <div v-if='item.magic_crit !== 0' style='color:violet;font-weight:500;'>
                      <span>法术暴击:</span>
                      <span>{{item.magic_crit}}</span>
                    </div>
                    <div v-if='item.str !== 0' style='color:green;font-weight:500;'>
                      <span>耐</span>
                      <span>{{item.str}}</span>
                    </div>
                    <div v-if='item.vit !== 0' style='color:green;font-weight:500;'>
                      <span>武</span>
                      <span>{{item.vit}}</span>
                    </div>
                    <div v-if='item.agi !== 0' style='color:green;font-weight:500;'>
                      <span>速</span>
                      <span>{{item.agi}}</span>
                    </div>
                    <div v-if='item.int !== 0' style='color:green;font-weight:500;'>
                      <span>魔</span>
                      <span>{{item.int}}</span>
                    </div>
                    <div v-if='item.con !== 0' style='color:green;font-weight:500;'>
                      <span>体</span>
                      <span>{{item.con}}</span>
                    </div>
                    <div v-if='item.skill' style="color:orchid;">
                      <span>特效</span>
                      <span>{{item.skill}}</span>
                    </div>
                    <div>
                      <span>评分:</span>
                      <span>{{parseInt(item.score)}}</span>
                    </div>
                  </div>
                  <div slot="reference" v-if='item.wear_level >= 50'
                    style="text-shadow:1px 1px px darkgoldenrod;color:darkgoldenrod;">
                    {{item.name}}
                  </div>
                  <div slot="reference" v-if='item.wear_level < 50'>{{item.name}}</div>
                </el-popover>
                <!-- 帽子 -->
                <el-popover placement="left" title="装备信息" width="150" trigger="hover" v-if='item.eq_type === 3'>
                  <div>
                    <div>
                      {{item.info}}
                    </div>
                    <div>
                      <span>佩戴等级:</span>
                      <span>{{item.wear_level}}</span>
                      <div>
                        <span>物理防御</span>
                        <span>{{parseInt(item.physical_defense)}}</span>
                      </div>
                      <div v-if='item.physical_crit !== 0' style='color:violet;font-weight:500;'>
                        <span>物理暴击:</span>
                        <span>{{item.physical_crit}}</span>
                      </div>
                      <div v-if='item.magic_crit !== 0' style='color:violet;font-weight:500;'>
                        <span>法术暴击:</span>
                        <span>{{item.magic_crit}}</span>
                      </div>
                      <div v-if='item.str !== 0' style='color:green;font-weight:500;'>
                        <span>耐</span>
                        <span>{{item.str}}</span>
                      </div>
                      <div v-if='item.vit !== 0' style='color:green;font-weight:500;'>
                        <span>武</span>
                        <span>{{item.vit}}</span>
                      </div>
                      <div v-if='item.agi !== 0' style='color:green;font-weight:500;'>
                        <span>速</span>
                        <span>{{item.agi}}</span>
                      </div>
                      <div v-if='item.int !== 0' style='color:green;font-weight:500;'>
                        <span>魔</span>
                        <span>{{item.int}}</span>
                      </div>
                      <div v-if='item.con !== 0' style='color:green;font-weight:500;'>
                        <span>体</span>
                        <span>{{item.con}}</span>
                      </div>
                      <div v-if='item.skill' style="color:orchid;">
                        <span>特效</span>
                        <span>{{item.skill}}</span>
                      </div>
                      <div>
                        <span>评分:</span>
                        <span>{{parseInt(item.score)}}</span>
                      </div>
                    </div>
                  </div>
                  <div slot="reference" v-if='item.wear_level >= 50'
                    style="text-shadow:1px 1px px darkgoldenrod;color:darkgoldenrod;">
                    {{item.name}}
                  </div>
                  <div slot="reference" v-if='item.wear_level < 50'>{{item.name}}</div>
                </el-popover>
                <!-- 鞋子 -->
                <el-popover placement="left" title="装备信息" width="150" trigger="hover" v-if='item.eq_type === 6'>
                  <div>
                    <div>{{item.info}}</div>
                    <div>
                      <span>佩戴等级:</span>
                      <span>{{item.wear_level}}</span>
                    </div>
                    <div>
                      <span>速度</span>
                      <span>{{item.speed}}</span>
                    </div>
                    <div v-if='item.physical_crit !== 0' style='color:violet;font-weight:500;'>
                      <span>物理暴击:</span>
                      <span>{{item.physical_crit}}</span>
                    </div>
                    <div v-if='item.magic_crit !== 0' style='color:violet;font-weight:500;'>
                      <span>法术暴击:</span>
                      <span>{{item.magic_crit}}</span>
                    </div>
                    <div v-if='item.str !== 0' style='color:green;font-weight:500;'>
                      <span>耐</span>
                      <span>{{item.str}}</span>
                    </div>
                    <div v-if='item.vit !== 0' style='color:green;font-weight:500;'>
                      <span>武</span>
                      <span>{{item.vit}}</span>
                    </div>
                    <div v-if='item.agi !== 0' style='color:green;font-weight:500;'>
                      <span>速</span>
                      <span>{{item.agi}}</span>
                    </div>
                    <div v-if='item.int !== 0' style='color:green;font-weight:500;'>
                      <span>魔</span>
                      <span>{{item.int}}</span>
                    </div>
                    <div v-if='item.con !== 0' style='color:green;font-weight:500;'>
                      <span>体</span>
                      <span>{{item.con}}</span>
                    </div>
                    <div v-if='item.skill' style="color:orchid;">
                      <span>特效</span>
                      <span>{{item.skill}}</span>
                    </div>
                    <div>
                      <span>评分:</span>
                      <span>{{parseInt(item.score)}}</span>
                    </div>
                  </div>
                  <div slot="reference" v-if='item.wear_level >= 50'
                    style="text-shadow:1px 1px px darkgoldenrod;color:darkgoldenrod;">
                    {{item.name}}
                  </div>
                  <div slot="reference" v-if='item.wear_level < 50'>{{item.name}}</div>
                </el-popover>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="仙途伴侣">
          <el-row>
            <el-col :span='6'>
              <div class="pats-list">
                <div style="display: flex;height: 30px;border-bottom: 1px solid #ccc;">
                  <div class="leval">等级</div>
                  <div class="pats-name">宠物昵称</div>
                </div>
                <div style="height: 187px;">
                  <el-scrollbar style="height: 100%;">
                    <div class="sort-list" v-for='(item,index) in patsList' :key='item._id' @click='showPats(index)'>
                      <div class="leval">{{item.level}}</div>
                      <div class="pats-name">{{item.nickname}}</div>
                    </div>
                  </el-scrollbar>
                </div>
              </div>
            </el-col>
            <el-col :span='16' v-if='pat.nickname'>
              <div class="pats-msg">
                <el-row style="line-height: 18px; text-align: left">
                  <el-col :span='4'>
                    <div>{{pat.nickname}}</div>
                  </el-col>
                  <el-col :span='4'>
                    <span>等级:</span>
                    <span>{{pat.level}}</span>
                  </el-col>
                  <el-col :span='4'>
                    <span>类型:</span>
                    <span>{{pat.type === 0 ? '普通': pat.type === 1 ? '稀有' : pat.type === 2 ? '传说': '神兽'}}</span>
                  </el-col>
                </el-row>
                <el-row style="line-height: 18px; text-align: left">
                  <el-col :span='6'>
                    <div>
                      <span>成长:</span>
                      <span>{{pat.growing_num}}</span>
                    </div>
                    <div>
                      <span>寿命:</span>
                      <span>{{pat.type === 3 ? '永生': pat.food}}</span>
                    </div>
                    <div>
                      <span>攻击资质:</span>
                      <span>{{pat.str_zz}}</span>
                    </div>
                    <div>
                      <span>法力资质:</span>
                      <span>{{pat.int_zz}}</span>
                    </div>
                    <div>
                      <span>防御资质:</span>
                      <span>{{pat.vit_zz}}</span>
                    </div>
                    <div>
                      <span>体质资质:</span>
                      <span>{{pat.con_zz}}</span>
                    </div>
                    <div>
                      <span>速度资质:</span>
                      <span>{{pat.speed_zz}}</span>
                    </div>
                    <div>
                      <span>躲避资质:</span>
                      <span>{{pat.dodge_zz}}</span>
                    </div>
                  </el-col>
                  <el-col :span='6'>
                    <div>
                      <span>气血:</span>
                      <span>{{parseInt(pat.hp)}}</span>
                    </div>
                    <div>
                      <span>法力:</span>
                      <span>{{parseInt(pat.mp)}}</span>
                    </div>
                    <div>
                      <span>物理伤害:</span>
                      <span>{{parseInt(pat.physical_damage)}}</span>
                    </div>
                    <div>
                      <span>物理防御:</span>
                      <span>{{parseInt(pat.physical_defense)}}</span>
                    </div>
                    <div>
                      <span>魔法伤害:</span>
                      <span>{{parseInt(pat.magic_damage)}}</span>
                    </div>
                    <div>
                      <span>魔法防御:</span>
                      <span>{{parseInt(pat.magic_defense)}}</span>
                    </div>
                    <div>
                      <span>治疗能力:</span>
                      <span>{{parseInt(pat.restore_damage)}}</span>
                    </div>
                    <div>
                      <span>速度:</span>
                      <span>{{parseInt(pat.speed)}}</span>
                    </div>
                  </el-col>
                  <el-col :span='10'>
                    <div style="display: flex;flex-wrap:wrap">
                      <div v-for='ls in pat.skill' :key='ls.id'>
                        <el-popover placement="right" width="150" trigger="hover">
                          <div>{{ls.info}}</div>
                          <div slot="reference" v-if='ls.high'
                            style="border: 1px solid #ccc;text-align: center;margin: 3px 8px;font-weight: 500;color:orchid;width: 78px;">
                            {{ls.name}}</div>
                          <div slot="reference" v-else
                            style="border: 1px solid #ccc;text-align: center;margin: 3px 8px;font-weight: 500;width: 78px;">
                            {{ls.name}}
                          </div>
                        </el-popover>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
    `)
$('#first').css({
  'text-align': 'left'
})
$('.pats-list').css({
  'height': '200px',
  'border': '1px solid #ccc',
  'text-align': 'center',
  'width': '100%',
  'box-sizing': 'border-box'
})
$('.leval').css({
  'width': '50%',
  'line-height': '30px'
})
$('.pats-name').css({
  'line-height': '30px'
})
$('.sort-list').css({
  'display': 'flex',
  'cursor': 'pointer',
  'width': '100%'
})
$('.pats-msg').css({
  'border': '1px solid #ccc',
  'height': '200px',
  'padding': '15px',
  'box-sizing': 'border-box',
  'margin-left': '-1px'
})

$('.clothes-title').css({
  'text-align': 'center',
  'font-weight': '500',
  'font-size': '16px'
})
$('.wap-item').css({
  'text-align': 'center',
  'cursor': 'mark',
  'margin': '8px 0'
})
$('.xiuxian-img').css({
  'text-align': 'center',
  'width': '50%'
})


var app = new Vue({
  el: '#newApp',
  data: function () {
    return {
      visible: false,
      patsList: [],
      userInfo: [],
      leftWap: [],
      rightBase: [],
      pat: {}
    }
  },
  methods: {
    show(id) {
      this.visible = true
      this.getInfo(id)
    },
    getInfo(id) {
      axios({
        url: 'http://yundingxx.com:3366/open/api/getUserInfo',
        method: 'get',
        params: {
          uid: id
        }
      }).then(res => {
        // console.log(res);
        // 宠物
        this.patsList = res.data.data.userPet
        // 人物
        this.userInfo = res.data.data.info
        // 装备
        this.eqs = res.data.data.userEqs
        this.eqs.map(item => {
          if (item.eq_type === 1 || item.eq_type === 4 || item.eq_type === 5) {
            this.leftWap.push(item)
          } else {
            this.rightBase.push(item)
          }
        })
      })
    },
    showPats(index) {
      this.pat = this.patsList[index]
    },
    changeTab(tab) {
      // console.log(tab);
      if (tab.label !== '仙途伴侣') {
        this.pat = {}
      }
    }
  }
})

function showOtherInfoFunc(id) {
  app.show(id)
}
