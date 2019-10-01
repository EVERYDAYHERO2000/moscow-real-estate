const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

var temp = [];

var t = {
  t1 : require(__dirname + '/source/data/places/t1.json').elements,
  t2 : require(__dirname + '/source/data/places/t2.json').elements,
  t3 : require(__dirname + '/source/data/places/t3.json').elements,
  t4 : require(__dirname + '/source/data/places/t4.json').elements,
  t5 : require(__dirname + '/source/data/places/t5.json').elements,
  t6 : require(__dirname + '/source/data/places/t6.json').elements,
  t7 : require(__dirname + '/source/data/places/t7.json').elements,
  t8 : require(__dirname + '/source/data/places/t8.json').elements,
  t9 : require(__dirname + '/source/data/places/t9.json').elements,
  t10 : require(__dirname + '/source/data/places/t10.json').elements,
  t11 : require(__dirname + '/source/data/places/t11.json').elements,
  t12 : require(__dirname + '/source/data/places/t12.json').elements,
  t13 : require(__dirname + '/source/data/places/t13.json').elements,
  t14 : require(__dirname + '/source/data/places/t14.json').elements,
  t15 : require(__dirname + '/source/data/places/t15.json').elements,
  t16 : require(__dirname + '/source/data/places/t16.json').elements
}

_.forEach(t, function(data,i){
  console.log(i);
  convert(data);
  
})



console.log(temp);

fs.writeFile(__dirname + '/data.json', JSON.stringify(temp), function(err) {});

function convert(l){

  _.forEach(l,function(e){

    var obj = {};

    if (e.type == 'node' && e.tags ) {
      obj.name = e.tags.name || '';
      obj.point = [e.lon, e.lat];
      obj.description = e.description || '';
      obj.id = e.id;
    }

    if (e.type == 'way' ) {
      if (e.tags) {
        
        var t = [];
        
        _.forEach(e.nodes, function(n){
          var node = findNode(l, n);
          t.push( [node.lon, node.lat] );
        });
        
        var region = new Region(t);
        
        obj.name = e.tags.name || '';
        obj.point = region.centroid();
        obj.description = e.description || '';
        obj.id = e.id;
        
      } 
      
    }

    if (e.type == 'relation' ) {
      if (e.tags) {

        var t = [];
        
        _.forEach(e.members, function(m){
          var member = findNode(l, m.ref);
          
          _.forEach(member.nodes, function(n){
            
            var node = findNode(l, n);
            t.push( [node.lon, node.lat] );
          });
         
        });
        
        var region = new Region(t);
        
        obj.name = e.tags.name || '';
        obj.point = region.centroid();
        obj.description = e.description || '';
        obj.id = e.id;
        
      } else {

      }
    }

    if (obj.name) temp.push(obj);

  })

}



function findNode(l, n){
  var result = '';
  _.forEach(l, function(e){
    
    if (e.id == n ){
      result = e;
    }
  })
  
  return result;
  
}






    function Point(x, y) {
        this[0] = x;
        this[1] = y;
    }

    function Region(points) {
        this.points = points || [];
        this.length = points.length;
      
        this.area = function () {
        var area = 0,
            i,
            j,
            point1,
            point2;

        for (i = 0, j = this.length - 1; i < this.length; j = i, i += 1) {
            point1 = this.points[i];
            point2 = this.points[j];
            area += point1[0] * point2[1];
            area -= point1[1] * point2[0];
        }
        area /= 2;

        return area;
    };
        this.centroid = function () {
        var x = 0,
            y = 0,
            i,
            j,
            f,
            point1,
            point2;

        for (i = 0, j = this.length - 1; i < this.length; j = i, i += 1) {
            point1 = this.points[i];
            point2 = this.points[j];
            f = point1[0] * point2[1] - point2[0] * point1[1];
            x += (point1[0] + point2[0]) * f;
            y += (point1[1] + point2[1]) * f;
        }

        f = this.area() * 6;
        var p = new Point(x / f, y / f);
        
        return [p[0],p[1]]
    };
    }

    


    


