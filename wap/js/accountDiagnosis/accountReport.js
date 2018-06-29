let global = {
};

$(function(){
  initParams();
  initEvent();
});

function initParams(){

}

function initEvent(){
  $('.report_diagnosis span').on('click', function () {
    let index = $(this).index();
    if (index === 1) {
      location.href = "accountDiagnosis.html"
    }
  });
}

pieChart(10, 10, 80);
lineChart();


function pieChart(ratenum1, ratenum2, ratenum3){
  $("#pieChart").highcharts({
    chart: {
      spacing : [0, 0 , 0, 0],
      type: 'pie',
    },
    title: {
      text: null
    },
    tooltip: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    plotOptions: {
      series: {
        animation: false
      },
      pie: {
        shadow: false,
        center: ['50%', '50%'],
        allowPointSelect: false,
        dataLabels: {
          enabled: false
        }
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      data: [{
        y: ratenum1,
        color: '#3388ff'
      },{
        y: ratenum2,
        color: '#ffa720'
      },{
        y: ratenum3,
        color: '#f63d44'
      }],
      size: '120%',
      innerSize: '60%'
    }]
  });
}


function lineChart(){
  let xSeries = ['20180625','20180625','20180625','20180625','20180625','20180625','20180625','20180625','20180625','20180625'];
  let asset = [12,25,234,321,234,234,123,654,324,234];
  let hs300 = [112,215,134,121,214,211,223,454,124,214];
  $("#lineChart").highcharts({
    chart: {
      type: 'spline',
      spacing: [0, 15, 0, 10]
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    xAxis: {
      //十字准星线
      crosshair: {
        width: 1,
        color: '#3388ff'
      },
      tickWidth: 0 ,
      tickInterval: xSeries.length - 1,
      gridLineWidth: 0,
      lineWidth: 0,
      lineColor: '#efefef',
      gridLineColor: '#efefef',
      labels: {
        //格式化
        formatter: function(){
          return xSeries[this.value];
        },
        style:{
          color: "#b4b4b4",
          fontSize: 12,
        },
        y: 25
      }
    },
    yAxis: {
      title: {
        text: null
      },
      lineWidth: 0,
      lineColor: '#efefef',
      //刻度总数
      tickAmount: 5,
      gridLineColor: '#efefef',
      gridLineDashStyle: 'dash',
      labels: {
        enabled: true,
        formatter: function(){
          var v = this.value;
          v = v + '%';
          return v;
        },
        style:{
          color: "#b4b4b4"
        },
        x: -5
      }
    },
    plotOptions: {
      series: {
        marker: {
          enabled: true,
          radius: 0,
          states:{
            hover: {
              enabled: true,
              radius: 3,
              radiusPlus: 0,
              lineWidthPlus: 0
            }
          }
        },
        //连接null值
        connectNulls: true,
        states: {
          //禁用鼠标悬浮效果
          hover: {
            lineWidth: 1,
            halo: {
              size: 5,
              opacity: 1
            }
          }
        },
        events : {
          legendItemClick: function() {
            return false;
          }
        }
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      useHTML: true,
      backgroundColor: '#3388ff',
      borderRadius: 5,
      borderWidth: 0,
      borderColor: 'transparent',
      shadow: false,
      formatter: function(){
        var date = xSeries[this.x];
        //区间涨幅
        var combinationRate = (asset[this.x] * 100).toFixed(2) + "%";
        var hs300Rate = (hs300[this.x] * 100).toFixed(2) + "%";
        var info = `<table class="chart-tip-t2">
                      <tr>
                        <td>日期: ${date}</td>
                      </tr>
                      <tr>
                        <td>账户收益: ${combinationRate}</td>
                      </tr>
                      <tr>
                       <td>沪深300:${hs300Rate}</td>
                      </tr>
                    </table>`;
        return info;
      }
    },
    legend: {
      verticalAlign: 'top',
      align: 'center',
      symbolWidth: 0,
      useHTML: true,
      labelFormatter: function(){
        var index=  this.index;
        if(index == 0){
          return '<span class="chartLegend_one">账户收益</span>';
        }else if(index == 1){
          return '<span class="chartLegend_two">沪深300</span>';
        }
      },
      event: {

      }
    },
    series: [{
      color: '#3388ff',
      name: '账户收益',
      data: asset,
      lineWidth: 1
    },{
      color: '#ffa720',
      name: '沪深300',
      data: hs300,
      lineWidth: 1
    }]
  });
}