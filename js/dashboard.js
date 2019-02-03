(function ($) {
  'use strict';
  $(function () {

    //LOGOUT
    $("#logout").on("click", function () {
      window.location.replace("login.html");
    })

    //WELCOME
    if ($("#welcome-user").length) {
      var request = new XMLHttpRequest();

      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          var user = JSON.parse(this.response);
          $("#welcome-user").text(`Welcome ${user.firstname} ${user.lastname}!`);
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/user", true);
      request.send();
    }

    // GREENBOX
    if ($("#total-sales-amount").length) {
      var request = new XMLHttpRequest();

      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          var greenbox = JSON.parse(this.response);
          var amount = greenbox.amount;
          var currency = greenbox.currency;
          var period = greenbox.period;
          $("#total-sales-amount").text(`${amount} ${currency}`);
          $("#total-sales-period").text(`${period}`);
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/totalsales", true);
      request.send();
    }

    // BLUEBOX
    if ($("#total-purchases-amount").length) {
      var request = new XMLHttpRequest();

      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          var bluebox = JSON.parse(this.response);
          var amount = bluebox.amount;
          var currency = bluebox.currency;
          var period = bluebox.period;
          $("#total-purchases-amount").text(`${amount} ${currency}`);
          $("#total-purchases-period").text(`${period}`);
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/totalpurchases", true);
      request.send();
    }

    // REDBOX
    if ($("#total-purchases-amount").length) {
      var request = new XMLHttpRequest();

      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          var redbox = JSON.parse(this.response);
          var amount = redbox.amount;
          var currency = redbox.currency;
          var period = redbox.period;
          $("#total-orders-amount").text(`${amount} ${currency}`);
          $("#total-orders-period").text(`${period}`);
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/totalorders", true);
      request.send();
    }

    // ORANGEBOX
    if ($("#total-growth-amount").length) {
      var request = new XMLHttpRequest();

      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          var orangebox = JSON.parse(this.response);
          var amount = orangebox.amount;
          var currency = orangebox.currency;
          var period = orangebox.period;
          $("#total-growth-amount").text(`${amount} ${currency}`);
          $("#total-growth-period").text(`${period}`);
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/totalgrowth", true);
      request.send();
    }

    // DISTRIBUTION
    if ($("#distribution-chart").length) {
      var request = new XMLHttpRequest();

      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          var distChart = JSON.parse(this.response);
          var labels = distChart.labels;
          var data = distChart.datasets[0].data;
          var cities = distChart.datasets[0].city;

          var areaData = {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: [
                "#3da5f4", "#f1536e", "#fda006"
              ],
              borderColor: "rgba(0,0,0,0)"
            }]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            segmentShowStroke: false,
            cutoutPercentage: 72,
            elements: {
              arc: {
                borderWidth: 4
              }
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            legendCallback: function (chart) {
              var text = [];
              text.push('<div class="distribution-chart">');
              let i = 0;
              cities.forEach(city => {
                text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[i] + '"></div>');
                text.push(`<p>${city}</p>`);
                text.push('</div>');
                i++;
              });
              text.push('</div>');

              return text.join("");
            },
          }
          var distributionChartPlugins = {
            beforeDraw: function (chart) {
              var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;

              ctx.restore();
              var fontSize = .96;
              ctx.font = "600 " + fontSize + "em sans-serif";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#000";

              var text = "70%",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;

              ctx.fillText(text, textX, textY);
              ctx.save();
            }
          }
          var distributionChartCanvas = $("#distribution-chart").get(0).getContext("2d");
          var distributionChart = new Chart(distributionChartCanvas, {
            type: 'doughnut',
            data: areaData,
            options: areaOptions,
            plugins: distributionChartPlugins
          });
          document.getElementById('distribution-legend').innerHTML = distributionChart.generateLegend();
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/distributionchart", true);
      request.send();
    };

    // SALE REPORT
    if ($("#sale-report-chart").length) {

      var request = new XMLHttpRequest();

      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          var saleReportChart = JSON.parse(this.response);
          var months = saleReportChart.labels;
          var location = saleReportChart.datasets[0].label;
          var data = saleReportChart.datasets[0].data;

          var CurrentChartCanvas = $("#sale-report-chart").get(0).getContext("2d");
          var CurrentChart = new Chart(CurrentChartCanvas, {
            type: 'bar',
            data: {
              labels: months,
              datasets: [{
                label: location,
                data: data,
                backgroundColor: ["#3da5f4", "#e0f2ff", "#3da5f4", "#e0f2ff", "#3da5f4", "#e0f2ff", "#3da5f4", "#e0f2ff", "#3da5f4", "#e0f2ff", "#3da5f4"]
              }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
                }
              },
              scales: {
                yAxes: [{
                  display: true,
                  gridLines: {
                    drawBorder: false
                  },
                  ticks: {
                    fontColor: "#000",
                    display: true,
                    padding: 20,
                    fontSize: 14,
                    stepSize: 10000,
                    callback: function (value) {
                      var ranges = [
                        { divider: 1e6, suffix: 'M' },
                        { divider: 1e3, suffix: 'k' }
                      ];
                      function formatNumber(n) {
                        for (var i = 0; i < ranges.length; i++) {
                          if (n >= ranges[i].divider) {
                            return (n / ranges[i].divider).toString() + ranges[i].suffix;
                          }
                        }
                        return n;
                      }
                      return "$" + formatNumber(value);
                    }
                  }
                }],
                xAxes: [{
                  stacked: false,
                  categoryPercentage: .6,
                  ticks: {
                    beginAtZero: true,
                    fontColor: "#000",
                    display: true,
                    padding: 20,
                    fontSize: 14
                  },
                  gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                    display: true
                  },
                  barPercentage: .7
                }]
              },
              legend: {
                display: false
              },
              elements: {
                point: {
                  radius: 0
                }
              }
            }
          });
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/salereportchart", true);
      request.send();
    }

    //SALE REPORT OVERVIEW
    if ($("#sales-report-downloads").length) {
      var request = new XMLHttpRequest();

      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          var overview = JSON.parse(this.response);
          var downloads = overview.downloads;
          var purchases = overview.försäljning;
          var users = overview.users;
          var growth = overview.growth;
          $("#sales-report-downloads").text(downloads);
          $("#sales-report-purchases").text(purchases);
          $("#sales-report-users").text(users);
          $("#sales-report-growth").text(growth);
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/salesreportoverview", true);
      request.send();
    }

    // TOTAL SALES
    if ($("#total-sales-chart").length) {
      var request = new XMLHttpRequest();

      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          var totalSales = JSON.parse(this.response);

          // CHART
          var days = totalSales.labels;
          var servicesData = totalSales.datasets[0].data;
          var productsData = totalSales.datasets[1].data;
          var servicesLabel = totalSales.datasets[0].label;
          var productsLabel = totalSales.datasets[1].label;

          // OVERVIEW
          var revenue = totalSales.revenue;
          var returns = totalSales.returns;
          var queries = totalSales.queries;
          var invoices = totalSales.invoices;

          $("#total-sales-revenue").text(revenue);
          $("#total-sales-returns").text(returns);
          $("#total-sales-queries").text(queries);
          $("#total-sales-invoices").text(invoices);

          var areaData = {
            labels: days,
            datasets: [
              {
                data: servicesData,
                backgroundColor: [
                  'rgba(61, 165, 244, .0)'
                ],
                borderColor: [
                  'rgb(61, 165, 244)'
                ],
                borderWidth: 2,
                fill: 'origin',
                label: servicesLabel
              },
              {
                data: productsData,
                backgroundColor: [
                  'rgba(241, 83, 110, .0)'
                ],
                borderColor: [
                  'rgb(241, 83, 110)'
                ],
                borderWidth: 2,
                fill: 'origin',
                label: productsLabel
              }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [{
                display: true,
                ticks: {
                  display: true,
                  padding: 20,
                  fontColor: "#000",
                  fontSize: 14
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'transparent',
                  zeroLineColor: '#eeeeee'
                }
              }],
              yAxes: [{
                display: true,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  fontColor: "#000",
                  fontSize: 14,
                  padding: 18,
                  stepSize: 100000,
                  callback: function (value) {
                    var ranges = [
                      { divider: 1e6, suffix: 'M' },
                      { divider: 1e3, suffix: 'k' }
                    ];
                    function formatNumber(n) {
                      for (var i = 0; i < ranges.length; i++) {
                        if (n >= ranges[i].divider) {
                          return (n / ranges[i].divider).toString() + ranges[i].suffix;
                        }
                      }
                      return n;
                    }
                    return formatNumber(value);
                  }
                },
                gridLines: {
                  drawBorder: false
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: .37
              },
              point: {
                radius: 0
              }
            }
          }
          var revenueChartCanvas = $("#total-sales-chart").get(0).getContext("2d");
          var revenueChart = new Chart(revenueChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/totalsaleschart", true);
      request.send();
    }

    // USERS
    if ($("#users-chart").length) {
      var request = new XMLHttpRequest();

      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          var users = JSON.parse(this.response);
          var amount = users.users;
          var growth = users.growth;
          var months = users.labels;
          var data = users.datasets[0].data;
          var label = users.datasets[0].label;

          $("#users-growth").text(growth);
          $("#users-amount").text(amount);

          var areaData = {
            labels: months,
            datasets: [{
              data: data,
              backgroundColor: [
                '#e0fff4'
              ],
              borderWidth: 2,
              borderColor: "#00c689",
              fill: 'origin',
              label: label
            }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [{
                display: false,
                ticks: {
                  display: true
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'transparent',
                  zeroLineColor: '#eeeeee'
                }
              }],
              yAxes: [{
                display: false,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  min: 0,
                  max: 300
                },
                gridLines: {
                  drawBorder: false
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: .35
              },
              point: {
                radius: 0
              }
            }
          }
          var salesChartCanvas = $("#users-chart").get(0).getContext("2d");
          var salesChart = new Chart(salesChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/userschart", true);
      request.send();
    }

    // PROJECTS
    if ($("#projects-chart").length) {
      var request = new XMLHttpRequest();

      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {

          var projects = JSON.parse(this.response);
          var percent = projects.procent;
          var growth = projects.growth;
          var months = projects.months;
          var data = projects.datasets[0].data;
          var label = projects.datasets[0].label;

          $("#projects-percent").text(percent);
          $("#projects-growth").text(growth);

          var areaData = {
            labels: months,
            datasets: [{
              data: data,
              backgroundColor: [
                '#e5f2ff'
              ],
              borderWidth: 2,
              borderColor: "#3da5f4",
              fill: 'origin',
              label: label
            }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [{
                display: false,
                ticks: {
                  display: true
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'transparent',
                  zeroLineColor: '#eeeeee'
                }
              }],
              yAxes: [{
                display: false,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  min: 0,
                  max: 300
                },
                gridLines: {
                  drawBorder: false
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: .05
              },
              point: {
                radius: 0
              }
            }
          }
          var salesChartCanvas = $("#projects-chart").get(0).getContext("2d");
          var salesChart = new Chart(salesChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/projectschart", true);
      request.send();
    }

    // DOWNLOADS
    if ($('#offlineProgress').length && "#onlineProgress") {

      var request = new XMLHttpRequest();

      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          var downloads = JSON.parse(this.response);
          var online = downloads.online;
          var offline = downloads.offline;

          var bar = new ProgressBar.Circle(offlineProgress, {
            color: '#000',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 6,
            trailWidth: 6,
            easing: 'easeInOut',
            duration: 1400,
            text: {
              autoStyleContainer: true,
              style: {
                color: "#000",
                position: 'absolute',
                left: '40%',
                top: '50%'
              }
            },
            svgStyle: {
              width: '90%'
            },
            from: {
              color: '#f1536e',
              width: 6
            },
            to: {
              color: '#f1536e',
              width: 6
            },
            // Set default step function for all animate calls
            step: function (state, circle) {
              circle.path.setAttribute('stroke', state.color);
              circle.path.setAttribute('stroke-width', state.width);

              var value = Math.round(circle.value() * 100);
              if (value === 0) {
                circle.setText('');
              } else {
                circle.setText(value);
              }

            }
          });

          bar.text.style.fontSize = '1rem';
          bar.animate(offline); // Number from 0.0 to 1.0

          var bar2 = new ProgressBar.Circle(onlineProgress, {
            color: '#000',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 6,
            trailWidth: 6,
            easing: 'easeInOut',
            duration: 1400,
            text: {
              autoStyleContainer: true,
              style: {
                color: "#000",
                position: 'absolute',
                left: '40%',
                top: '50%'
              }
            },
            svgStyle: {
              width: '90%'
            },
            from: {
              color: '#fda006',
              width: 6
            },
            to: {
              color: '#fda006',
              width: 6
            },
            // Set default step function for all animate calls
            step: function (state, circle) {
              circle.path.setAttribute('stroke', state.color);
              circle.path.setAttribute('stroke-width', state.width);

              var value = Math.round(circle.value() * 100);
              if (value === 0) {
                circle.setText('');
              } else {
                circle.setText(value);
              }

            }
          });

          bar2.text.style.fontSize = '1rem';
          bar2.animate(online); // Number from 0.0 to 1.0

        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/downloads", true);
      request.send();
    }


    //Används inte? Finns ingen html kod?
    if ($("#revenue-chart").length) {
      var CurrentChartCanvas = $("#revenue-chart").get(0).getContext("2d");
      var CurrentChart = new Chart(CurrentChartCanvas, {
        type: 'bar',
        data: {
          labels: ["1982", "", "1993", "", "2003", "", "2013"],
          datasets: [{
            label: 'Europe',
            data: [280000, 90000, 150000, 200000, 50000, 150000, 260000, 150000, 260000],
            backgroundColor: '#405189'
          },
          {
            label: 'Africa',
            data: [250000, 230000, 130000, 160000, 110000, 230000, 50000, 230000, 50000],
            backgroundColor: '#3da5f4'
          }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          scales: {
            yAxes: [{
              display: true,
              gridLines: {
                drawBorder: false
              },
              ticks: {
                fontColor: "#000",
                display: true,
                fontStyle: 400,
                fontSize: 14,
                stepSize: 100000,
                callback: function (value) {
                  var ranges = [
                    { divider: 1e6, suffix: 'M' },
                    { divider: 1e3, suffix: 'k' }
                  ];
                  function formatNumber(n) {
                    for (var i = 0; i < ranges.length; i++) {
                      if (n >= ranges[i].divider) {
                        return (n / ranges[i].divider).toString() + ranges[i].suffix;
                      }
                    }
                    return n;
                  }
                  return formatNumber(value);
                }
              }
            }],
            xAxes: [{
              stacked: false,
              categoryPercentage: .5,
              barPercentage: 1,
              ticks: {
                beginAtZero: true,
                fontColor: "#000",
                display: true,
                fontSize: 14
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                display: true
              },
            }]
          },
          legend: {
            display: false
          },
          elements: {
            point: {
              radius: 0
            }
          }
        }
      });
    }

    // TICKETS
    if ($("#ticket-sort").length) {
      var request = new XMLHttpRequest();

      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          var ticketsInfo = JSON.parse(this.response);
          var years = ticketsInfo.years;
          var tickets = ticketsInfo.tickets;

          //ADDS YEARS TO DROPDOWN 
          years.forEach(year => {
            $("#ticket-sort").append(`<a class="dropdown-item" data-year="${year}">${year}`);
          });

          //CREATES A TABLE WITH THE TICKETS
          tickets.forEach(ticket => {
            var matched = ticket.fullname.match(/\b(\w)/g);
            var shortName = matched.join('');


            var tempTicket = `<tr>
                              <td class="pl-0">
                              <div class="icon-rounded-primary icon-rounded-md">
                              <h4 class="font-weight-medium">${shortName}</h4>
                              </div>
                              </td>
                              <td>
                              <p class="mb-0">${ticket.fullname}</p>
                              <p class="text-muted mb-0">${ticket.city}</p>
                              </td>
                              <td>
                              <p class="mb-0">${ticket.date}</p>
                              <p class="text-muted mb-0"> ${ticket.time}</p>
                              </td>
                              <td>
                              <p class="mb-0">${ticket.project}</p>
                              <p class="text-muted mb-0">${ticket.status}</p>
                              </td>
                              </tr>`;
            $('#ticket-table').append(tempTicket);
          });

        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/tickets", true);
      request.send();
    }

    // SORT TICKET TABLE
    function sortTable(year) {
      var request = new XMLHttpRequest();

      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          var ticketsInfo = JSON.parse(this.response);
          var tickets = ticketsInfo.tickets;
          var sortMatch = new Array();
          var counter = 0;

          // ADDING ALL TICKETS THAT MATCHES THE YEAR
          tickets.forEach(ticket => {

            var date = new Date(ticket.date);
            // SORTS DATE TO YEAR
            var ticketYear = date.getFullYear();

            if (ticketYear == year) {
              sortMatch.push(ticket);
            }
          });

          // CLEARS TABLE
          $('#ticket-table').html("");

          // IF THERE'S A MATCH DO THIS
          if (sortMatch.length > 0) {

            // ADDING MATCHED TICKETS TO TABLE
            sortMatch.forEach(ticket => {
              var matched = ticket.fullname.match(/\b(\w)/g);
              var shortName = matched.join('');


              var tempTicket = `<tr>
                                <td class="pl-0">
                                <div class="icon-rounded-primary icon-rounded-md">
                                <h4 class="font-weight-medium">${shortName}</h4>
                                </div>
                                </td>
                                <td>
                                <p class="mb-0">${ticket.fullname}</p>
                                <p class="text-muted mb-0">${ticket.city}</p>
                                </td>
                                <td>
                                <p class="mb-0">${ticket.date}</p>
                                <p class="text-muted mb-0"> ${ticket.time}</p>
                                </td>
                                <td>
                                <p class="mb-0">${ticket.project}</p>
                                <p class="text-muted mb-0">${ticket.status}</p>
                                </td>
                                </tr>`;
              $('#ticket-table').append(tempTicket);
            });
          } else {
            $('#ticket-table').append('<tr><td>No tickets matches that filter.</td></tr>');
          }
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/tickets", true);
      request.send();
    }

    // TICKET FILTERING
    $("#dropdownMenuDate1").on("click", function () {
      $(".dropdown-item").on("click", function () {
        sortTable($(this).attr("data-year"));
      })
    })

    // UPDATES
    if ($("#updates-list").length) {
      var request = new XMLHttpRequest();

      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          var updates = JSON.parse(this.response);
          var updatesList = updates.updates;

          updatesList.forEach(update => {
            var updateCard = `<li>
                              <h6>${update.title}</h6>
                              <p class="mt-2">${update.description}</p>
                              <p class="text-muted mb-4"><i class="mdi mdi-clock-outline"></i>${update.time}</p>
                              </li>`

            $("#updates-list").append(updateCard);
          });

        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/updates", true);
      request.send();
    }

    // INVOICES
    if ($("#invoices-table").length) {
      var request = new XMLHttpRequest();

      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          var invoices = JSON.parse(this.response);
          var invoicesTable = invoices.invoices;

          invoicesTable.forEach(invoice => {
            var currentStatus;

            switch (invoice.status) {
              case "Pågående":
                currentStatus = "success"
                break;
              case "Öppen":
                currentStatus = "warning"
                break;
              case "Tillfälligt stoppad":
                currentStatus = "danger"
                break;
            }
            var updateCard = `<tr>
            
                              <td>${invoice.invoicenumber}</td>
                              <td>${invoice.customer}</td>
                              <td>${invoice.shipping}</td>
                              <td class="font-weight-bold">${invoice.totalprice}</td>
                              <td>${invoice.customerprice}</td>
                              <td>
                              <div class="badge badge-${currentStatus} badge-fw">${invoice.status}</div>
                              </td>
                              </tr>`

            $("#invoices-table").append(updateCard);
          });
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/openinvoices", true);
      request.send();
    }

  });
})(jQuery);