import { Injectable } from '@angular/core';
import { Iactiveingredient } from 'src/app/shared/models/interfaces/iactiveingredient';
import { fail } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class ActiveIngredientService {

  activeIngredients: Iactiveingredient[] =
  [{id:0,name:'paracetamol'},
  {id:1,name:'dextromethorphan'},
  {id:2,name:'acetylsalicylic acid'},
  {id:3,name:'Acetaminophen'},
  {id:4,name:'Dextromethorphan'},
  {id:5,name:'Diphenhydramine'}];
  activeing: Iactiveingredient;
  constructor() { }

  getAll() {
    return this.activeIngredients;
  }

  getById(id) {
    for (let i = 0; i < this.activeIngredients.length; i++) {
      if (this.activeIngredients[i].id == id) {
        this.activeing = this.activeIngredients[i];
      }
    }
    return this.activeing;
  }

  Delete(id) {
    let index = this.activeIngredients.findIndex(a => a.id === id);
    if (index > -1) {
      this.activeIngredients.splice(index, 1);
    }

  }

  public getName(id:number):string{
    const index = this.activeIngredients.findIndex(a=>a.id===id);
    if(index >-1){
      return this.activeIngredients[index].name;
    }
  }
}
