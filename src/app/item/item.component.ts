import { Component, OnInit, Input } from '@angular/core';
import { StarsWarsService } from '../star-wars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() character;
  swService: StarsWarsService;

  constructor(swService: StarsWarsService) {
    this.swService = swService;
  }

  ngOnInit(): void {
  }

  onAssign(side){
    this.swService.onSideChosen({name: this.character.name, side: side})
  }

}
