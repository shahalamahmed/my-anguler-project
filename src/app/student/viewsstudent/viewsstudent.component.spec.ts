import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsstudentComponent } from './viewsstudent.component';

describe('ViewsstudentComponent', () => {
  let component: ViewsstudentComponent;
  let fixture: ComponentFixture<ViewsstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewsstudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewsstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
