import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { WeatherDetailComponent } from './pages/weather-detail/weather-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { LoaderComponent } from './components/loader/loader.component';
import { CommonModule } from '@angular/common';


const appRoutes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "weather/:code", component: WeatherDetailComponent },
  { path: "**", component: NotFoundComponent },
  { path: "", redirectTo: "homepage", pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NotFoundComponent,
    LoaderComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    CommonModule,
    NgChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
