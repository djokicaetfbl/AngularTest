import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
    declarations: [
        AlertComponent,
        DropdownDirective,
        LoadingSpinnerComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CommonModule,
        DropdownDirective,
        AlertComponent, // moramo da uradimo
        LoadingSpinnerComponent 
    ]
})
export class SharedModule {
    
}