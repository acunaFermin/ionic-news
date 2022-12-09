import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  get localArticles(): Article[] {
    return [ ...this._localArticles] 
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;

    this.loadFavorites();
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }


  async saveRemoveArticle( article:Article ){


    let existArticle = this._localArticles.find( existingArticles => existingArticles === article )

    if( existArticle ){

      this._localArticles = this._localArticles.filter( art => art !== article )
    
    }else{

      this._localArticles = [ article, ...this._localArticles ]
    }


    this._storage?.set('articles', this._localArticles)

  }


  loadFavorites(){  
    this._storage?.get('articles')
    .then( resp => {
      this._localArticles = [ ...resp] || [];
    })
    .catch(err => console.log(err))
  }

}