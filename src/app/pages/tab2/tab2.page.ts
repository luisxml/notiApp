import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment, {static: true}) segment: IonSegment
  // cetegorias = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];

  cetegorias = ['Economía', 'Entretenimiento', 'General', 'Salud', 'Ciencia', 'Deporte', 'Tecnología'];


  noticias: Article[] = [];

  constructor(
    private _noticiasService: NoticiasService
  ) {}

  ngOnInit() {
    this.segment.value = this.cetegorias[0];
    this.getNoticias(this.segment.value);
  }

  getNoticias(categoria: string, event?) {

    if (categoria === 'Economía') {
      categoria = 'Business';
    }

    if (categoria === 'Entretenimiento') {
      categoria = 'Entertainment';
    }

    if (categoria === 'General') {
      categoria = 'General';
    }

    if (categoria === 'Salud') {
      categoria = 'Health';
    }

    if (categoria === 'Ciencia') {
      categoria = 'Science';
    }

    if (categoria === 'Deporte') {
      categoria = 'Sports';
    }

    if (categoria === 'Tecnología') {
      categoria = 'Technology';
    }

    this._noticiasService.getTopHeadLinesCategoria(categoria).subscribe(
      response => {  
        console.log(response);
        this.noticias.push(...response.articles);
        if (event) {
          event.target.complete();
        }
      }
    );
  }

  change(event) {
    this.segment.value = event.detail.value;
    this.noticias = [];
    this.getNoticias(this.segment.value);
  }

  loadData(event) {
    // console.log(event);
    this.getNoticias(this.segment.value, event);
  }

}
