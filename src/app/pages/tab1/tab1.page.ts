import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  
  articles: Article[] = []

  constructor( private newsService: NewsService ) {}
  
  ngOnInit(): void {
    this.newsService.getTopHeadlines().subscribe( resp => {
      this.articles.push( ...resp )
    })
  }

  loadData( event:any ){


    setTimeout(() => {
      
      this.newsService.getTopHeadlinesByCategory( 'business', true )
      .subscribe( articles => {
        this.articles = articles;
  
        event.target.complete();
        
      })
      
    }, 1000);

  }

}
