import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/*** System of auth, login, logout ***/
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/header/header.component';
import { TableCryptocurrenciesComponent } from './components/table-cryptocurrencies/table-cryptocurrencies/table-cryptocurrencies.component';

import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './components/portfolio/portfolio/portfolio.component';
import { DialogComponent } from './components/portfolio/dialog/dialog.component';
import { AddMovementComponent } from './components/portfolio/add-movement/add-movement.component';
import { VigilantGuard } from './guards/vigilant.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    HeaderComponent,
    TableCryptocurrenciesComponent,
    PortfolioComponent,
    DialogComponent,
    AddMovementComponent,
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
  ],
  providers: [authInterceptorProviders, VigilantGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
