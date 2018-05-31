// 申请
var maintainApply = [
    { "name": "车辆编号", "type": "text", "inputName": "vSn", "must": "*" },
    { "name": "停放地点", "type": "text", "inputName": "send_park", "must": "" },
    { "name": "维修项目", "type": "text", "inputName": "item", "must": "*" },
    { "name": "备注", "type": "text", "inputName": "applyRemark", "must": "" },
];
// 完成
var finishMaintain = [
    { "name": "车辆编号", "type": "text", "inputName": "vSn", "must": "*" },
    { "name": "停放地点", "type": "text", "inputName": "fin_park", "must": "" },
    { "name": "备注", "type": "text", "inputName": "remark", "must": "" },
];
// 分配
var dividedInfo = [
    { "name": "车辆编号", "type": "text", "inputName": "vSn", "must": "*" },
    { "name": "预计完成时间", "type": "end-3date", "inputName": "forecastTime", "must": "*" },
    {
        "name": "操作员",
        "type": "select",
        "inputName": "operator",
        "must": "*",
        "option": [{ "name": "成存玉" }, { "name": "方伟新" }, { "name": "刘琼" }, { "name": "桂旭阳" }, { "name": "柴油" }]
    },
    { "name": "工作内容", "type": "text", "inputName": "workContent", "must": "*" }
];
// 车辆编号校验
$("#maintainTypeIn .vSn").bind('input porpertychange', function() {
    console.log($("#maintainTypeIn .vSn").val());
    if ($("#maintainTypeIn .vSn").val() == null || $("#maintainTypeIn .vSn").val() == "") {
        return;
    } else {
        $.ajax({
            url: "http://192.168.0.222:8080/car-management/car/check/" + $("#maintainTypeIn .vSn").val() + "/1.action",
            type: "get",
            "dataType": "jsonp", //数据类型为jsonp  
            "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
            success: function(res) {
                console.log(res);
                if (res.ret == false) {
                    $(".m_vSn_tips").html("车辆编号正确");
                    $("#send_btn").attr("disabled", false);
                    $.ajax({
                        type: "get",
                        url: "http://192.168.0.222:8080/car-management/carMaintain/check/" + $("#maintainTypeIn .vSn").val() + ".action",
                        "dataType": "jsonp", //数据类型为jsonp  
                        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数  
                        data: {},
                        success: function(dat) {
                            console.log(dat);
                            if (dat.ret == false) {
                                $(".send_tips").html("车辆已在维修列表");
                                $(".m_vSn_tips").html("车辆已在维修列表");
                                $("#send_btn").attr("disabled", true);
                            } else {
                                $("#send_btn").attr("disabled", false);
                                $(".send_tips").html("");
                            }
                        }
                    });
                } else {
                    $("#send_btn").attr("disabled", true);
                    $(".m_vSn_tips").html("车辆编号不正确");
                }
            }
        });

    }
});
// 初始化加载维修列表
function loadMaintainList() {
    $('#maintainTable').bootstrapTable('destroy');
    $("#maintainTable").bootstrapTable({
        url: 'https://wangyifannn.github.io/newdefcar/json/driverList.json',
        // url: 'http://localhost/car/defcar/json/driverList.json',
        // url: allurl + "/car-management/carmaintain/query.action",
        dataType: 'json',
        striped: true, //是否显示行间隔色
        toggle: "table",
        toolbar: "toolbar_maintainTable",
        pagination: "true", //是否显示分页（*）
        sortOrder: "asc", //排序方式
        sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1, //初始化加载第一页，默认第一页
        pageSize: 5, //每页的记录行数（*）
        pageList: [5, 10, 50, 100], //可供选择的每页的行数（*）
        search: true, //是否搜索查询
        showColumns: true, //是否显示所有的列
        showRefresh: false, //是否显示刷新按钮
        sortable: true, //是否启用排序
        minimumCountColumns: 2, //最少允许的列数
        clickToSelect: true, //是否启用点击选中行
        searchOnEnterKey: true, //设置为 true时，按回车触发搜索方法
        strictSearch: false, //设置为 true启用全匹配搜索， 否则为模糊搜索
        showToggle: true, //是否显示切换视图（table/card）按钮
        searchAlign: "right",
        showExport: true,
        exportDataType: "basic",
        exportOptions: {
            ignoreColumn: [0, 8], //忽略某一列的索引  
            fileName: '测试车辆-车辆维修列表', //文件名称设置  
            worksheetName: 'sheet1', //表格工作区名称  
            tableName: '测试车辆-车辆维修列表',
            excelstyles: ['background-color', 'color', 'font-size', 'font-weight']
                // onMsoNumberFormat: DoOnMsoNumberFormat
        },
        exportDataType: "selected",
        uniqueId: "vSn", // 每一行的唯一标识  
        onLoadSuccess: function(res) {
            console.log(res);
        },
        onLoadError: function() {
            console.log("数据加载失败！");
        },
        columns: [
            [{
                "title": "测试车辆维修列表",
                "halign": "center",
                "align": "center",
                "colspan": 14
            }],
            [{
                field: 'ids',
                title: "序号",
                valign: "middle",
                align: "center",
                colspan: 1,
                rowspan: 2,
                width: "3%",
                formatter: function(value, row, index) {
                    return index + 1
                }
            }, {
                title: "送修申请表",
                valign: "middle",
                align: "center",
                colspan: 6,
                rowspan: 1
            }, {
                field: 'status',
                title: "维修状态",
                valign: "middle",
                align: "center",
                colspan: 1,
                rowspan: 2,
                width: "5%",
                background: '#BFEBEB',
                formatter: function(value, row, index) {
                    var a = "";
                    if (value == null) {
                        var a = '';
                    } else if (value == "排队中") {
                        var a = '<span style="color:red">排队中</span>';
                    } else if (value == "维修中") {
                        var a = '<span style="color:green">维修中</span>';
                    } else if (value == "已完成") {
                        var a = '<span style="color:blue">已完成</span>';
                    }
                    return a;
                }
            }, {
                title: "维修协调员填写",
                valign: "middle",
                align: "center",
                colspan: 6,
                rowspan: 1
            }],
            [{ field: 'vSn', title: '车辆编号', valign: "middle", align: "center", width: "6%" },
                { field: 'item', title: '维修项目', valign: "middle", align: "center", width: "8%" },
                { field: 'send_park', title: '停放地点', valign: "middle", align: "center", width: "6%" },
                { field: 'applyRemark', title: '备注', valign: "middle", align: "center", width: "5%" },
                { field: 'applyPeople', title: '申请人', valign: "middle", align: "center", width: "6%" },
                { field: 'applytime', title: '申请日期', valign: "middle", align: "center", width: "7%" },
                { field: 'workContent', title: '工作内容', valign: "middle", align: "center", width: "6%" },
                { field: 'operator', title: '操作员', valign: "middle", align: "center", width: "5%" },
                { field: 'forecastTime', title: '预计完成时间', valign: "middle", align: "center", width: "5%" },
                { field: 'fin_park', title: '停放地点', valign: "middle", align: "center", width: "5%" },
                {
                    field: 'remark',
                    title: '备注',
                    valign: "middle",
                    align: "center",
                    width: "4%",
                    formatter: function(value, row, index) {
                        if (value == null) {
                            return "";
                        } else {
                            return value.remark
                        }
                    }
                }, {
                    field: 'operate',
                    title: '操作',
                    valign: "middle",
                    align: 'center',
                    width: "12%",
                    events: maintainListoperateEvents,
                    formatter: maintainListFormatter
                }
            ]
        ]
    })
}

function maintainListFormatter(value, row, index) {
    if (row.status == "排队中") {
        return [
            '<button type="button" id="btn_ChangeStatus" class="RoleOfA btn btn-default  btn-sm my_btn" style="margin-right:10px;margin-top:5px;">分配</button>',
            '<a href="#" data-toggle="tab"><button type="button" disabled="disabled" id="finish_btn" class="RoleOfB btn btn-default  btn-sm my_btn" style="margin-right:10px;margin-top:5px;">完成</button></a>',
            '<button type="button" id="btn_maintainTop" class="RoleOfA btn btn-default  btn-sm my_btn" style="margin-right:10px;">优先</button>',
            '<button type="button" id="btn_upkeep" class="RoleOfA btn btn-default  btn-sm my_btn" style="margin-right:10px;">保养</button>'
        ].join('');
    } else {
        return [
            '<button type="button" id="btn_ChangeStatus" class="RoleOfA btn btn-default  btn-sm my_btn" style="margin-right:10px;margin-top:5px;">分配</button>',
            '<a href="#" data-toggle="tab"><button type="button" id="finish_btn" class="RoleOfB btn btn-default  btn-sm my_btn" style="margin-right:10px;margin-top:5px;">完成</button></a>',
            '<button type="button" id="btn_maintainTop" class="RoleOfA btn btn-default  btn-sm my_btn" style="margin-right:10px;">优先</button>',
            '<button type="button" id="btn_upkeep" class="RoleOfA btn btn-default  btn-sm my_btn" style="margin-right:10px;">保养</button>'
        ].join('');
    }
}
window.maintainListoperateEvents = {
    'click #btn_upkeep': function(e, value, row, index) { //保养
        $('#upkeep_model').modal();
        $('#upkeep_model .vSn').val(row.vSn);
    },
    // 修改维修状态操作，分配任务-维修中
    'click #btn_ChangeStatus': function(e, value, row, index) {
        console.log(row);
        $("#add_model").modal();
        $("#add_model #myModalLabel").html("分配任务");
        creatForm(dividedInfo, "#add_model .modal-body form", "divided_btn");
        $("#add_model .modal-body .vSn").val(row.vSn);
        $(".divided_btn").click(function() { //分配任务
            var sub_data = $("#add_model .modal-body form").serialize();
            sub_data = sub_data + "&operator=" + $("#add_model .operator option:selected").attr("value");
            var sub_url = allurl + "/car-management/carmaintain/assign.action";
            $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
            subData(sub_url, sub_data, "post", "subdivided_btn");
        })
    },
    'click #finish_btn': function(e, value, row, index) { //完成
        $("#add_model").modal();
        $("#add_model #myModalLabel").html("维修完成");
        creatForm(finishMaintain, "#add_model .modal-body form", "finish_btn");
        $("#add_model .modal-body .vSn").val(row.vSn);
        $(".finish_btn").click(function() { //完成维修
            var sub_data = $("#add_model .modal-body form").serialize();
            var sub_url = allurl + "/car-management/carmaintain/complete.action";
            $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
            subData(sub_url, sub_data, "post", "finish_btn");
        });
    },
    // 置顶操作
    'click #btn_maintainTop': function(e, value, row, index) {
        $.ajax({
            "url": "http://192.168.0.222:8080/car-management/carmaintain/top.action",
            "type": "get",
            "data": {
                "id": row.id
            },
            "dataType": "jsonp", //数据类型为jsonp  
            "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
            "success": function(res) {
                console.log(res);
                if (res.ret) {
                    loadMaintainList();
                }
            },
            "error": function(res) {
                console.log(res);
            }
        })
    }

};
// $("#auditLit_search_btn").click(function() {
//     $('#tablescreen').bootstrapTable('destroy');
//     loadMaintainList();
// });
// 新增维修申请
$("#add_maintain_apply").click(function() {
    $("#add_model #myModalLabel").html("新增维修申请");
    $("#add_model").modal();
    creatForm(maintainApply, "#add_model .modal-body .form-horizontal", "subMainApply_btn");
    $(".subMainApply_btn").click(function() {
        var subcar_data = $("#add_model .modal-body form").serialize();
        console.log(subcar_data);
        var subcar_url = allurl + "/car-management/carmaintain/apply.action";
        $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
        subData(subcar_url, subcar_data, "post", "subMaintainApply_btn");
    })
})