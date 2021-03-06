import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Idrug} from './../../shared/models/interfaces/Idrug';
import {DrugServiceService}  from './../../shared/services/drug/drug-service.service';
import { Iactiveingredient } from '../../shared/models/interfaces/iactiveingredient';
import { IdrugType } from '../../shared/models/interfaces/Idrug-type';
import { Ishape } from '../../shared/models/interfaces/ishape';
import { Icolor } from '../../shared/models/interfaces/Icolor';
import { IstrengthUnit } from '../../shared/models/interfaces/Istrength-unit';
import {ActiveIngredientService} from './../../shared/services/active-ingredient/active-ingredient.service';
import {ColorService} from './../../shared/services/color/color.service';
import {DrugTypeService} from './../../shared/services/drug-type/drug-type.service';
import {ShapeService} from './../../shared/services/shape/shape.service';
import {StrengthService} from './../../shared/services/strength/strength.service';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-drug-add',
  templateUrl: './drug-add.component.html',
  styleUrls: ['./drug-add.component.css']
})
export class DrugAddComponent implements OnInit{

 title='';
 btnName='';
 id:number;
 //values for dropdown list [add]
 activeIngredients:Iactiveingredient[];
 types:IdrugType[];
 shapes:Ishape[];
 colors:Icolor[];
 strengthUnits:IstrengthUnit[];
 pill=false;
 myForm:FormGroup;
 drug:Idrug;

 //drug values for edit
 drugActiveIngredient:number[];
 drugType:IdrugType;
 drugColor:Icolor;
 drugShape:Ishape;
 drugStrengthUnit:IstrengthUnit;

  constructor(private drugservice:DrugServiceService,private route:Router,private activeRoute :ActivatedRoute,private activeIngredientService:ActiveIngredientService,private colorService:ColorService,private shapeService:ShapeService,private strengthService:StrengthService,private drugTypeService:DrugTypeService) { 
  }
  
  ngOnInit() {
    this.activeRoute.params.subscribe((params)=>{this.id=params['id'];});
    this.title='ADD Drug';
    this.btnName ='ADD';
    //this.activeIngredients=this.activeIngredientService.getAll();
    //this.activeIngredients=this.activeIngredientService.getAll();
    this.activeIngredientService.getAll().subscribe(
      (data)=>{this.activeIngredients=data}
    )
    this.types = this.drugTypeService.getAll();
    this.shapes= this.shapeService.getAll();
    this.colors=this.colorService.getAll();
    this.strengthUnits= this.strengthService.getAll();
    this.myForm = new FormGroup({
      tradeName : new FormControl('',[Validators.required,Validators.minLength(4),Validators.pattern('^[A-Z]{2}\\d{4}')]),
      company : new FormControl('',[Validators.required,Validators.minLength(4),Validators.pattern('^[A-Z]{2}\\d{4}')]),
      activeIngredient: new FormControl('',Validators.required),
      usage : new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern('^[A-Z]{2}\\d{4}')]),
      dosage : new FormControl('',[Validators.required,Validators.minLength(5)]),
      pregnancyWarning : new FormControl('',Validators.required),
      childernWarning : new FormControl('',Validators.required),
      warning : new FormControl(),
      type : new FormControl('',Validators.required),
      textOnSide : new FormControl(),
      textOnOther : new FormControl(),
      shape : new FormControl(),
      color : new FormControl(),
      strength : new FormControl('',Validators.required),
      strengthUnit : new FormControl('',Validators.required),
      approvalHistory : new FormControl('',Validators.required),
 
    });
    //---------------Edit------------------
    if(this.id){
      this.title = 'Edit Drug';
      this.btnName = 'Edit';
      this.drug = this.drugservice.getById(this.id);
      this.drugActiveIngredient=[];
      for(let i=0;i<this.drug.activeIngredient.length;i++){
        this.drugActiveIngredient[i] = this.activeIngredientService.getById(this.drug.activeIngredient[i]).id;
      }
      this.drugStrengthUnit = this.strengthService.getById(this.drug.strengthUnit);
      this.drugType=this.drugTypeService.getById(this.drug.drugTypeName);
      this.myForm.patchValue(
        {
       
          id:this.id,
          tradeName : this.drug.drugName,
          company : this.drug.company,
          activeIngredient : this.drugActiveIngredient,
          usage : this.drug.usage,
          dosage : this.drug.dosage,
          pregnancyWarning : this.drug.pregnancyWarning,
          childernWarning : this.drug.childernWarning,
          warning : this.drug.warning,
          type : this.drugType.id,
          strength : this.drug.strength,
          strengthUnit : this.drugStrengthUnit.id,
          approvalHistory : this.drug.approvalHistory,
          //drugLogo : this.drug.image
        });  
      if(this.drugType.name=== 'Tablets'){
         this.pill=true;
         this.drugColor= this.colorService.getById(this.drug.color);
         this.drugShape= this.shapeService.getById(this.drug.shape);
         this.myForm.patchValue(
          {
         
            // id:this.id,
            // tradeName : this.drug.drugName,
            // company : this.drug.company,
            // activeIngredient : this.drugActiveIngredient,
            // usage : this.drug.usage,
            // dosage : this.drug.dosage,
            // pregnancyWarning : this.drug.pregnancyWarning,
            // childernWarning : this.drug.childernWarning,
            // warning : this.drug.warning,
            // type : this.drugType.id,
            textOnSide : this.drug.textOnSide,
            textOnOther : this.drug.textOnOtherSide,
            shape : this.drugShape.id,
            color : this.drugColor.id,
            // strength : this.drug.strength,
            // strengthUnit : this.drugStrengthUnit.id,
            // approvalHistory : this.drug.approvalHistory,
            // drugLogo : this.drug.image,
           // pillImage : this.drug.pillImage
          });
      }}
        
  }
  callType(){
    this.drugType = this.drugTypeService.getById(this.myForm.get('type').value);
      if(this.drugType.name === "Tablets")
      {
        this.pill=true;
      }   
      else
      {
        this.pill=false;
      }
  }
  public onSubmit(){
    if(this.myForm.valid)
    {
      this.drug = {
        id:this.id,
        drugName : this.myForm.get('tradeName').value,
        company : this.myForm.get('company').value,
        activeIngredient : this.myForm.get('activeIngredient').value,
        usage : this.myForm.get('usage').value,
        dosage : this.myForm.get('dosage').value,
        pregnancyWarning : this.myForm.get('pregnancyWarning').value,
        childernWarning : this.myForm.get('childernWarning').value,
        warning : this.myForm.get('warning').value,
        drugTypeName : this.myForm.get('type').value,      
        strength : this.myForm.get('strength').value,
        strengthUnit : this.myForm.get('strengthUnit').value,
        approvalHistory : this.myForm.get('approvalHistory').value,
        image : './.."../../../assets/images/Pills-blue-icon.png',
        textOnSide : this.myForm.get('textOnSide').value,
        textOnOtherSide : this.myForm.get('textOnOther').value,
        shape:this.myForm.get('shape').value,
        color:this.myForm.get('color').value,
        pillImage:'./.."../../../assets/images/Pills-blue-icon.png'
        
      };
      if(this.id){
        this.drugservice.save(this.drug);
      }
      else{
        this.drugservice.add(this.drug);
      }
      this.route.navigate(['/drug','listing']);
    } 

  }

  cancelForm(){
    this.myForm.reset();
  }
}
