import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { StorageService } from 'src/app/services/storage.service';
import { Browser } from '@capacitor/browser'

//plugins
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article!: Article;
  @Input() i!: number;
  result!: string;


  get localArticles() {
    return this.storageService.localArticles;
  }

  constructor( 
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService:StorageService
  ) { }


  openArticle(){
    // window.open( this.article.url );

    //nativo de capacitor
    Browser.open({ url: this.article.url });
  }

  async openMenu() {

    const isFav:boolean = !!this.localArticles.find( localArticle => localArticle === this.article );

    const buttons = [
      // {
      //   text: 'Compartir',
      //   icon: 'share-outline',
      //   handler: () => this.onShareArticle()
      // },
      // {
      //   text: 'Favorito',
      //   icon: 'heart-outline',
      //   handler: () => this.onToggleFavorite()
      // },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel'
      },
    ]

    const share = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArticle(),
      role: ''
    }
    
    const favorito = {
      text: 'Favorito',
      icon: 'heart-outline',
      handler: () => this.onToggleFavorite(),
      role: '',
    }
    
    const borrarFavorito = {
      text: 'Quitar favorito',
      icon: 'trash-outline',
      handler: () => this.onToggleFavorite(),
      role: ''
    }

    if( isFav ){
      buttons.unshift( borrarFavorito )
    }else{
      buttons.unshift( favorito )
    }

    if( this.platform.is('capacitor') ){
      buttons.unshift( share )
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons,
    });

    

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
  };


  onShareArticle(){

    const { title, source, url } = this.article;

    this.socialSharing.share(
      title,
      source.name,
      undefined,
      url
    )

  };

  onToggleFavorite(){
    this.storageService.saveRemoveArticle( this.article )
  };
}
