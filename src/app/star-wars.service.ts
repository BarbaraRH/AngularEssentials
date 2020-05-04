import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { LogService } from './log.service';

@Injectable()

export class StarsWarsService {
  private characters = [
    { name: 'Luke Skywalker', side: '' },
    { name: 'Darth Vader', side: '' }
  ];
  fetchedData = {};
  private logService: LogService;
  charactersChanged = new Subject<void>();
  http: HttpClient;

  constructor(logService: LogService, http: HttpClient){
    this.logService = logService;
    this.http = http;
  }

  fetchCharacters() {
    this.http.get('https://swapi.dev/api/people/')
      .subscribe(
        (data) => {
          const chars = data['results'].map(char => {
            return {name: char.name, side: ''};
          });
          this.characters = chars;
          this.charactersChanged.next();
        }
      );
  }

  getCharacters(chosenList){
    if(chosenList === 'all'){
      return [...this.characters];
    }

    return this.characters.filter((char)=>
    char.side === chosenList)
  }

  onSideChosen(charInfo){
    const pos = this.characters.findIndex(char=>char.name === charInfo.name)
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog('Changed side of ' + charInfo.name + ', new side: ' + charInfo.side)
  }

  addCharacter(name, side){
    const pos = this.characters.findIndex(char=>char.name === name);
    if (pos !== -1){
      return;
    }
    const newChar = {name: name, side:side};
    this.characters.push(newChar);
  }
}

//private: solo se puede ocupar dentro del archivo
