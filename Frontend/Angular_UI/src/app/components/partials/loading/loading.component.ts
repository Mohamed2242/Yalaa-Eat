import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../services/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit {

  isLoading!: boolean;
  constructor(loadingService: LoadingService) {
    loadingService.isLoading.subscribe((isLoad:any) => {
      this.isLoading = isLoad;
    });


   }

  ngOnInit(): void {
  }

}
