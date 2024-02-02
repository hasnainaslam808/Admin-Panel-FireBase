import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AsyncPipe } from '@angular/common';
import { UtilityService } from './shared/utility.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import{AngularFireStorageModule}from '@angular/fire/compat/storage';
import{AngularFireMessagingModule} from '@angular/fire/compat/messaging';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import{AngularFireDatabaseModule} from '@angular/fire/compat/database';
import{AngularFireModule} from '@angular/fire/compat'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    ToastrModule.forRoot(),
    AngularFireAuthModule,
    AngularFireDatabaseModule
    
  ],
  providers: [UtilityService,AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
