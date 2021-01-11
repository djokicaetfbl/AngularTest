import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
import { CoreModule } from './core.module';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    //ShoppingListComponent,
    //ShoppingEditComponent,
   // RecipesComponent,
    //AuthComponent, ovo se prebacuje u njihove module ;D , deklaracija mora da bude samo na jednom mjestu :D
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule, //treba instalirati preko cmd-a
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
