import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveIngredientAddComponent } from './active-ingredient-add/active-ingredient-add.component';
import { ActiveIngredientListingComponent } from './active-ingredient-listing/active-ingredient-listing.component';
import { ActiveIngrediantItemComponent } from './active-ingrediant-item/active-ingrediant-item.component';
import { ActiveIngredientDetailsComponent } from './active-ingredient-details/active-ingredient-details.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MatSelectModule
  ],
  declarations: [
    ActiveIngredientAddComponent,
    ActiveIngredientListingComponent,
    ActiveIngrediantItemComponent,
    ActiveIngredientDetailsComponent
],
exports:[
  ActiveIngrediantItemComponent
]
})
export class ActiveIngredientModule { }
