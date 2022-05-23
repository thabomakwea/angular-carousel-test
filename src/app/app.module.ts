import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AppComponent } from './app.component';
import { SwiperModule } from "swiper/angular";

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent
  ],
  imports: [BrowserModule, CommonModule, FormsModule, SwiperModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
