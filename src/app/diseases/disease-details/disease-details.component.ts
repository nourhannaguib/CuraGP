import { Component, OnInit, Input } from '@angular/core';
import { Idisease } from '../../shared/models/interfaces/idisease';
import { DiseaseServiceService } from '../../shared/services/disease-service.service';
import { IDrugDisease } from '../../shared/models/interfaces/IDrugDisease';
import {ForbiddenDrugsComponent} from '../../diseases/forbidden-drugs/forbidden-drugs.component';
import {TreatedDrugsComponent} from '../../diseases/treated-drugs/treated-drugs.component';

@Component({
  selector: 'app-disease-details',
  templateUrl: './disease-details.component.html',
  styleUrls: ['./disease-details.component.css']
})
export class DiseaseDetailsComponent implements OnInit {

  constructor(private diseaseServiceService:DiseaseServiceService) { }
  @Input() disease:Idisease;
  bodyparts:string[];
  
  ngOnInit() {
    this.disease=this.diseaseServiceService.getById(1);    
    this.bodyparts=this.diseaseServiceService.getDiseaseBodyParts(1);
  }
 

}
