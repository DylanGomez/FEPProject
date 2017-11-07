import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ToastModule} from 'ng2-toastr/ng2-toastr';


// Imports for components
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { StartComponent } from './start/start.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PackageComponent } from './package/package.component';
import { HardwareUitlenenFormComponent } from './hardware-uitlenen-form/hardware-uitlenen-form.component';
import { HomeComponent } from './home/home.component';
import { HardwareDefectComponent } from './hardware-defect/hardware-defect.component';
import { ToevoegenComponent } from './toevoegen/toevoegen.component';
// Imports for database related stuff
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ModalService } from './_services/index';
import { ModalComponent } from './_directives/index';


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
  { path: 'HardwareUitlenen', component: HardwareUitlenenFormComponent},
  { path: 'HardwareDefect', component: HardwareDefectComponent},
  { path: 'Package', component: PackageComponent},
  { path: 'HardwareToevoegen', component: ToevoegenComponent}
  
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
    HomeComponent,
    ModalComponent,
    ToevoegenComponent,
    HardwareDefectComponent
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
    ),
    ToastModule.forRoot()
  ],
  providers: [
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
