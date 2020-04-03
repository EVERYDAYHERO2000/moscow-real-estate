__.mapLegend = function () {

    if ( !$('.map-legend').length ) $(`#map .leaflet-bottom.leaflet-right`).append('<div class="map-legend"></div>');


    this.default = function () {
        $('.map-legend').html(`
        
            ${legendItem('СНТ, СТ, ДНТ','#9c27b0')}

            ${legendItem('КП','#0464ff')}

        `);

        return false
    };

    this.eco = function () {

        $('.map-legend').html(`

            ${legendItem('Чисто','rgba(0, 98, 255,1)')}

            ${legendItem('Рядом загрязнение или шум','rgba(255, 30, 0,1)')}
        
        `);

        return false;
    }

    this.river = function () {

        $('.map-legend').html(`

            ${legendItem('Рядом есть водоём или река','rgba(3, 97, 251,1)')}

            ${legendItem('далеко','rgba(255, 0, 0,1)')}
        
        `);

        return false;
    }

    this.cost = function () {

        $('.map-legend').html(`

            ${legendItem('< 2 млн. руб.','rgba(0, 255, 209, 1)')}

            ${legendItem('< 5 млн. руб.','rgba(73, 255, 0, 1)')}

            ${legendItem('< 8 млн. руб.','rgba(203, 255, 0, 1)')}

            ${legendItem('< 10 млн. руб','rgba(255, 215, 0, 1)')}

            ${legendItem('Дорого','rgba(225, 0, 0, 1)')}

        `);

        return false;
    }

    this.forest = function () {

        $('.map-legend').html(`
        
            ${legendItem('Лес рядом','rgba(100, 250, 30, 1)')}

            ${legendItem('1.5 км до леса','rgba(250, 230, 30, 1)')}

            ${legendItem('Лес далеко','rgba(225, 0, 0, 1)')}

        `);

        return false;
    }

    this.railroad = function () {

        $('.map-legend').html(`

            ${legendItem('Рядом станция','rgba(0, 98, 255, 1)')}

            ${legendItem('Станция далеко','rgba(226, 30, 220, 1)')}

        `);

        return false;
    }

    this.car = function () {

        $('.map-legend').html(`

            ${legendItem('До Москвы 30 мин','rgba(0, 177, 255, 1)')}

            ${legendItem('До Москвы больше часа','rgba(226, 30, 100, 1)')}

        `);

        return false;
    }

    this.markets = function () {

        $('.map-legend').html(`

            ${legendItem('Рядом','rgba(0, 177, 255, 1)')}

            ${legendItem('Далеко','rgba(226, 30, 100, 1)')}

        `);

        return false;
    }

    this.school = function () {

        $('.map-legend').html(`

            ${legendItem('Школа рядом','rgba(100, 250, 30, 1)')}

            ${legendItem('Далеко','rgba(226, 30, 100, 1)')}

        `);

        return false;
    }

    this.water = function () {

        $('.map-legend').html(`
        
            ${legendItem('Глубина < 20 м','rgba(40, 130, 255, 1)')}

            ${legendItem('Глубина > 200 м','rgba(20, 20, 137, 1)')}

        `);

        return false;
    }

    function legendItem(title,color){
        return `
        <div class="item">
            <div class="item__point" style="background:${color}"></div>
            <div class="item__description">${title}</div>
        </div>`
    }

    return this;

}    