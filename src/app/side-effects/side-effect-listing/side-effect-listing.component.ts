import { Component, OnInit } from '@angular/core';
import { Isideeffect } from '../../shared/models/interfaces/Isideeffect';
import { SideeffectService } from '../../shared/services/sideeffect.service';

@Component({
  selector: 'app-side-effect-listing',
  templateUrl: './side-effect-listing.component.html',
  styleUrls: ['./side-effect-listing.component.css']
})
export class SideEffectListingComponent implements OnInit {

  public sideeffects: Isideeffect[];
  sideeffectService :SideeffectService;
  constructor() { }

  ngOnInit() {
    this.sideeffectService= new SideeffectService;
    this.sideeffects= this.sideeffectService.getAll();
  }

}
