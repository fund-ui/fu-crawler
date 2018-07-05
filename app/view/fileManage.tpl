{% extends "base.tpl" %}

{% block content %}
<h2>{{ state }}</h2>
<h3>文件树形控件</h3>
<div id="fu_fileTree" class="fu-fileTree"></div>
<link href="http://localhost:54905/Scripts/fu-fileCenter-es5/dist/css/fu-fileCenter.dep.min.css?20180515" rel="stylesheet">
<link href="http://localhost:54905/Scripts/fu-fileCenter-es5/dist/css/fu-fileCenter.min.css?20180515" rel="stylesheet">
<script src="http://localhost:54905/Scripts/fu-fileCenter-es5/dist/js/fu-fileCenter.dep.js?20180515"></script>
<script>
    $("#fu_fileTree").fancytree({
        extensions: ['edit'],
        source: (function() {
            var dfd = new $.Deferred();
            $.get('http://localhost:7001/api/v2/fileTree',function(res){
                dfd.resolve([res.data])
            })
            return dfd.promise();
        })(),
        activate: function (event, data) {
            var node = data.node;
            //config.active(node.key);
            console.log(node.key);
            // 选中节点展开
            node.setExpanded(true);
        },
        autoCollapse: false,//节点自动收缩
        clickFolderMode: 1,
        persist: {
            expandLazy: true,
            store: "local" // 'cookie', 'local': use localStore, 'session': sessionStore
        },
        lazyLoad: function(event, data) {
            var node = data.node;
            console.log('lazyload:', node.key);
            var dfd = new $.Deferred();
            window.setTimeout(function() {
                dfd.resolve([
                    { title: "融汇1号Lazy", tooltip: "融汇1号", key: "/基金/融汇1号", folder: true, children: null, lazy: true },
                    { title: "融汇2号Lazy", tooltip: "融汇2号", key: "/基金/融汇2号", folder: true, children: null, lazy: true }
                ])
            }, 1000);
            data.result = dfd.promise();
        },
        edit: {
			triggerStart: ["clickActive", "dblclick", "f2", "mac+enter", "shift+click"],
			beforeEdit: function(event, data){
				// Return false to prevent edit mode
			},
			edit: function(event, data){
				// Editor was opened (available as data.input)
			},
			beforeClose: function(event, data){
				// Return false to prevent cancel/save (data.input is available)
				console.log(event.type, event, data);
				if( data.originalEvent.type === "mousedown" ) {
					// We could prevent the mouse click from generating a blur event
					// (which would then again close the editor) and return `false` to keep
					// the editor open:
                    // data.originalEvent.preventDefault();
                    // return false;
                    // Or go on with closing the editor, but discard any changes:
                    // data.save = false;
				}
			},
			save: function(event, data){
				// Save data.input.val() or return false to keep editor open
				console.log("save...", this, data);
				// Simulate to start a slow ajax request...
				setTimeout(function(){
					$(data.node.span).removeClass("pending");
					// Let's pretend the server returned a slightly modified
					// title:
					data.node.setTitle(data.node.title + "!");
				}, 2000);
				// We return true, so ext-edit will set the current user input
				// as title
				return true;
			},
			close: function(event, data){
				// Editor was removed
				if( data.save ) {
					// Since we started an async request, mark the node as preliminary
					$(data.node.span).addClass("pending");
				}
			}
		}
    })
</script>
{% endblock %}