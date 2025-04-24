import { Component, OnInit } from '@angular/core';
import { location } from '../location/location.model';
import { LocationService } from '../location/location.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-location',
  standalone: false,
  templateUrl: './create-location.component.html',
  styleUrl: './create-location.component.css'
})
export class CreateLocationComponent implements OnInit {

  location: location = new location();
  formValue!: FormGroup;
  locationData: any;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private locationService: LocationService,
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      city: [''],
      state: [''],
      photo: [''],
      availableUnits: [''],
      wifi: [''],
      laundry: [''],
    });
  }

  get f() { return this.formValue.controls; }

  createLocation() {
    this.isSubmitting = true;

    this.location = { ...this.location, ...this.formValue.value };

    this.locationService.createLocation(this.location).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.formValue.reset();

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Location created successfully!',
          confirmButtonColor: '#28a745'
        });
      },
      error: (err) => {
        this.isSubmitting = false;

        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'An error occurred while creating the location. Please try again.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }
}

