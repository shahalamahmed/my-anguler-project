import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { LocationService } from '../location/location.service';
import { Router } from '@angular/router'; 
import { location } from '../location/location.model';

@Component({
  selector: 'app-updatelocation',
  standalone: false,
  templateUrl: './updatelocation.component.html',
  styleUrl: './updatelocation.component.css'
})

export class UpdatelocationComponent implements OnInit {
  formValue!: FormGroup;
  id: string = "";
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    public router: Router
  ) { }
  cancel() {
    this.router.navigate(['/locations']);
  }
  ngOnInit(): void {
    this.initializeForm();
    this.id = this.route.snapshot.params['id'];
    
    this.locationService.getById(this.id).subscribe({
      next: (res: location) => {
        this.formValue.patchValue(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  initializeForm(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      city: [''],
      state: [''],
      photo: [''],
      availableUnits: [0],
      wifi: [''],
      laundry: ['']
    });
  }

  updateLocation() {
    if (this.formValue.invalid) {
      return;
    }

    this.isSubmitting = true;
    const updatedLocation = this.formValue.value;

    this.locationService.updateLocation(this.id, updatedLocation).subscribe({
      next: (res) => {
        alert('Location updated successfully!');
      },
      error: (err) => {
        console.log(err);
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}