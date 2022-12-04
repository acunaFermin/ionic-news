import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, NewsResponses } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  constructor( private http: HttpClient ){ 

  }

  getTopHeadlines(): Observable<Article[]> {

    const { apiKey } = environment;
    // https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7f40eb78b782453bb25158aabb2c54a7
  
    return this.http.get<NewsResponses>(`https://newsapi.org/v2/top-headlines?country=us&category=business`,
      {
        params: { apiKey }
      }
    ).pipe(
      map(resp => resp.articles)
    )

  
  }
}
