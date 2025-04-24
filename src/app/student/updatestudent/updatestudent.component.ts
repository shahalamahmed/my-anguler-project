import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentserviceService } from '../studentservice.service';
import { LocationService } from '../../location/location.service';
import { StudentModel } from '../student.model';

@Component({
  selector: 'app-updatestudent',
  standalone: false,
  templateUrl: './updatestudent.component.html',
  styleUrls: ['./updatestudent.component.css']
})
export class UpdatestudentComponent implements OnInit {
  formValue!: FormGroup;
  studentId: string = '';
  locationData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentserviceService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id') || '';
    this.initForm();
    this.loadLocations();
    this.loadStudentData();
  }

  initForm(): void {
    this.formValue = this.fb.group({
      name: [''],
      email: [''],
      cellNo: [''],
      location: ['']
    });
  }

  loadLocations(): void {
    this.locationService.getLocationForStudent().subscribe((res: any) => {
      this.locationData = res;
    });
  }

  loadStudentData(): void {
    this.studentService.getById(this.studentId).subscribe((data: StudentModel) => {
      this.formValue.patchValue({
        name: data.name,
        email: data.email,
        cellNo: data.cellNo,
        location: data.location.id // only ID is set in dropdown
      });
    });
  }

  onUpdate(): void {
    const selectedLocationId = this.formValue.value.location;
    const selectedLocation = this.locationData.find(loc => loc.id === selectedLocationId);

    const updatedStudent: StudentModel = {
      ...this.formValue.value,
      location: selectedLocation
    };

    this.studentService.updateStudent(this.studentId, updatedStudent).subscribe(() => {
      alert('Student updated successfully!');
      this.router.navigate(['/view-students']);
    });
  }
}
