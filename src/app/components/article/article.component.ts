import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';

//plugins
import { Browser } from '@capacitor/browser'
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article!: Article;
  @Input() i!: number;

  constructor( private platform: Platform ) { }


  openArticle(){
    // window.open( this.article.url );

    //nativo de capacitor
    Browser.open({ url: this.article.url });
  }
}
