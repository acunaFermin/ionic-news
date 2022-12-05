import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];

  articles!:Article[]

  selectedCategory:string = 'business'

  @ViewChild( IonInfiniteScroll ) infiniteScroll!:IonInfiniteScroll;

  
  constructor( private newsService: NewsService ) {}

  ngOnInit() {
    this.newsService.getTopHeadlinesByCategory( this.selectedCategory )
    .subscribe(resp => {
      console.log('bussines', resp);      
    })
  }


  segmentChanged(event:any){


    this.selectedCategory = (event as CustomEvent).detail.value;
    
    this.newsService.getTopHeadlinesByCategory( this.selectedCategory )
    .subscribe(resp => {
      console.log(this.selectedCategory, resp);
      this.articles = resp;
    })

  };

  loadData( event:any ){


    setTimeout(() => {
      
      this.newsService.getTopHeadlinesByCategory( this.selectedCategory, true )
      .subscribe( articles => {
        this.articles = articles;
  
        event.target.complete();
        
      })
      
    }, 1000);

  }


}
