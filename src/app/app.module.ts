import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import{AngularFireStorageModule}from '@angular/fire/compat/storage';
import { ToastrModule } from 'ngx-toastr';
import{AngularFireMessagingModule} from '@angular/fire/compat/messaging';
import { AsyncPipe } from '@angular/common';
import { UtilityService } from './shared/utility.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import{AngularFireDatabaseModule} from '@angular/fire/compat/database';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent
  ],
  imports: [
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
