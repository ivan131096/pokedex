import {Component, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {Image} from 'primeng/image';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-root',
  imports: [Button, Image, Paginator, FormsModule, InputText],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'PokeDex';
  list:any[] = [];
  first: number = 0;
  rows: number = 30;
  totalRecords: number = 0;
  nome:string = ''

  ngOnInit() {
    this.fetchAll()
  }

  onPageChange(event: PaginatorState) {
    const offset = (event.rows! * event.page!)
    this.fetchAll(offset, event.rows!)
  }

  fetchAll(offset: number = 0, limit: number = 30) {
    fetch('https://pokeapi.co/api/v2/pokemon?'+`offset=`+offset+`&`+`limit=`+limit).then(res => res.json()).then((data) => {
      data.results.forEach((element:any) => {
        this.totalRecords = data.count;
        this.list = []
        this.fetchOne(element.url)
      })
    })
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
