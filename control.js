$(function(){
var LIST = $(".form-container");
var LIST_LEFT = $(".items-left");
var LIST_BOUGHT = $(".items-bought");

var ITEM_TEMPLATE = $(".one-item").html();
var LABEL_TEMPLATE = $(".one-label").html();

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function addItem(title){
	var node = $(ITEM_TEMPLATE);
	node.attr("style","");

	node.find(".entry-name").text(title);

	var sideLabel = $(LABEL_TEMPLATE);
	sideLabel.find(".label-text").text(title);
	sideLabel.find(".badge").text(1);

	LIST_LEFT.append(sideLabel);
	sideLabel.fadeIn(0);
	sideLabel.fadeOut(250);
	var label = node.find(".label");

	node.find(".delete").click(function(){
		node.fadeOut(250, function(){
			node.remove();
		});
		sideLabel.fadeOut(250, function(){
			sideLabel.remove();
		
		});
		
	});

	var editMode = false;

	node.find(".entry-name").click(function(){
		if (!editMode){
			editMode = true;
			var thiz = $(this);
			var prev = thiz.html();
			var fieldd = $("<input  type=\"text\" value=\""+thiz.html()+"\" />");
			thiz.html(fieldd);
			fieldd.select().focus();
			fieldd.focusout(function(){
				editMode = false;
				if (isBlank(fieldd.val())){
					thiz.html(prev);
					return;
				}
				sideLabel.find(".label-text").html(fieldd.val());
				thiz.html(fieldd.val());
			});
		}
	});

	node.find(".dec").attr("disabled","disabled");
	node.find(".dec").click(function(){
		var count = parseInt(label.html());
		count--;
		label.html(count);
		sideLabel.find(".badge").html(count);
		if (count < 2){
			node.find(".dec").attr("disabled","disabled");
		}
	});

	node.find(".inc").click(function(){
		var count = parseInt(label.html());
		count++;
		label.html(count);
		sideLabel.find(".badge").html(count);
		if (count > 1){
			node.find(".dec").removeAttr("disabled");
		}
	});

	node.find(".bought").click(function(){
		sideLabel.fadeOut(250, function(){
			sideLabel.remove();
			sideLabel.addClass("strike");
			LIST_BOUGHT.append(sideLabel);
			sideLabel.fadeIn(250);
		});
			
		
		node.find(".add-buttons").addClass("hidden");
		node.find(".controll-buttons").addClass("hidden");
		node.find(".unbuy-buttons").removeClass("hidden");
		//sideLabel.fadeOut(250);
	});

	node.find(".unbuy").click(function(){
		
		sideLabel.fadeOut(250, function(){
			sideLabel.remove();
		sideLabel.removeClass("strike");
		LIST_LEFT.append(sideLabel);
		sideLabel.fadeIn(250);
		});
		
		
		
		node.find(".add-buttons").removeClass("hidden");
		node.find(".controll-buttons").removeClass("hidden");
		node.find(".unbuy-buttons").addClass("hidden");		
		
			
		
		
		});


	LIST.append(node);
}

addItem("Помідори");
addItem("Печиво");
addItem("Сир");

$(".item-add").click(function(){
	var itemName = $(".item-name-field").val();
	if (!isBlank(itemName))
		addItem(itemName);
})
});