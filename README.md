<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>jQuery Slider</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        .slider {
            width: 400px;
            height: 250px;
            overflow: hidden;
            position: relative;
            border: 2px solid #000;
        }
        .slider-wrapper {
            display: flex;
            width: 1200px; /* 3 resim için genişlik */
            transition: transform 0.5s ease-in-out;
        }
        .slide {
            width: 400px;
            height: 250px;
        }
        .buttons {
            position: absolute;
            top: 50%;
            width: 100%;
            display: flex;
            justify-content: space-between;
            transform: translateY(-50%);
        }
        .buttons button {
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
        }
    </style>
</head>
<body>

    <div class="slider">
        <div class="slider-wrapper">
            <img src="https://via.placeholder.com/400x250/FF5733/FFFFFF?text=1" class="slide">
            <img src="https://via.placeholder.com/400x250/33FF57/FFFFFF?text=2" class="slide">
            <img src="https://via.placeholder.com/400x250/3357FF/FFFFFF?text=3" class="slide">
        </div>
        <div class="buttons">
            <button id="prev">◀</button>
            <button id="next">▶</button>
        </div>
    </div>

    <script>
        $(document).ready(function(){
            let currentIndex = 0;
            const slideWidth = $(".slide").width();
            const totalSlides = $(".slide").length;

            $("#next").click(function(){
                if (currentIndex < totalSlides - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                $(".slider-wrapper").css("transform", `translateX(${-currentIndex * slideWidth}px)`);
            });

            $("#prev").click(function(){
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = totalSlides - 1;
                }
                $(".slider-wrapper").css("transform", `translateX(${-currentIndex * slideWidth}px)`);
            });

            // Otomatik geçiş
            setInterval(function(){
                $("#next").click();
            }, 3000);
        });
    </script>

</body>
</html>
