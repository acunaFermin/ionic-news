import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { apiUrl, environment } from 'src/environments/environment';
import { Article, ArticlesByCategoryAndPage, NewsResponses } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  articlesByCategoryAndPage:ArticlesByCategoryAndPage = {};

  constructor( private http: HttpClient ) { }

  private executeQuery<T>( endpoint: string ){

    const { apiKey } = environment;

    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: { 
        apiKey,
        country:'us',
      }
    })
  }

  getTopHeadlines(): Observable<Article[]> {
    
    return this.executeQuery<NewsResponses>(`/top-headlines?category=business`)
    .pipe(
      map(resp => resp.articles)
    )
  }


  getTopHeadlinesByCategory( category:string, loadMore: boolean = false ):Observable<Article[]>{
    
    if(loadMore){
      return this.getArticlesByCategory( category );
    }

    if( this.articlesByCategoryAndPage[category] ) {
      return of( this.articlesByCategoryAndPage[category].articles );
    }
  
    return this.getArticlesByCategory( category );
  }

  private getArticlesByCategory( category:string ){

    if( ! Object.keys( this.articlesByCategoryAndPage ).includes( category ) ){
      
      this.articlesByCategoryAndPage[ category ] = {
        page: 0,
        articles: []
      }

    }

    const page = this.articlesByCategoryAndPage[ category ].page + 1;

    console.log('peticion http realizada')
    return this.executeQuery<NewsResponses>(`/top-headlines?category=${category}&page=${page}`)
    .pipe(
      map(({articles}) => {

        if(articles.length === 0) return this.articlesByCategoryAndPage[category].articles;

        this.articlesByCategoryAndPage[category] = {

          page: page,
          articles: [ ...this.articlesByCategoryAndPage[category].articles, ...articles ]

        }

        return this.articlesByCategoryAndPage[category].articles;
      })
    )



  }


}
