import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipesComponent } from "./recipes.component";
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';


@NgModule({
    declarations: [
        RecipesComponent,
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeListComponent,
        RecipeStartComponent,
        RecipeItemComponent,
    ],
    imports: [
        RouterModule, SharedModule, ReactiveFormsModule, RecipesRoutingModule
    ]
})
export class RecipesModule {
    
}