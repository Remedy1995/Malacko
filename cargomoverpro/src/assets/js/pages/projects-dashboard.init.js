"use strict";
var options = {
        series: [65.48, 112.02, 80.48, 58.65],
        labels: ["Chrome", "Firefox", "Safari", "Opera"],
        chart: {
            type: "donut",
            height: 220
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "60%"
                }
            }
        },
        dataLabels: {
            enabled: !1
        },
        legend: {
            show: !1
        },
        stroke: {
            show: !0,
            width: 0,
            colors: ["transparent"]
        },
        tooltip: {
            y: {
                formatter: function(e) {
                    return e + " %"
                }
            }
        },
        colors: ["#287F71", "#522c8f", "#E77636", "#01D4FF"]
    },
    chart = new ApexCharts(document.querySelector("#project-categories"), options);
chart.render();
options = {
    series: [{
        name: "Active Projects",
        type: "bar",
        data: [100, 100, 120, 148, 120, 120, 220, 103, 83, 114, 265, 174]
    }, {
        name: "Completed Projects",
        type: "bar",
        data: [95, 80, 130, 115, 190, 115, 159, 102, 138, 136, 62, 240]
    }],
    chart: {
        height: 312,
        type: "line",
        toolbar: {
            show: !1
        }
    },
    stroke: {
        dashArray: [0, 0],
        width: [0, 0, 2],
        curve: "smooth"
    },
    fill: {
        opacity: [1, 1],
        type: ["solid", "solid"],
        gradient: {
            type: "horizontal",
            inverseColors: !1,
            opacityFrom: .5,
            opacityTo: 0,
            stops: [0, 90]
        }
    },
    markers: {
        size: [0, 0],
        strokeWidth: 2,
        hover: {
            size: 4
        }
    },
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        axisTicks: {
            show: !1
        },
        axisBorder: {
            show: !1
        }
    },
    yaxis: {
        min: 0,
        axisBorder: {
            show: !1
        }
    },
    grid: {
        show: !0,
        strokeDashArray: 3,
        xaxis: {
            lines: {
                show: !1
            }
        },
        yaxis: {
            lines: {
                show: !0
            }
        },
        padding: {
            top: 0,
            right: -2,
            bottom: 0,
            left: 10
        }
    },
    legend: {
        show: !0,
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 5,
        markers: {
            width: 9,
            height: 9,
            radius: 6
        },
        itemMargin: {
            horizontal: 10,
            vertical: 0
        }
    },
    plotOptions: {
        bar: {
            columnWidth: "50%",
            barHeight: "70%",
            borderRadius: 3
        }
    },
    colors: ["#108dff", "rgba(16, 141, 255, 0.3)"],
    tooltip: {
        shared: !0,
        y: [{
            formatter: function(e) {
                return void 0 !== e ? e.toFixed(1) + "k" : e
            }
        }, {
            formatter: function(e) {
                return void 0 !== e ? e.toFixed(1) + "k" : e
            }
        }, {
            formatter: function(e) {
                return void 0 !== e ? e.toFixed(1) + "k" : e
            }
        }]
    }
};
(chart = new ApexCharts(document.querySelector("#project-statistics"), options)).render();
options = {
    series: [{
        name: "Inprogress",
        data: [2e4, 2e4, 15e3, 15e3, 3e4, 3e4, 45e3, 45e3, 3e4, 1e4, 32e3, 32e3]
    }, {
        name: "Progress",
        data: [3e4, 3e4, 22e3, 22e3, 15e3, 15e3, 15e3, 28e3, 28e3, 38e3, 28e3, 28e3]
    }],
    chart: {
        type: "line",
        height: 292,
        parentHeightOffset: 0,
        toolbar: {
            show: !1
        }
    },
    stroke: {
        curve: "smooth",
        width: 2
    },
    colors: ["#108dff", "#E77636"],
    fill: {
        type: "gradient"
    },
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    yaxis: {
        min: 0,
        max: 5e4,
        tickAmount: 5,
        labels: {
            formatter: function(e) {
                return "$".concat((e / 1e3).toFixed(0), "k")
            }
        }
    },
    tooltip: {
        shared: !0,
        intersect: !1,
        theme: "light",
        marker: {
            show: !0
        },
        y: {
            formatter: function(e) {
                return "$".concat(e.toLocaleString())
            }
        }
    },
    grid: {
        borderColor: "#f0f4f7",
        xaxis: {
            lines: {
                show: !0
            }
        },
        yaxis: {
            lines: {
                show: !0
            }
        }
    }
};
(chart = new ApexCharts(document.querySelector("#project_budget"), options)).render();