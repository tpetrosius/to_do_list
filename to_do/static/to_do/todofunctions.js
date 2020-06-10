function allowDrop(ev) {
      ev.preventDefault();
    }

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, el) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  el.appendChild(document.getElementById(data));
}

function removeThis(ele) {
	ele.parentNode.remove();
};

function handleKeyPress(ev, el) {
	if (ev.which == 13) {
		$(el).removeAttr("contenteditable");
		return false;
	};
};

$(document).ready(function(){
	$("#addTask").click(function(){
		var elementId = 1;
		do {
			var element = document.getElementById("drag" + elementId);
			if (element) {
				elementId += 1
			}
		}
		while ($("#drag" + elementId).length > 0);
		var fullId = "drag" + elementId
        var content = $("<div>");
        var text = $("#task_content").val().replace(/(\n|\r|\r\n)/g, '<br />');
        content.addClass("p1");
        content.attr({"id" : fullId, "draggable" : "true", "ondragstart" : "drag(event)", "onmouseover": "runclick(event)", "onkeypress": "handleKeyPress(event, this)"});
        content.append(text);
        $("#div1").append(content);
        $('#task_content').val('');
    });
});

function runclick(e) {
	var drag = "";
	$(document).ready(function() {
		$("div[id^=drag]").on("contextmenu", function(e) {
			e.stopPropagation();
			drag = $(this).attr('id');
			console.log(drag)
			var top = e.pageY - 10;
			var left = e.pageX - 90;
			$("#context-menu").css({
				display: "block",
				top: top,
				left: left
			}).addClass("show");
			return false; //blocks default Webbrowser right click menu
		}).on("click", function() {
			$("#context-menu").removeClass("show").hide();
		});

		$("#context-menu #deleteitem").on("mousedown", function(e) {
			e.stopPropagation();
			$("#drag" + drag.replace("drag", "")).remove();
			console.log("#drag" + drag.replace("drag", ""))
			$("#context-menu").removeClass("show").hide();
			drag = ""
		});

		$("#context-menu #edititem").on("mousedown", function(e) {
			e.stopPropagation();
			$("#drag" + drag.replace("drag", "")).attr({"contenteditable": "true"}).focus();
			console.log("#drag" + drag.replace("drag", ""))
			$("#context-menu").removeClass("show").hide();
			drag = ""
		});
	});
}