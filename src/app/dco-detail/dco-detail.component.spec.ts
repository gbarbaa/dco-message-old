import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcoDetailComponent } from './dco-detail.component';

describe('DcoDetailComponent', () => {
  let component: DcoDetailComponent;
  let fixture: ComponentFixture<DcoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
