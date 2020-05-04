import { Component, OnInit } from '@angular/core';
import { StarsWarsService } from './star-wars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  swService: StarsWarsService;

  constructor(swService: StarsWarsService){
    this.swService = swService
  }

  ngOnInit() {
    this.swService.fetchCharacters();
  }
}
