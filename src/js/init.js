var prizes = ["5元", "10元", "20元"]
var userSize = 4
$(function () {
    var areaHtml = ''
    for (var i = 0; i < userSize; i++) {
        areaHtml += '<canvas></canvas>'
    }
    $(".area").html(areaHtml)

    var bodyStyle = document.body.style;

    bodyStyle.mozUserSelect = "none";
    bodyStyle.webkitUserSelect = "none";

    var img = new Image();
    var canvas = document.querySelector("canvas");
    canvas.style.backgroundColor = "transparent";
    canvas.style.position = "absolute";
    var imgs = ['p_0.jpg', "p_1.jpg"];
    var num = Math.floor(Math.random() * 2);
    img.src = imgs[num];

    img.addEventListener("load", function () {
        var ctx;
        var w = img.width,
            h = img.height;
        var offsetX = canvas.offsetLeft,
            offsetY = canvas.offsetTop;
        var mousedown = false;

        function layer(ctx) {
            ctx.fillStyle = "gray";
            ctx.fillRect(0, 0, w, h);
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

        canvas.width = w;
        canvas.height = h;
        canvas.style.backgroundImage = 'url(' + img.src + ')';
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, w, h);
        layer(ctx);

        ctx.globalCompositeOperation = "destination-out";//在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。
        canvas.addEventListener("touchstart", eventDown);
        canvas.addEventListener("touchend", eventUp);
        canvas.addEventListener('touchmove', eventMove);
        canvas.addEventListener("mousedown", eventDown);
        canvas.addEventListener("mouseup", eventUp);
        canvas.addEventListener("mousemove", eventMove)
    })
})