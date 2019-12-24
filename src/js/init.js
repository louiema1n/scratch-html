var prizes = ["5元", "10元", "20元元元元元元元元"]
var userSize = 8
var width = 300, height = 115
$(function () {
    var areaHtml = ''
    for (var i = 0; i < userSize; i++) {
        areaHtml += '<div class="prize"><canvas>您的浏览器不支持canvas，请更换</canvas></div>'
    }
    $(".area").html(areaHtml)

    var bodyStyle = document.body.style;
    bodyStyle.mozUserSelect = "none";
    bodyStyle.webkitUserSelect = "none";
    var canvasList = $("canvas");
    if (canvasList != null && canvasList.length > 0) {
        $.each(canvasList, function (index, canvas) {
            var ctx = canvas.getContext("2d");
            canvas.style.backgroundColor = "transparent";
            var num = Math.floor(Math.random() * prizes.length);
            ctx.fillStyle = "gray";
            ctx.fillRect(0, 0, width, height);
            var url = textBecomeImg(prizes[num], 50, "#000")
            canvas.style.backgroundImage = 'url(' + url + ')';
            var offsetX = canvas.offsetLeft,
                offsetY = canvas.offsetTop;
            var mousedown = false;

            function layer(ctx) {
                ctx.fillStyle = "gray";
                ctx.fillRect(0, 0, width, height);
            }

            function eventDown(e) {
                e.preventDefault();
                mousedown = true;
            }

            function eventUp(e) {
                e.preventDefault();
                mousedown = false;
            }

            function eventMove(e) {
                e.preventDefault();
                if (mousedown) {
                    if (e.changedTouches) {
                        e = e.changedTouches[e.changedTouches.length - 1];
                    }
                    var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,
                        y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
                    with (ctx) {
                        beginPath()
                        arc(x, y, 15, 0, Math.PI * 2);
                        fill();
                    }
                }
            }

            ctx.fillStyle = "transparent";
            ctx.fillRect(0, 0, width, height);
            layer(ctx);
            ctx.globalCompositeOperation = "destination-out";//在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。
            canvas.addEventListener("touchstart", eventDown);
            canvas.addEventListener("touchend", eventUp);
            canvas.addEventListener('touchmove', eventMove);
            canvas.addEventListener("mousedown", eventDown);
            canvas.addEventListener("mouseup", eventUp);
            canvas.addEventListener("mousemove", eventMove)
        })
    }
})

/**
 * js使用canvas将文字转换成图像数据base64
 * @param {string}    text              文字内容  "abc"
 * @param {string}    fontsize          文字大小  20
 * @param {function}  fontcolor         文字颜色  "#000"
 * @param {boolean}   imgBase64Data     图像数据
 */
function textBecomeImg(text, fontsize, fontcolor) {
    var canvas = document.createElement('canvas');
    canvas.height = height;
    canvas.width = width
    var context = canvas.getContext('2d');

    context.fillStyle = fontcolor;
    context.font = fontsize + "px Arial";
    context.textBaseline = 'middle';
    var w = context.measureText(text).width;
    if (w > width) {
        context.font = fontsize / 1.7 + "px Arial";
    }
    w = width - context.measureText(text).width
    context.fillText(text, w / 2, height / 2);
    context.textAlign = 'center'
    return canvas.toDataURL('image/png');//注意这里背景透明的话，需要使用png
}