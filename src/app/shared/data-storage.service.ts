import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-130e1-default-rtdb.firebaseio.com/recipes.json',
        )
        .pipe(
            map(recipes => {
                return recipes.map( recipe => {
                    return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []}
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
                console.log("RECEPT: "+recipes);
            })
        );
    }

    storeRecipes(){ 
        const recipes = this.recipeService.getRecipes();

       /* for(let recipeEl of recipes){
            console.log("AA: "+recipeEl);
        }*/

        this.http.put('https://ng-course-recipe-book-130e1-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        });
    }
}