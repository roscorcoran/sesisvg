//var http=require('http');
//D3
var d3 = require('d3');
var barChart = require('./barchart');
var fs = require('fs');

/*
//http://eng.wealthfront.com/2011/12/converting-dynamic-svg-to-png-with.html
var jsdom = require('jsdom');
var scripts = [
    "file://"+__dirname+"/d3.min.js",
    "file://"+__dirname+"/d3.layout.min.js",
    "file://"+__dirname+"/nv.d3.min.js",
    "file://"+__dirname+"/bar.js"
  ];
  htmlStub = '<!DOCTYPE html><div id="pie" style="width:'+w+'px;height:'+h+'px;"></div>';

  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'image/png'});
    var convert = child_proc.spawn("convert", ["svg:", "png:-"]);
    var values = (url.parse(req.url, true).query['values'] || ".5,.5")
          .split(",")
          .map(function(v){return parseFloat(v)});

    convert.stdout.on('data', function (data) {
      res.write(data);
    });
    convert.on('exit', function(code) {
      res.end();
    });

    jsdom.env({
      features:{QuerySelector:true},
      html: htmlStub,
      scripts: scripts,
      done: function(errors, window) {
        var svgsrc = window.insertPie("#pie", w, h, values).innerHTML;
        //jsdom's domToHTML will lowercase element names
        svgsrc = svgsrc.replace(/radialgradient/g,'radialGradient');
        convert.stdin.write(svgsrc);
        convert.stdin.end();
      }
    });
  }).listen(8089, "0.0.0.0");
*/



var getBarChart = function (params) {
  var chart = barChart()
    .data(params.data)
    .width(params.width)
    .height(params.height)
    .xAxisLabel(params.xAxisLabel)
    .yAxisLabel(params.yAxisLabel)
    .css(params.css);
    d3.select('body').append('div').attr('id', 'tmp').call(chart);
    var selector = '#tmp';
    var svg = d3.select(selector).node().innerHTML;
    return svg;
};
var css = "body {background-color: #ababab;font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size: 12px;}.svg-chart .background {shape-rendering: crispEdges;stroke: #ccc;fill: #fdfdfd;stroke-width: 1px;}.svg-chart .bar { fill: #4682B4; }"
var chartData=[{
  "name": "1",
  "count": 36
},{
  "name": "2",
  "count": 43
},{
  "name": "3",
  "count": 50
},{
  "name": "4",
  "count": 41
},{
  "name": "5",
  "count": 34
},{
  "name": "6",
  "count": 44
},{
  "name": "7",
  "count": 67
},{
  "name": "8",
  "count": 63
},{
  "name": "9",
  "count": 51
},{
  "name": "10",
  "count": 53
},{
  "name": "11",
  "count": 52
},{
  "name": "12",
  "count": 60
}];

var svg = getBarChart({
 data: chartData,
 width: 400,
 height: 300,
 xAxisLabel: '2012',
 yAxisLabel: 'Views',
 containerId: 'bar-chart',
 css: css
});
console.log('SVG---------------------------');
console.log(svg);
console.log('SVG-END-----------------------');
fs.writeFile('svg.svg', svg, function (err) {
  if (err) throw err;
  console.log('svg saved!');
});
