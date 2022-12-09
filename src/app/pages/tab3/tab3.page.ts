import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  /**
   * tip:
   * El getter dispara el ciclo de deteccion de cambios de angular
   * en forma automatica si hay cambios en el localArticles
   */
  get articles(): Article[] {
    return this.storageService.localArticles  
  }

  
  constructor(
    private storageService:StorageService
  ) {}

  

  ngOnInit(): void {
  }


}
