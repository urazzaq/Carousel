var Carousel = function (parent, images, options, descriptions) {

    var images = images;
    var parent = $(parent);
    var description = descriptions;
    var container = null;
    var currentDisplay = 0;
    var optionOrDefault = function (field, defaultVal) {
        return (typeof (options[field]) === "undefined") ? defaultVal : options[field];
    };
    var width = optionOrDefault("width", "600px");
    var height = optionOrDefault("height", "600px");
    var speed = optionOrDefault("speed", 5000);
    var hideImage = function (img,desc) {
        img.removeClass("showImg");
        img.addClass("hideImg");
        desc.removeClass("showImg");
        desc.addClass("hideImg");
    };
    var showImage = function (img,desc) {
        img.removeClass("hideImg");
        img.addClass("showImg");
        desc.removeClass("hideImg");
        desc.addClass("showImg");
    };
    var showNext = function () {
        var imgs = $(".carouselImage");
        var desc = $(".carouselDesc");
        hideImage($(imgs[currentDisplay]),$(desc[currentDisplay]));
        currentDisplay = (currentDisplay + 1) % imgs.length;
        showImage($(imgs[currentDisplay]),$(desc[currentDisplay]));
    };
    var showPrevious = function () {
        var imgs = $(".carouselImage");
        var desc = $(".carouselDesc");
        hideImage($(imgs[currentDisplay]));
        if (currentDisplay == 0) {
            currentDisplay = imgs.length - 1;
        } else {
            currentDisplay = currentDisplay - 1;
        }
        showImage($(imgs[currentDisplay]),$(desc[currentDisplay]));
    };
    var showIth = function (i) {
        while (currentDisplay !== i) {
            showNext();
        }
    };
    this.init = function () {
        // Create container div
        container = $(
                '<div id="carouselContainer" style="max-width: ' + width + '; position: relative"></div>'

                );
        parent.append(container);
        // Append all images to parent and make only first one visible
        images.forEach(function (img, index) {
            var img = $(
                    '<img class="carouselImage" style="margin: 0 auto" src="' + img + '" height="' + height + '"></img>'

                    );
            if (index != currentDisplay)
                img.addClass("hideImg");
            else
                img.addClass("showImg");
            container.append(img);
        });
        //Append all descrpipion to parent and make only first one visible
        description.forEach(function(desc,index){
        var des = $(
                    '<li id = "desc" class = "carouselDesc"><h2>'+desc+'</h2></li>'

                    );
            if (index != currentDisplay)
                des.addClass("hideImg");
            else
                des.addClass("showImg");
            container.append(des);    
        });
        // Add slider arrows
        var leftArrow = $('<img class="arrows" src="images/left-arrow.png"  width="60px">');
        var rightArrow = $('<img class="arrows" src="images/right-arrow.png" width="60px">');
        var arrowsHeight = Math.round(parseInt(height) / 2) + "px";
        leftArrow.css({
            "position": "absolute",
            "left": "0px",
            "top": arrowsHeight
        });
        rightArrow.css({
            "position": "absolute",
            "right": "0px",
            "top": arrowsHeight
        });
        rightArrow.click(showNext);
        leftArrow.click(showPrevious);
        container.append(leftArrow);
        container.append(rightArrow);
       
        // Add navigation circles
        var circleContainer = $('<div style="max-width: ' + width + '; text-align: center"></div>');
        for (var i = 0; i < images.length; i++) {
            var circle = $('<img width="20px" class="navCircle" data-image="' + i + '"src="images/circle.png">');
            circleContainer.append(circle);
        }

        container.append(circleContainer);
        $(".navCircle").click(function () {
            showIth(parseInt(this.dataset.image));
        });
        // Start slide show
        setInterval(showNext, speed);
    };
};

$(document).ready(function () {
    var carousel = new Carousel(
            "#carousel",
            [
                "images/banner00.jpg",
                "images/banner01.jpg",
                "images/banner02.jpg",
                "images/banner03.jpg",
                "images/banner04.jpg",
                "images/banner05.jpg",
                "images/banner06.jpg",
                "images/banner07.jpg",
                "images/banner08.jpg"
            ],
            {
                height: "800px",
                width: "1600px",
                speed: 5000
            },
    [
        "I like to stay Fit",
        "I like to keep up with current and upcoming Technologies",
        "I like to study Foreign Policy and International Politics ",
        "I like to learn about other cultures ",
        "I like to travel to distant lands",
        "I enjoy the Outdoors",
        "I like to study Ancient and Modern History",
        "I like to study Ancient and Modern Warfare",
        "I am Passionate about Secularism ,Human Rights and Education"


    ]

            );
    carousel.init();
});