__.mapLegend = function () {

    if ( !$('.map-legend').length ) $(`#map .leaflet-bottom.leaflet-right`).append('<div class="map-legend"></div>');


    this.default = function () {
        $('.map-legend').html(`
        
            <div class="item">
                <div class="item__point" style="background:#0464ff;"></div>
                <div class="item__description">Посёлок</div>
            </div>

        `);

        return false
    };

    this.eco = function () {

        $('.map-legend').html(`
        
            <div class="item">
                <div class="item__point" style="background:rgba(0, 98, 255,1);"></div>
                <div class="item__description">Чисто</div>
            </div>

            <div class="item">
                <div class="item__point" style="background:rgba(255, 30, 0,1);"></div>
                <div class="item__description">Рядом загрязнение или шум</div>
            </div>

        `);

        return false;
    }

    this.cost = function () {

        $('.map-legend').html(`
        
            <div class="item">
                <div class="item__point" style="background:rgba(0, 255, 209, 1)"></div>
                <div class="item__description">< 2 млн. руб.</div>
            </div>

            <div class="item">
                <div class="item__point" style="background:rgba(73, 255, 0, 1);"></div>
                <div class="item__description">< 5 млн. руб.</div>
            </div>

            <div class="item">
                <div class="item__point" style="background:rgba(203, 255, 0, 1);"></div>
                <div class="item__description">< 8 млн. руб.</div>
            </div>


            <div class="item">
                <div class="item__point" style="background:rgba(255, 215, 0, 1);"></div>
                <div class="item__description">< 10 млн. руб.</div>
            </div>

            <div class="item">
                <div class="item__point" style="background:rgba(225, 0, 0, 1);"></div>
                <div class="item__description">Дорого</div>
            </div>

        `);

        return false;
    }

    this.forest = function () {

        $('.map-legend').html(`
        
            <div class="item">
                <div class="item__point" style="background:rgba(100, 250, 30, 1);"></div>
                <div class="item__description">Лес рядом</div>
            </div>

            <div class="item">
                <div class="item__point" style="background:rgba(250, 230, 30, 1);"></div>
                <div class="item__description">1.5 км до леса</div>
            </div>

            <div class="item">
                <div class="item__point" style="background:rgba(225, 0, 0, 1);"></div>
                <div class="item__description">Лес далеко</div>
            </div>

        `);

        return false;
    }

    this.railroad = function () {

        $('.map-legend').html(`
        
            <div class="item">
                <div class="item__point" style="background:rgba(0, 98, 255, 1);"></div>
                <div class="item__description">Рядом станция</div>
            </div>

            <div class="item">
                <div class="item__point" style="background:rgba(226, 30, 220, 1);"></div>
                <div class="item__description">Станция далеко</div>
            </div>

        `);

        return false;
    }

    this.car = function () {

        $('.map-legend').html(`
        
            <div class="item">
                <div class="item__point" style="background:rgba(0, 177, 255, 1);"></div>
                <div class="item__description">До Москвы 30 мин</div>
            </div>

            <div class="item">
                <div class="item__point" style="background:rgba(226, 30, 100, 1);"></div>
                <div class="item__description">До Москвы больше часа</div>
            </div>

        `);

        return false;
    }

    this.markets = function () {

        $('.map-legend').html(`
        
            <div class="item">
                <div class="item__point" style="background:rgba(0, 177, 255, 1);"></div>
                <div class="item__description">Рядом</div>
            </div>

            <div class="item">
                <div class="item__point" style="background:rgba(226, 30, 100, 1);"></div>
                <div class="item__description">Далеко</div>
            </div>

        `);

        return false;
    }

    this.water = function () {

        $('.map-legend').html(`
        
            <div class="item">
                <div class="item__point" style="background:rgba(40, 130, 255, 1);"></div>
                <div class="item__description">Глубина < 20 м</div>
            </div>

            <div class="item">
                <div class="item__point" style="background:rgba(20, 20, 137, 1);"></div>
                <div class="item__description">Глубина > 200 м</div>
            </div>

        `);

        return false;
    }

    return this;

}    