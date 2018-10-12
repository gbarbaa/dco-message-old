import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcoComponent } from './dco.component';

describe('DcoComponent', () => {
  let component: DcoComponent;
  let fixture: ComponentFixture<DcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
