import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../student.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentserviceService } from '../studentservice.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocationService } from '../../location/location.service';

@Component({
  selector: 'app-createstudent',
  standalone: false,
  templateUrl: './createstudent.component.html',
  styleUrls: ['./createstudent.component.css']
})
export class CreatestudentComponent implements OnInit {
  formValue!: FormGroup;
  locationData: any[] = [];
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private createService: StudentserviceService,
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadLocations();
  }

  initializeForm(): void {
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cellNo: ['', Validators.required],
      location: ['', Validators.required] // just store location ID here
    });
  }

  loadLocations(): void {
    this.locationService.getLocationForStudent().subscribe(
      (data: any) => {
        this.locationData = data;
      },
      (error) => {
        console.error('Failed to load locations', error);
      }
    );
  }

  onSubmit(): void {
    if (this.formValue.invalid) return;

    const selectedLocationId = this.formValue.value.location;
    const selectedLocation = this.locationData.find(loc => loc.id === selectedLocationId);

    const studentData: StudentModel = {
      ...this.formValue.value,
      location: selectedLocation
    };

    this.isSubmitting = true;

    this.createService.createStudent(studentData).subscribe(
      () => {
        this.successMessage = 'Student created successfully!';
        this.isSubmitting = false;
        this.formValue.reset();
        this.router.navigate(['/view-students']);
      },
      (error) => {
        this.errorMessage = 'Failed to create student.';
        this.isSubmitting = false;
        console.error(error);
      }
    );
  }

  get f() {
    return this.formValue.controls;
  }
}
