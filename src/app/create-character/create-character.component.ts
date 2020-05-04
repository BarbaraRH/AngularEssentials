import { Component, OnInit } from '@angular/core';
import { StarsWarsService } from '../star-wars.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  availableSides = [
    {display: 'None', value: ''},
    {display: 'Light', value: 'light'},
    {display: 'Dark', value: 'dark'}
  ]
  swService: StarsWarsService;
  defaultName = 'Obi-Wan'

  constructor(swService: StarsWarsService) {
    this.swService = swService;
  }

  ngOnInit(): void {
  }

  onSubmit(submittedForm){
    if (submittedForm.invalid){
      return;
    }
    console.log(submittedForm);
    this.swService.addCharacter(submittedForm.value.name, submittedForm.value.side);
    submittedForm.resetForm()
  }

}
