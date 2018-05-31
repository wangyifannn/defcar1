function loadInsuranceList() {
    $("#InsTable").bootstrapTable('destroy').bootstrapTable({
        url: 'https://wangyifannn.github.io/newdefcar/json/driverList.json',
        // url: 'http://localhost/car/defcar/json/ins.json',
        dataType: 'json',
        striped: true, //是否显示行间隔色
        toggle: "table",
        toolbar: "InsTable_toolbar",
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
            fileName: '测试车辆-保险申请列表', //文件名称设置  
            worksheetName: 'sheet1', //表格工作区名称  
            tableName: '测试车辆-保险申请列表',
            excelstyles: ['background-color', 'color', 'font-size', 'font-weight']
                // onMsoNumberFormat: DoOnMsoNumberFormat
        },
        exportDataType: "selected",
        uniqueId: "vSn", // 每一行的唯一标识  
        //得到查询的参数
        queryParams: function(params) {
            console.log(params);
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            var temp = {
                size: params.limit, //页面大小
                page: (params.offset / params.limit) + 1, //页码
                sort: params.sort, //排序列名  
                sortOrder: params.order //排位命令（desc，asc） 
            };
            console.log(temp);
            return temp;
        },
        onLoadSuccess: function(res) {
            console.log(res);
        },
        onLoadError: function() {
            console.log("数据加载失败！");
        },
        columns: [
            [{
                "title": "测试车辆-保险申请列表",
                "halign": "center",
                "align": "center",
                "colspan": 19
            }],
            [{ field: "checkbox", title: "全选", checkbox: true, align: 'center' },
                { field: 'index', title: "序号", valign: "middle", align: "center", width: "5%", formatter: function(value, row, index) { return index + 1; } },
                { field: "vSn", title: "车辆编号", align: 'center' },
                { field: "telephone", title: "项目编号", align: 'center' },
                { field: "name", title: "车辆名称", align: 'center' },
                { field: "name", title: "车辆型号", align: 'center' },
                { field: "Employeerange", title: "保险期限", align: 'center', formatter: function(value, row, index) { return value + "年"; } },
                { field: "name", title: "发动机号", align: 'center' },
                { field: "name", title: "车架号", align: 'center' },
                { field: "name", title: "车辆类型", align: 'center' },
                { field: "name", title: "座纳", align: 'center' },
                { field: "name", title: "价值", align: 'center' },
                { field: "name", title: "排量", align: 'center' },
                { field: "name", title: "吨位", align: 'center' },
                { field: "name", title: "负责工程师", align: 'center' },
                { field: "name", title: "申请人", align: 'center' },
                { field: "applydate", title: "申请日期", align: 'center' },
                { field: "name", title: "备注", align: 'center' },
                { field: 'operate', title: '操作', align: 'center', events: InsoperateEvents, formatter: InsoperateFormatter }
            ]
        ]
    });
}

function InsoperateFormatter(value, row, index) {
    return [
        '<button type="button" id="Renewal_btn" class="my_btn btn btn-default btn-sm" style="margin-right:15px;">续保申请</button>'
    ].join('');
}
// 临牌申请
$("#plate_apply").click(function() {
    $("#add_model").modal();
    $("#add_model #myModalLabel").html("临牌申请");
    creatForm(plateInfo, "#add_model .modal-body form", "plate_apply_btn");
    $("#add_model .modal-body .vSn").val(row.vSn);
    $(".plate_apply_btn").click(function() { //完成维修
        var sub_data = $("#add_model .modal-body form").serialize();
        var sub_url = allurl + "/car-management/vehicle/add.json";
        console.log(sub_data);
        $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
        subData(sub_url, sub_data, "post", "sub_plate");
    });
})
window.InsoperateEvents = {
    'click #Renewal_btn': function(e, value, row, index) { //续保
        var Ins_Arr = [];
        Ins_Arr.push(row);
        deletAll(Ins_Arr, "Ins_apply");
    }
};

// 临牌录入
var plateInfo = [
    { "name": "车辆编号", "type": "text", "inputName": "vSn", "must": "*" },
    { "name": "临牌起始日", "type": "text", "inputName": "safeCheck", "must": "*" },
    { "name": "临牌终止日", "type": "text", "inputName": "safeVerify", "must": "" }
];
// 保险录入
var InsuranceInfo = [
    { "name": "车辆编号", "type": "text", "inputName": "vSn", "must": "*" },
    { "name": "保单号", "type": "text", "inputName": "remark", "must": "" },
    { "name": "保险起始日", "type": "text", "inputName": "safeCheck", "must": "*" },
    { "name": "保险终止日", "type": "text", "inputName": "safeVerify", "must": "" },
    { "name": "厂牌型号（保）", "type": "text", "inputName": "safeVerify", "must": "" },
    { "name": "保险备注", "type": "text", "inputName": "safeVerify", "must": "" },
];