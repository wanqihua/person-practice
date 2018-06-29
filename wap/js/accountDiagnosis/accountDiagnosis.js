let global = {
};

$(function(){
  initParams();
  initEvent();
});

function initParams(){
  
}

function initEvent(){
  $('.report_diagnosis span').on('click', function(){
    let index = $(this).index();
    if( index === 0 ){
      location.href = "accountReport.html"
    }
  });

  $(".three_table p").on('click', function(){
    let index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    if( index === 0 ){
      $(".stock_table").css("display","block").siblings().css("display","none");
      $(this).siblings('.baceline').css('left','4%');
    } else if( index === 1 ){
      $(".fund_box").css("display","block").siblings().css("display","none");
      $(this).siblings('.baceline').css('left','43.3333333%');
    } else if( index === 2 ){
      $(".credit_box").css("display","block").siblings().css("display","none");
      $(this).siblings('.baceline').css('left','82.666667%');
    }
  });

  $('.title_two_tab div').on('click', function(){
    let index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    if( index === 0 ){
      $('.fund_hot_sale').css("display", "block").siblings(".manage_hot_sale").css("display", "none");
    } else if( index === 1 ){
      $('.fund_hot_sale').css("display", "none").siblings(".manage_hot_sale").css("display", "block");
    }
  })
}

pieChart(10, 10, 80);

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

