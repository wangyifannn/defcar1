// 审核成功和失败列表
function createTable(boxname, toolbarid, res,
    row1, row2, ifpage, row1name, row2name,
    ifoperate, userOperateEventsDel, userOperateFormatterDel, pagetype, tit) {
    $(boxname).css({
        "position": "relative"
    });
    $(boxname).bootstrapTable({
        data: res,
        toggle: "table",
        toolbar: toolbarid,
        pagination: ifpage, //是否显示分页（*）
        sortable: false, //是否启用排序
        sortOrder: "asc", //排序方式
        sidePagination: pagetype, //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1, //初始化加载第一页，默认第一页
        pageSize: 10, //每页的记录行数（*）
        pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
        search: true, //是否搜索查询
        showColumns: true, //是否显示所有的列
        showRefresh: false, //是否显示刷新按钮
        minimumCountColumns: 2, //最少允许的列数
        clickToSelect: true, //是否启用点击选中行
        searchOnEnterKey: true, //设置为 true时，按回车触发搜索方法
        strictSearch: false, //设置为 true启用全匹配搜索， 否则为模糊搜索
        showToggle: true, //是否显示切换视图（table/card）按钮
        searchAlign: "right",
        columns: [
            [{
                "title": tit,
                "halign": "center",
                "align": "center",
                "colspan": 9
            }],
            [{ field: "checkbox", title: "全选", checkbox: true, align: 'center', sortable: true },
                { field: status, title: "序号", align: 'center', sortable: true, formatter: function(value, row, index) { return index + 1; } },
                { field: row1, title: row1name, align: 'center', sortable: true },
                { field: row2, title: row2name, align: 'center', sortable: true },
                { field: 'operate', title: '操作', align: 'center', events: userOperateEventsDel, formatter: userOperateFormatterDel }
            ]
        ]
    });
    // 隐藏表格中的某一列
    if (!ifoperate) {
        $(boxname).bootstrapTable('hideColumn', 'operate');
    }
}
// 车辆分组列表
function loadCarGroup() {
    var url = allurl + "/car-management/group/find.action";
    $.ajax({
        "url": url,
        "type": "get",
        "success": function(res) {

            $('#cargroupTable').bootstrapTable('destroy');
            createTable("#cargroupTable", "#cargroup_toolbar", res,
                "id", "name", true, "分组编号", "分组编号",
                true, carGroupOperateEvents, carGroupOperateFormatter, "client", "车辆分组列表")
        },
        "error": function(res) {
            console.log(res);
        }
    });
}
// 驾驶员分组列表
function loadDriverGroup() {
    var url = allurl + "/car-management/driver/group/getGroup.action";
    $.ajax({
        "url": url,
        "type": "get",
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true,
        "success": function(res) {
            var resstring = JSON.stringify(res);
            addDrverInfo[4].option = [];
            for (var i = 0; i < res.length; i++) {
                addDrverInfo[4].option.push({ id: res[i].id, name: res[i].name, remark: res[i].remark })
            }
            $('#drivergroupTable').bootstrapTable('destroy');
            createTable("#drivergroupTable", "#drivergroupTable_toolbar", res,
                "id", "name", true, "分组编号", "分组编号",
                true, driverGroupOperateEvents, driverGroupOperateFormatter, "client", "驾驶员分组列表")
        },
        "error": function(res) {
            console.log(res);
        }
    });
}
loadCarGroup();
loadDriverGroup();

function driverGroupOperateFormatter(value, row, index) {
    return [
        '<button type="button" id="del_drivergroup" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<button type="button" id="update_drivergroup" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">修改</button>'
    ].join('');
}
window.driverGroupOperateEvents = {
    'click #del_drivergroup': function(e, value, row, index) {
        var delrow = [];
        delrow.push(row);
        deletAll(delrow, "drivergroupdel");
    },
    'click #update_drivergroup': function(e, value, row, index) {
        $("#add_model").modal();
        $("#add_model #myModalLabel").html("驾驶员分组修改");
        creatForm(addGroupInfo, "#add_model .modal-body form", "editDrivergroup_btn");
        showData("#add_model .modal-body form", row); // 编辑时数据回显
        $(".editDrivergroup_btn").click(function() {
            var sub_data = $("#add_model .modal-body form").serialize();
            sub_data = sub_data + "&id=" + row.id;
            var sub_url = allurl + "/car-management/driver/group/updateGroup.action";
            $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
            subData(sub_url, sub_data, "post", "editDrivergroup_btn");
        })
    }
};

function carGroupOperateFormatter(value, row, index) {
    return [
        '<button type="button" id="del_cargroup" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">删除</button>',
        '<button type="button" id="update_cargroup" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">修改</button>'
    ].join('');
}
window.carGroupOperateEvents = {
    'click #del_cargroup': function(e, value, row, index) {
        var delrow = [];
        delrow.push(row);
        deletAll(delrow, "cargroupdel");
    },
    'click #update_cargroup': function(e, value, row, index) {
        $("#add_model").modal();
        $("#add_model #myModalLabel").html("车辆分组修改");
        creatForm(addGroupInfo, "#add_model .modal-body form", "editcarGroup_btn");
        showData("#add_model .modal-body form", row); // 编辑时数据回显
        $(".editcarGroup_btn").click(function() {
            var sub_data = $("#add_model .modal-body form").serialize();
            sub_data = sub_data + "&id=" + row.id;
            var sub_url = allurl + "/car-management/group/updateGroup.action";
            $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
            subData(sub_url, sub_data, "post", "editcarGroup_btn");
        })
    }
};
// 新增车辆分组
var addGroupInfo = [
    { "name": "分组名称", "type": "text", "inputName": "name", "must": "*" },
    { "name": "备注", "type": "text", "inputName": "remark", "must": "" }
];

$("#add_cargroup_btn").click(function() {
    $("#add_model").modal();
    $("#add_model #myModalLabel").html("添加车辆分组");
    creatForm(addGroupInfo, "#add_model .modal-body form", "sub_add_cargroup");
    $(".sub_add_cargroup").click(function() {
        var sub_data = $("#add_model .modal-body form").serialize();
        var sub_url = allurl + "/car-management/group/add.action";
        $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
        subData(sub_url, sub_data, "post", "addcargroup");
    })
})
$("#add_drivergroup_btn").click(function() {
    $("#add_model").modal();
    $("#add_model #myModalLabel").html("添加驾驶员分组");
    creatForm(addGroupInfo, "#add_model .modal-body form", "sub_add_drivergroup");
    $(".sub_add_drivergroup").click(function() {
        var sub_data = $("#add_model .modal-body form").serialize();
        var sub_url = allurl + "/car-management/driver/group/add.action";
        $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
        subData(sub_url, sub_data, "post", "adddrivergroup");
    })
})