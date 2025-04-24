import { Component, OnInit } from '@angular/core';
import { StudentserviceService } from '../studentservice.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocationService } from '../../location/location.service';
import { forkJoin } from 'rxjs';
import { error, log } from 'console';

@Component({
  selector: 'app-viewsstudent',
  standalone: false,
  templateUrl: './viewsstudent.component.html',
  styleUrls: ['./viewsstudent.component.css']
})
export class ViewsstudentComponent implements OnInit {
  students: any[] = [];
  locations: any[] = [];

  constructor(
    private service: StudentserviceService,
    private locationService: LocationService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.locationService.getLocationForStudent().subscribe((loc) => {
      this.locations = loc;
      console.log('Locations:', loc);
    });

    this.service.getAllStudent().subscribe((data) => {
      this.students = data;
      console.log('Students:', data);
    });
  }

  loadData(): void {
    forkJoin({
      locations: this.locationService.getLocationForStudent(),
      students: this.service.getAllStudent()
    })
      .subscribe({
        next: ({ locations, students }) => {
          this.locations = locations;
          this.students = students;
        },
        error: err => {
          console.log(err);

        }
      })
  }
  deleteStudent(studentId: number): void {
    this.service.deleteStudent(studentId).subscribe({
      next: res => {
        this.loadData();
      },
      error: err => {
        console.log(err);
      }
    });
  }  
}
