// 车辆录入
var addcarInfo = [
    { "name": "车辆编号", "type": "text", "inputName": "vSn", "must": "*" },
    { "name": "客户", "type": "text", "inputName": "customer", "must": "*" },
    { "name": "车辆名称", "type": "text", "inputName": "carName", "must": "*" },
    { "name": "项目编号", "type": "text", "inputName": "product_sn", "must": "*" },
    { "name": "车辆类型", "type": "text", "inputName": "engineNumber", "must": "*" },
    { "name": "项目名称", "type": "text", "inputName": "product_name", "must": "*" },
    { "name": "车架号", "type": "text", "inputName": "iccard", "must": "*" },
    { "name": "项目工程师", "type": "text", "inputName": "projectEngineer", "must": "*" },
    { "name": "发动机号", "type": "text", "inputName": "engineNumber", "must": "*" },
    { "name": "联系电话", "type": "text", "inputName": "contactNumber", "must": "*" },
    { "name": "发动机型号", "type": "text", "inputName": "engineType", "must": "*" },
    { "name": "车管", "type": "text", "inputName": "carcolor", "must": "*" },
    { "name": "发动机排量（L）", "type": "text", "inputName": "engineCapacity", "must": "*" },
    { "name": "燃油规则", "type": "text", "inputName": "FuelType", "must": "" },
    {
        "name": "车辆分组",
        "type": "select",
        "inputName": "gids",
        "must": "*",
        "option": [{ "name": "成存玉组" }, { "name": "方伟新组" }, { "name": "刘琼组" }, { "name": "桂旭阳组" }, { "name": "柴油及其他组" }]
    },
    { "name": "变速箱油规格", "type": "text", "inputName": "GBTS", "must": "" },
    { "name": "座位容纳", "type": "text", "inputName": "makeTime", "must": "*" },
    { "name": "机油规格", "type": "text", "inputName": "oilspecification", "must": "" },
    { "name": "车辆吨位", "type": "text", "inputName": "dunwei", "must": "*" },
    { "name": "轮胎规格", "type": "text", "inputName": "tyresize", "must": "" },
    { "name": "车辆型号", "type": "text", "inputName": "vCarType", "must": "*" },
    { "name": "前轮胎压力", "type": "text", "inputName": "frontTireP", "must": "" },
    { "name": "车辆颜色", "type": "text", "inputName": "carcolor", "must": "*" },
    { "name": "后轮胎压力", "type": "text", "inputName": "reaTireP", "must": "" },
    { "name": "车辆价值", "type": "text", "inputName": "carcolor", "must": "*" },
    { "name": "制作日期", "type": "text", "inputName": "makeTime", "must": "" },
    { "name": "车辆图片", "type": "file", "inputName": "iccard", "must": "" },
    { "name": "备注", "type": "text", "inputName": "remark", "must": "" }
];
// 研发工具记录申请
var toolnameArr = [{ "toolname": "12V电源" },
    { "toolname": "CAN1开发接头" },
    { "toolname": "前催化器载体温度" },
    { "toolname": "空气比传感器座" },
    { "toolname": "排方前采样管" },
    { "toolname": "CAN0开发接头" },
    { "toolname": "" },
    { "toolname": "" },
    { "toolname": "" },
    { "toolname": "" },
    { "toolname": "" },
    { "toolname": "" }
];

function ToolRecordApply(name, vSn, page, btnname) {
    var checkitems = '<div class="checktitle"><span>工具或设备名称（请在下方空格内填写需要安装的工具或设备名称）</span></div>';
    for (var i = 0; i < toolnameArr.length; i++) {
        checkitems += '<div class="checkitem" id="' + i + '"><span><input type="text" class="toolname" value="' + toolnameArr[i].toolname + '">' +
            '</span></div>';
    }
    checkitems += '<div class="form-group">' +
        '<div class="form_btngroup clearfix">' +
        '<button type="button" data-dismiss="" aria-label="" class="btn btn-default pull-left btn-primary ' + btnname + '">提交</button>' +
        '<button type="button" class="btn btn-default btn-primary pull-right" data-dismiss="modal">取消</button>' +
        '</div>' +
        '</div>';
    $(name).html(checkitems);
    $("#tool_submit_btn").click(function() {
        // 提交代码尚未改变
        var toolNameArr = $(".tool_Form .toolname");
        var toolArr = [];
        for (var i = 0; i < toolNameArr.length; i++) {
            if (toolNameArr[i].value != "") {
                toolArr.push({ "toolName": toolNameArr[i].value });
            }
        }
        // 申请研发
        $.ajax({
            url: "http://192.168.0.222:8080/car-management/car/develop/save/" + vSn + ".action",
            type: "post",
            data: JSON.stringify(toolArr),
            contentType: 'application/json;charset=UTF-8', //contentType很重要 
            crossDomain: true,
            success: function(res) {
                console.log(res);
                if (res.ret == true) {
                    toastr.success('研发工具申请成功', '研发工具装备记录', messageOpts);
                } else {
                    toastr.warning('研发工具申请失败', '研发工具装备记录', messageOpts);
                }
            },
            "error": function(res) {
                toastr.error('程序内部错误', '审核', messageOpts);
            }
        })
    })
}
// bom检查申请
var bomapplyArr = [
    { "id": 56, "pname": "ECM发动机电子控制模块", "carCheckRequest": null, "components": { "id": 1, "name": "" }, "carCheckItems": [] },
    { "id": 57, "pname": "MAP/MAT sensor进气歧管压力温度传感器", "carCheckRequest": null, "components": { "id": 2, "name": "" }, "carCheckItems": [] },
    { "id": 58, "pname": "Fron Oxygen Sensor前氧传感器", "carCheckRequest": null, "components": { "id": 3, "name": "" }, "carCheckItems": [] },
    { "id": 59, "pname": "Rear Oxygen Sensor后氧传感器", "carCheckRequest": null, "components": { "id": 4, "name": "" }, "carCheckItems": [] },
    { "id": 60, "pname": "Fuel Rail Assembly燃油导轨总成", "carCheckRequest": null, "components": { "id": 5, "name": "" }, "carCheckItems": [] },
    { "id": 61, "pname": "Knock Sensor 爆震传感器", "carCheckRequest": null, "components": { "id": 6, "name": "" }, "carCheckItems": [] },
    { "id": 62, "pname": "Crank Position sensor曲轴位置传感器", "carCheckRequest": null, "components": { "id": 7, "name": "" }, "carCheckItems": [] },
    { "id": 63, "pname": "Purge Solenoid-ECP炭罐电磁阀", "carCheckRequest": null, "components": { "id": 8, "name": "" }, "carCheckItems": [] },
    { "id": 64, "pname": "ETC电子节气阀体总成", "carCheckRequest": null, "components": { "id": 9, "name": "" }, "carCheckItems": [] },
    { "id": 65, "pname": "coolant Sensor 冷却液温度传感器", "carCheckRequest": null, "components": { "id": 10, "name": "" }, "carCheckItems": [] },
    { "id": 66, "pname": "Boot P/T sensor增压压力温度传感器", "carCheckRequest": null, "components": { "id": 11, "name": "" }, "carCheckItems": [] },
    { "id": 66, "pname": "", "carCheckRequest": null, "components": { "id": 11, "name": "" }, "carCheckItems": [] },
    { "id": 66, "pname": "", "carCheckRequest": null, "components": { "id": 11, "name": "" }, "carCheckItems": [] },
    { "id": 66, "pname": "", "carCheckRequest": null, "components": { "id": 11, "name": "" }, "carCheckItems": [] }
]

function bomApply(name, vSn, btnname) {
    var checkboxs = '<div class="checktitle"><span>零部件名称</span><span>零部件号</span></div>';
    // 获取研发申请记录
    $.ajax({
        // url: "http://localhost/car/defcar/json/toolapply.json",
        url: "https://wangyifannn.github.io/defcar1/json/toolapply.json",
        success: function(res) {
            console.log(res);
            if (res.length <= 0) { //尚未申请
                for (var n = 0; n < bomapplyArr.length; n++) {
                    checkboxs += '<div class="checkitem"><span><input type="text" class="bom_name" value="' + bomapplyArr[n].pname + '">' +
                        '</span><span><input type="text" class="bom_num" value="' + bomapplyArr[n].components.name + '">' +
                        '</span></div>';
                }
            } else {
                console.log(res.length);
                for (var i = 0; i < res.length; i++) {
                    checkboxs += '<div class="checkitem"><span><input type="text" class="bom_name" value="' + res[i].pname + '">' +
                        '</span><span><input type="text" class="bom_num" value="' + res[i].components.name + '">' +
                        '</span></div>';
                }
                for (var s = 0; s < 3; s++) {
                    checkboxs += '<div class="checkitem"><span><input type="text" class="bom_name" value="">' +
                        '</span><span><input type="text" class="bom_num" value="">' +
                        '</span></div>';
                }
            }
            checkboxs += '<div class="form-group">' +
                '<div class="form_btngroup clearfix">' +
                '<button type="button" class="btn btn-default pull-left btn-primary ' + btnname + '">提交</button>' +
                '<button type="button" class="btn btn-default btn-primary pull-right canceledit_btn">取消</button>' +
                '</div>' +
                '</div>';
            $(name).html(checkboxs);
            $(".canceledit_btn").click(function() {
                $(this).parent().hide();
            })
        }
    })

    $("#bom_apply_btn").click(function() {
        // 提交代码尚未改变
        var toolNameArr = $(".tool_Form .toolname");
        var toolArr = [];
        for (var i = 0; i < toolNameArr.length; i++) {
            if (toolNameArr[i].value != "") {
                toolArr.push({ "toolName": toolNameArr[i].value });
            }
        }
        // 申请研发
        $.ajax({
            url: "http://192.168.0.222:8080/car-management/car/develop/save/" + vSn + ".action",
            type: "post",
            data: JSON.stringify(toolArr),
            contentType: 'application/json;charset=UTF-8', //contentType很重要 
            crossDomain: true,
            success: function(res) {
                console.log(res);
                if (res.ret == true) {
                    toastr.success('研发工具申请成功', '研发工具装备记录', messageOpts);
                } else {
                    toastr.warning('研发工具申请失败', '研发工具装备记录', messageOpts);
                }
            },
            "error": function(res) {
                toastr.error('程序内部错误', '审核', messageOpts);
            }
        })
    })
}
// loadCarGroup();
creatForm(addcarInfo, "#carTypeIn .cartypein_apply", "sub_cartypein");

ToolRecordApply("#carTypeIn .rd_apply", "", "toolapply_btn");
bomApply("#carTypeIn .bom_apply", $("#carTypeIn .vSn").val(), "bomapply_btn");

var typein_edit_btn = $('#carTypeIn .form_subject .pull-right');
var typein_form_btngroups = $('#carTypeIn .form_btngroup');
var form_btngroup_cancel = $('#carTypeIn .form_btngroup .pull-right');
for (var m = 0; m < typein_edit_btn.length; m++) {
    typein_edit_btn[m].index = m;
    typein_edit_btn[m].onclick = function() {
        $('#carTypeIn .form_btngroup').eq(this.index).show()
    };
}
$('#carTypeIn .form_btngroup .pull-right').click(function() {
    $(this).parent().hide();
})