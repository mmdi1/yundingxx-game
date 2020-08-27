// ==UserScript==
// @name         云顶修仙 - 组队场景筛选
// @namespace    https://www.qs5.org/?ydxx_sel_team
// @version      0.1
// @description  组队场景筛选 (这里并没有卵用挂载不上，每次手动执行 addTeamSelect)
// @author       ImDong
// @match        *://yundingxx.com*
// @grant        none
// ==/UserScript==

(function () {
    let scenes_select = {},
        check_obj = $('<input type="checkbox" name="scenes_select" style="margin-right: 2px;" value="1" checked />');

    // 绑定事件 并添加到对象
    check_obj.click(function () {
        let name = $(this).parent().parent().find('p a').attr('onclick').match(/'([^']+)'\)/)[1];
        scenes_select[name] = this.checked;
        refreshTeamList();
    })

    /**
     * 刷新队伍列表
     */
    function refreshTeamList() {
        $('#team-list tr').each(function (index, item) {
            let item_name = $(item).find('td:nth-child(2)').text();
            if (scenes_select[item_name]) {
                $(item).show();
            } else {
                $(item).hide();
            }
        })
    }

    /**
     * 添加筛选按钮
     */
    function addSelect() {
        $('#screen-list div p:nth-child(1)').prepend(check_obj);
        // 以防意外 清空他
        scenes_select = {};
        // 获取所有场景名
        $('#screen-list div p:nth-child(2) a').each(function (index, item) {
            let name = $(item).attr('onclick').match(/'([^']+)'\)/)[1];
            scenes_select[name] = true;
        });
    }

    /**
     * 下面的触发 需要在 驿站组队 加载后触发
     */
    addSelect();
    window.addTeamSelect = addSelect;
})();
