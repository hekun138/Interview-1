##### 封装权限树
    // 权限树
    function createZtree(param) {
        /**
        * 初始化权限树参数
        * @param  {[Object]}   setting         [ztree的配置参数]
        * @param  {[Boolean]}  isexpandAll     [是否展开全部节点]
        * @param  {[Boolean]}  idNodeDisabled  [是否禁用选中节点]
        */
        var isexpandAll = false, idNodeDisabled = false;
        var setting,
            // 初始化
            id = param.id,
            url = param.url,
            type = param.type || param.method,
            checkField = param.key.check,
            childrenField = param.key.children,
            nameField = param.key.name,
            isParentField = param.key.isParentField,
            // 修改权限功能
            powerBtn = param.power.id || {},
            callback = param.power.callback || function () { },
            // 展开搜索按钮
            expandCollapseBtn = param.expandCollapseBtn,
            // 全选按钮
            checkAllTrueBtn = param.checkAllTrueBtn,
            // 全不选按钮
            checkAllFalseBtn = param.checkAllFalseBtn;
    
        // 初始化
        function init() {
            // 配置信息
            setting = {
                async: {
                    enable: true,         // 开启ajax
                    url: url,             //  url
                    type: type,
                    // contentType: "application/json",
                    // autoParam: ["id", "name"],               // 异步加载时需要自动提交父节点属性的参数
                    // otherParam: {}, // 自定义参数
                    // dataFilter: traverseTree                 // 数据处理
                },
                check: {                 // check属性放在data属性之后，复选框不起作用
                    enable: true,	     // checkbox开启
                    // chkboxType : { "Y" : "s", "N" : "s" },   // Y,N 选中和取消对父子元素的影响   s,p 父元素和子元素
                },
                data: {
                    keep: {
                        leaf: true,      // 所有 isParent = false 的节点, 都无法添加子节点。
                        parent: true     // 所有 isParent = true 的节点，即使该节点的子节点被全部删除或移走，依旧保持父节点状态。
                    },
                    simpleData: {
                        enable: false	 // 关闭简单数据格式功能
                    },
                    key: {               // 修改默认字段
                        checked: checkField,             // 判断是否被选中的 "字段"
                        children: childrenField,       // 子节点
                        name: nameField,               // 节点名称
                        isParent: isParentField,       // 判断是否为父节点
                        // title: 'title',             // 节点提示信息
                        // isHidden: "isHidden",       // 判断节点是否隐藏  
                        // url: "resourceUrl"          // 节点绑定的url
                    }
                },
                callback: {
                    // beforeAsync: this.ztreeBeforeAsync,       // 异步加载成功和失败之前
                    onAsyncSuccess: ztreeOnAsyncSuccess,         // success
                    onAsyncError: zTreeOnAsyncError              // error
                }
            }
    
            // 初始化
            $.fn.zTree.init($('#' + id), setting);
        }
    
        // 渲染
        init();
    
        // success
        function ztreeOnAsyncSuccess(event, treeId, treeNode, msg) {
            var result = (msg instanceof Object) && msg.data || JSON.parse(msg)['data'];   // 数据处理
            result = !result.adminResourceVOList && result || result.adminResourceVOList;
            if (!result.length || result.length == 0) {
                alert('后台返回数据错误, zTree无法渲染');
                return false;
            }
            $.fn.zTree.init($('#' + treeId), setting, result);   // 渲染 zTree
            expandCollapse();           // 默认展开
        }
    
        // error
        function zTreeOnAsyncError(event, treeId, treeNode, ajax, textStatus, errorThrown) {
            console.log(ajax);
        }
    
        // 展开折叠按钮
        var expandBtn = document.getElementById(expandCollapseBtn);
        expandBtn.onclick = function () {
            expandCollapse();
        };
    
        // 展开折叠
        function expandCollapse() {
            $.fn.zTree.getZTreeObj(id).expandAll(!isexpandAll);
            isexpandAll = !isexpandAll;
        }
    
        // 全选
        $('#' + checkAllTrueBtn).bind("click", { type: "checkAllTrue" }, checkNode);
        // 全不选
        $('#' + checkAllFalseBtn).bind("click", { type: "checkAllFalse" }, checkNode);
    
        // 全选, 全不选
        function checkNode(e) {
            var zTree = $.fn.zTree.getZTreeObj(id),
                type = e.data.type,
                nodes = zTree.getSelectedNodes();
            if (type.indexOf("All") < 0 && nodes.length == 0) {
                alert("请先选择一个节点");
            }
            if (type == "checkAllTrue") {
                zTree.checkAllNodes(true);
            } else if (type == "checkAllFalse") {
                zTree.checkAllNodes(false);
            }
        }
    
        // 保存
        $('#' + powerBtn).on('click', function () {
            // 提交权限 
            var treeObj = $.fn.zTree.getZTreeObj(id);
            var nodes = treeObj.getNodes();
            // 获取所有有权限的对象
            var adminUserPermissionVOList = filter(nodes);
            // 执行回调   
            callback(adminUserPermissionVOList);
        })
    
        // 处理后台需要的权限数组
        function filter(nodes) {
            // 保存要处理的数据
            var a;
            // 该数组用来保存所有被checked的对象
            var adminUserPermissionVOList = [];
            // 该对象用来保存每一组被checked的数据
            var obj = {};
    
            digui(nodes);
            // 遍历
            function digui(nodes) {
                var _index;
                for (var i = 0, len = nodes.length; i < len; i++) {
                    _index = i;
                    a = nodes[i];
                    // 判断是否被checked, 如果checked                
                    if (a['checkd']) {
                        // 如果存在子节点
                        if (a.children != null && typeof a.children === 'object' && a.children.length > 0) {
                            // 该节点暂存为父节点 
                            obj.resourceCode = a.resourceCode;
                            // 继续递归子节点
                            digui(a.children);
                        } else {
                            // 如果没有子节点了, 该节点就是子节点
                            obj.permissionCode = a.resourceCode;
                            // 保存到 AdminUserPermissionVOList 中
                            adminUserPermissionVOList.push(obj);
                            // 同父节点遍历保存父节点id
                            obj = {
                                'resourceCode': obj.resourceCode
                            }
                        }
                    } else {
                        // 如果没被checked, 则子节点肯定没有被选中, 进行下一个对象遍历
                        // 每个父节点的最后一个子节点让obj指向新对象
                        if (obj.resourceCode && _index == len - 1) {
                            obj = {};
                        }
                        continue;
                    }
                }
            }
    
            return adminUserPermissionVOList;
        }
    
    
    }


##### 生成权限树
    <!-- 新增 -->
    var treeData = {
        // 初始化
        id: 'tree',
        url: findAllResource,
        type: 'get',
        key: {
            check: 'checkd',
            children: 'children',
            name: 'resourceName',
            isParent: 'isLeafNode'
        },
        // 绑定权限
        power: {
            id: 'addData',
            callback: function (adminUserPermissionVOList) {
                addManager(adminUserPermissionVOList);
            }
        },
        // 展开收缩按钮
        expandCollapseBtn: 'expandCollapseBtn',
        // 全选
        checkAllTrueBtn: 'checkAllTrueBtn',
        // 全不选
        checkAllFalseBtn: 'checkAllFalseBtn'
    };

    // 生成权限树
    createZtree(treeData);
    
    
    <!-- 修改 -->
     var treeData = {
        // 初始化
        id: 'tree',
        url: findByUserIdPermi + '?userId=' + editData.userId,
        type: 'get',
        key: {
            check: 'checkd',
            children: 'children',
            name: 'resourceName',
            isParent: 'isLeafNode'
        },
        // 绑定权限
        power: {
            id: 'editData',
            callback: function (adminUserPermissionVOList) {
                editManager(adminUserPermissionVOList);
            }
        },
        // 展开收缩按钮
        expandCollapseBtn: 'expandCollapseBtn',
        // 全选
        checkAllTrueBtn: 'checkAllTrueBtn',
        // 全不选
        checkAllFalseBtn: 'checkAllFalseBtn'
    };
    // 生成权限树
    createZtree(treeData);
    
    
##### 依赖
    <script src="js/jquery-1.8.3.min.js"></script>
    <script src="js/jquery.ztree.core.js"></script>
    <script src="js/jquery.ztree.excheck.js"></script>
    <script src="zTree.js"></script>
