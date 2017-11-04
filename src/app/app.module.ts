import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Imports for components
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { StartComponent } from './start/start.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PackageComponent } from './package/package.component';
import { HardwareUitlenenFormComponent } from './hardware-uitlenen-form/hardware-uitlenen-form.component';
import { HomeComponent } from './home/home.component';

// Imports for database related stuff
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// This is the configuration for the firestorm database / authentification
export const firebaseConfig = {
  apiKey: 'AIzaSyBs99mDO2cmSZCM_TXwh5_lOA_Mn2nDlxk',
  authDomain: 'hup1-603ab.firebaseapp.com',
  databaseURL: 'https://hup1-603ab.firebaseio.com',
  projectId: 'hup1-603ab',
  storageBucket: 'hup1-603ab.appspot.com',
  messagingSenderId: '441661095916'
};

// Defining paths for routing
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'HomePage', component: HomeComponent },
  { path: 'HardwareUitlenen', component: HardwareUitlenenFormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    StartComponent,
    AuthenticationComponent,
    PackageComponent,
    HardwareUitlenenFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
