import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarsWarsService } from '../star-wars.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  characters = [];
  activatedRoute: ActivatedRoute;
  swService: StarsWarsService;
  loadedSide = 'all';
  subscription;

  constructor(activatedRoute: ActivatedRoute, swService: StarsWarsService) {
    this.activatedRoute = activatedRoute;
    this.swService = swService;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.characters = this.swService.getCharacters(params.side);
        this.loadedSide = params.side;
      }
    );
    this.subscription = this.swService.charactersChanged.subscribe(
      () => {
        this.characters = this.swService.getCharacters(this.loadedSide);
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
