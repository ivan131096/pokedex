import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Button} from 'primeng/button';
import {Image} from 'primeng/image';
import {DataView} from 'primeng/dataview';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {NgClass, NgForOf, NgOptimizedImage, NgStyle} from '@angular/common';
import {clearInterval} from 'node:timers';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, Image, DataView, Paginator, NgForOf, NgOptimizedImage, NgStyle, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'PokeDex';
  list:any[] = [];
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  test:any;

  onPageChange(event: PaginatorState) {
    const offset = (event.rows! * event.page!)
    this.fetchAll(offset, event.rows!)
  }

  ngOnInit() {
    this.fetchAll()
  }

  demonho(){
    console.log(`satanas`)
  }

  demon: any

  fetchAll(offset: number = 0, limit: number = 10) {\
    this.clear()
    fetch('https://pokeapi.co/api/v2/pokemon?'+`offset=`+offset+`&`+`limit=`+limit).then(res => res.json()).then((data) => {
      data.results.forEach((element:any) => {
        this.totalRecords = data.count;
        this.list = []
        this.fetchOne(element.url)
      })
      this.demon = setInterval(this.demonho, 1000)
    })
  }

  clear(){
    clearInterval(this.demon)
  }

  fetchOne(url:any){
    fetch(url).then(res => res.json()).then((data) => {
      this.list.push(data);
    })
  }

  playAudio(src:string){
    let audio = new Audio();
    audio.src = src;
    audio.load();
    audio.play().then(r => console.log(r));
  }
}
