import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcoEditComponent } from './dco-edit.component';

describe('DcoEditComponent', () => {
  let component: DcoEditComponent;
  let fixture: ComponentFixture<DcoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
