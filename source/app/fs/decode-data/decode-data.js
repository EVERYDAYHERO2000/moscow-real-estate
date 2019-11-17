__.fs.decodeData = function (data) {
  var places = [];
  var eco = {};
  var rail = {};
  var market = {};  
  

  
  $.each(data.p, function (i, e) {

    var p = {
      id: e[7],
      point: [e[15], e[0]],
      price: {
        from: (e[13] > -1) ? e[13] : null,
        to: (e[14] > -1) ? e[14] : null
      },
      name: data.n[e[17]],
      readyDate: (e[6]) ? e[6] : null,
      type: (e[16] > -1) ? data.t[e[16]] : null,
      class: (e[18] > -1) ? data.k[e[18]] : null,
      car: {
        distance: e[1],
        time: {
          h: e[2],
          m: e[3]
        }
      },
      moscow: {
        distance: e[8]
      },
      railroad: {
        distance: e[4],
        closest: (function (railroad, stationId) {
          var obj = {},
              m_obj = {}
          $.each(railroad, function (i, s) {
            
            obj = {
                id: s[0],
                name: s[2],
                point: [s[1], s[3]],
                distance: s[4],
                time: {
                  h: s[5],
                  m: s[6]
                },
                route : (s[7] > -1) ? data.g[s[7]] : null,
                type : (s[8] > -1) ? data.q[s[8]] : null,
                count : s[9]
            }
            
            rail[obj.id] = obj;
            
            if (stationId == s[0]) {
              m_obj = obj;
            }
          });
          
          return m_obj;
        })(data.r, e[5])
      },
      city: {
        distance: e[11],
        closest: (function (cities, cityId) {
          var obj = {}
          $.each(cities, function (i, c) {
            if (cityId == c[0]) {
              obj = {
                id: c[0],
                name: c[2],
                point: [c[1], c[3]]
              }
            }
          });
          return obj;
        })(data.c, e[12])
      },
      eco: {
        distance: e[9],
        closest: (function (ecos, ecoId) {
          var obj = {},
              m_obj = {};
          
          $.each(ecos, function (i, ec) {
            obj = {
              id: ec[0],
              name: ec[2],
              point: [ec[1], ec[3]],
              type: ec[4]
            }
              
            eco[obj.id] = obj;
            
            if (ecoId == ec[0]) {
              m_obj = obj;
            }
          });
          return m_obj;
        })(data.e, e[10])
      },
      /*
      market: {
        distance: e[20],
        closest : (function(markets, marketId){
          var obj = {},
              m_obj = {};
          
          $.each(markets, function(i, ec){
            
            
            
            obj = {
              id : ec[0],
              name : ec[3],
              point: [ec[2],ec[1]]
            }
            
            market[obj.id] = obj;
            
            if (marketId == ec[0]) {
              m_obj = obj;
            }
            
          });
          
          return m_obj;
        })(data.m, e[19])
      },
      */
      canvas : {
        visible : true
      }
    }

    places.push(p);


  });
  
  
  
  return {
    places : places,
    eco : eco,
    railroad : rail,
    market : market
  };


}