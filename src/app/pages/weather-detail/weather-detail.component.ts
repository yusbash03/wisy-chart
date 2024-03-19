import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  ChartOptions, ChartType, Chart, ChartData } from 'chart.js';
import { ChartServiceService } from 'src/app/services/chart-service.service';

//import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit  {

  code!: string;
  temperature: any =[];
  name: any =[];
  shortForecast: any =[];
  periodsData:any = [];
  isLoading: boolean = false;


  constructor(private route: ActivatedRoute, private chartService: ChartServiceService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.code = params.get('code') || '';
      console.log(params);
      this.fetchWeatherData();
    });
  }

  // ngAfterViewInit() {
  //   this.initializeLineChart();
  // }

  dataFetch(temp:any, name:any, forecast:any){
    new Chart('dataX', {
      type: 'line',
      data: {
        labels: name,
        datasets: [{
          label: 'temperature',
          data: temp,
          borderWidth: 3,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.2
        }]
      },
      // options: {
      //   scales: {
      //     y: {
      //       beginAtZero: true
      //     }
      //   }
      // }
    });
  }

  check(){
    alert('Checking...');
  }

  fetchWeatherData() {
    this.isLoading = true;
    this.chartService.getWeatherForecast(this.code).subscribe((data) => {
      this.periodsData = data.properties.periods;
      console.log("perio", this.periodsData);
      if(this.periodsData !== null){
        for (let i = 0; i < this.periodsData.length; i++) {
          this.shortForecast.push(this.periodsData[i].shortForecast);
          this.name.push(this.periodsData[i].name);
          this.temperature.push(this.periodsData[i].temperature);
        }
        this.dataFetch(this.temperature, this.name, this.shortForecast);
        this.isLoading =false;
        return;
      }
      alert("No forecast data available");
        this.isLoading =false;
        return

      
    });
  }






  // fetchWeatherData() {
  //   this.chartService.getWeatherForecast(this.code).subscribe((data) => {
  //     // Extract necessary data for the chart
  //     //this.lineChartData[0].data = data.properties.periods.map((period) => period.temperature);
  //     //this.lineChartLabels = data.properties.periods.map((period) => period.name);
  //     //console.log("Stringi", JSON.stringify(data.properties));
  //     console.log("Stringi", JSON.stringify(data.properties.periods[0]));
  //   });
  // }

}
