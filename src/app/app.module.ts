import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { LocationComponent } from './location/location.component';
import { provideHttpClient } from '@angular/common/http';
import { CreateLocationComponent } from './create-location/create-location.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdatelocationComponent } from './updatelocation/updatelocation.component';
import { ViewsstudentComponent } from './student/viewsstudent/viewsstudent.component';
import { CreatestudentComponent } from './student/createstudent/createstudent.component';
import { UpdatestudentComponent } from './student/updatestudent/updatestudent.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    LocationComponent,
    CreateLocationComponent,
    UpdatelocationComponent,
    ViewsstudentComponent,
    CreatestudentComponent,
    UpdatestudentComponent // Only remaining components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient() 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }