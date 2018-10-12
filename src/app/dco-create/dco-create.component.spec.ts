import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcoCreateComponent } from './dco-create.component';

describe('DcoCreateComponent', () => {
  let component: DcoCreateComponent;
  let fixture: ComponentFixture<DcoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
