import { Component, OnInit } from '@angular/core';
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

  
  constructor( private newsService: NewsService ) {}

  ngOnInit() {
    this.newsService.getTopHeadlinesByCategory( this.categories[4] )
    .subscribe(resp => {
      console.log('bussines', resp);
      this.articles = resp;
    })
  }


  segmentChanged(event:any){
    let category:string = event.detail.value;
    
    this.newsService.getTopHeadlinesByCategory( category )
    .subscribe(resp => {
      console.log(category, resp);
      this.articles = resp;
    })

  };


}
