$(function(){
  
    if (!localStorage.auth) {
      
      var auth = prompt('pass', ''); 
      
      if (auth == window.letitgo){
        localStorage.setItem('auth', auth);
        editor();
      }
      
    } else {
      editor();
    }
    
    function editor(){
      var urls = {
      get:   'https://docs.google.com/spreadsheets/d/e/2PACX-1vT8QUn2_IpcV0Q_i9uJfsmKMYZErXyAVGMv4u9a1sG36S4450_Wr5vv6LUMsgPYZpoxmdclHMVmg7U6/pub?gid=8452070&single=true&output=csv&version=c_' + Math.round(Math.random() * 100) ,  
      get2 : 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT8QUn2_IpcV0Q_i9uJfsmKMYZErXyAVGMv4u9a1sG36S4450_Wr5vv6LUMsgPYZpoxmdclHMVmg7U6/pub?gid=1270687964&single=true&output=csv&version=c_' + Math.round(Math.random() * 100),
      set : 'https://script.google.com/macros/s/AKfycbxVZXhYott7f6jONtAIjfX5mDu5I_QjCa1h9Kv76bbY_68-6fw/exec?params='
    }
    
    var data = [];
    var map;

    const app = {
        maxId: 0
    }
    window.app = app;
    
    
    $.get(urls.get, function(d){
      var temp = scvToArray(d);
      
      for (var i = 0; i< temp.length; i++){

        if (temp[i][1].length) data.push(temp[i]);

      }
      
      window.data = data;
      
      $('#app').css({display:'flex'});
      
      map = new createMap(data);

      $.each(data, function(i,e){
        
        var id = new Number(e[0])

        if (i > 0) $('#places').append(`<div class="place-item" data-index="${i}" id="place-${e[0]}"><div>${e[0]}</div><div>${e[1]}</div></div>`);
        
        if (id > app.maxId) app.maxId = id;

      });

      
      
      
      app.deletePlace = function (id) {

        for (var i = 0; i < data.length; i++){

            if (data[i][0] == id ) {

                for (var k = 1; k < data[i].length; k++){

                    data[i][k] = '';

                }

            }

        }

      }

      app.setForm = function(curData) {
        $('#row_0 .row-control').text( curData[0] );  //id
        $('#row_1 .row-control input').val( curData[1] ); //name
        $('#row_2 .row-control input').first().val( curData[2] ); //lat
        $('#row_2 .row-control input').last().val( curData[3] ); //lon
        $('#row_2 .row-title a').attr( 'href', `https://yandex.ru/maps/?ll=${curData[3]}%2C${curData[2]}&z=14&mode=whatshere&whatshere%5Bpoint%5D=${curData[3]}%2C${curData[2]}` ); //YA maps
        $('#row_3 .row-control input').val( curData[4] ); //address
        $('#row_4 .row-control input').first().val( curData[5] ); //price from
        $('#row_4 .row-control input').last().val( curData[6] ); //price to
        $('#row_4 .row-title a').attr( 'href', `https://cian.ru/map/?deal_type=sale&engine_version=2&object_type%5B0%5D=1&offer_type=suburban&zoom=16&center=${curData[2]}%2C${curData[3]}` ); //Cian
        $('#row_5 .row-control input').val( curData[7] ); //ready date
        $('#row_6 .row-control input').val( curData[8] ); //type
        $('#row_7 .row-control input').val( curData[9] ); //class
        $('#row_8 .row-control input').val( curData[10] ); //car distance
        $('#row_9 .row-control input').val( curData[11] ); //car time
        $('#row_10 .row-control textarea').val( curData[12] ); //description
        $('#row_11 .row-control input').val( curData[13] ); //developper
        $('#row_12 .row-control input').val( curData[14] ); //site
        $('#row_13 .row-control input').val( curData[15] ); //land type
        $('#row_14 .row-control input').val( curData[16] ); //energy
        $('#row_15 .row-control input').val( curData[17] ); //water
        $('#row_16 .row-control input').val( curData[18] ); //sanitation
        $('#row_17 .row-control input').val( curData[19] ); //gas
        $('#row_18 .row-control input').val( curData[20] ); //securyty
        $('#row_19 .row-control input').val( curData[21] ); //infrastructure
        $('#row_20 .row-control input').val( curData[22] ); //forest
        $('#row_21 .row-control input').val( curData[23] ); //river/lake
        $('#row_22 .row-control input').val( curData[24] ); //link
      }

      app.getForm = function() {
          return [
          $('#row_0 .row-control').text(), //id 0
          $('#row_1 .row-control input').val(), //name 1
          $('#row_2 .row-control input').first().val(), //lat 2
          $('#row_2 .row-control input').last().val(), //lon 3
          $('#row_3 .row-control input').val(), //address 4
          $('#row_4 .row-control input').first().val(), //price from 5
          $('#row_4 .row-control input').last().val(), //price to 6
          $('#row_5 .row-control input').val(), //ready date 7
          $('#row_6 .row-control input').val(), //type 8
          $('#row_7 .row-control input').val(), //class 9
          $('#row_8 .row-control input').val(), //car distance 10
          $('#row_9 .row-control input').val(), //car time 11
          $('#row_10 .row-control textarea').val(), //description 12
          $('#row_11 .row-control input').val(), //developper 13
          $('#row_12 .row-control input').val(), //site 14
          $('#row_13 .row-control input').val(), //land type 15
          $('#row_14 .row-control input').val(), //energy 16
          $('#row_15 .row-control input').val(), //water 17
          $('#row_16 .row-control input').val(), //sanitation 18
          $('#row_17 .row-control input').val(), //gas 19
          $('#row_18 .row-control input').val(), //securyty 20
          $('#row_19 .row-control input').val(), //infrastructure 21
          $('#row_20 .row-control input').val(), //forest
          $('#row_21 .row-control input').val(), //river/lake
          $('#row_22 .row-control input').val() //link
        ];
      }

      app.addPlace = function (arr) {

          arr = arr || [];  

          arr[0] = app.maxId + 1; 

          app.maxId = arr[0];

          data.push(arr); 
          
          $('.place-item_selected').removeClass('place-item_selected');  
          $('#places').append(`<div class="place-item place-item_selected place-item_edited" data-index="${data.length - 1}" id="place-${arr[0]}"><div>${arr[0]}</div><div>${arr[1]}</div></div>`);
          $('#places').scrollTop(0).scrollTop($('.place-item_selected').offset().top);

      }
      
      
      app.changePlace = function() {

        if ( $('#row_0 .row-control').text().length ) {

            for (var i = 1; i<data.length; i++) {

                var curId = $('#row_0 .row-control').text();

                if (data[i][0] == curId ) {

                    $( '#place-' + curId ).find('div').last().text( $('#row_1 .row-control input').val() );

                    data[i] = app.getForm();

                    break;
                }

            }
            
        }

      }

      $('#form').find('input, textarea').change(function(){

        var curId = $('#row_0 .row-control').text();

        $('#place-' + curId).addClass('place-item_edited');

      })
      
      
      $('#places').on('click', '.place-item', function(e){
        
        app.changePlace();        

        $('.place-item').removeClass('place-item_selected');
        $(this).addClass('place-item_selected');
        
        //
        var curId = $(this).attr('id').split('-')[1];
        var curData = [];
        $.each(data, function(i,e){
          if (curId == e[0]) {
            curData = e;
            return false;
          }
        });
        
        
        app.setForm(curData)
        
        
        map.addMarker({
            lat : curData[2],
            lon : curData[3]
        }, curData[0])
  
        map.map.setView(new L.LatLng(curData[2], curData[3]), 14);
         
        setTimeout(function(){
          $('#form').scrollTop(0);
        },100); 
        
      });
      
      if ( location.hash ){
        
        var hash = location.hash.replace('#','');
        
        $('.place-item').each(function(i,e){
          
          if ( $(e).attr('id').replace('place-','') == hash  ) {
            
            $(e).click();
            
            return false;
            
          }
          
        });
        
      }
      
      $('#submit').click(function(e){
        
        app.changePlace();

        $('#place-' + $('#row_0 .row-control').text() + ' div').last().text( $('#row_1 .row-control input').val() );
        $('#submit').addClass('disabled');


        $('.place-item_edited').each(function(i,e){

            for (var i=1; i < data.length; i++){

               if (data[i][0] == $(e).attr('id').split('-')[1]){

                $(e).removeClass('place-item_edited');

                 var arr = data[i];
                 var result = arr.join('||');

                 setTimeout(function(result){

                    console.log(result)

                    $.get(urls.set + result, function(d){
                    
                    $('#submit').removeClass('disabled');
                    }).done(function() {
                    $('#submit').removeClass('disabled');
                    }).fail(function() {
                    $('#submit').removeClass('disabled');
                    });

                 },100, result)    

               } 

            }

            
            
            

            
        });
        
      });
      
    });

    }
    
    
    
	
    
    

    
  });
