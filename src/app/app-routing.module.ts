import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { LocationComponent } from './location/location.component';
import { CreateLocationComponent } from './create-location/create-location.component';
import { UpdatelocationComponent } from './updatelocation/updatelocation.component';
import { ViewsstudentComponent } from './student/viewsstudent/viewsstudent.component';
import { CreatestudentComponent } from './student/createstudent/createstudent.component';
import { UpdatestudentComponent } from './student/updatestudent/updatestudent.component';

const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'location', component: LocationComponent },
  { path: 'create', component: CreateLocationComponent },
  { path: 'edit/:id', component: UpdatelocationComponent },
  { path: 'view-students', component: ViewsstudentComponent },
  { path: 'create-student', component: CreatestudentComponent },
  { path: 'update-student/:id', component: UpdatestudentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
