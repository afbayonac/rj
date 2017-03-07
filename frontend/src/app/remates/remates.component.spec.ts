import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RematesComponent } from './remates.component';

describe('DashboardComponent', () => {
  let component: RematesComponent;
  let fixture: ComponentFixture<RematesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RematesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RematesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
