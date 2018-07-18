import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EitComponent } from './eit.component';

describe('EitComponent', () => {
  let component: EitComponent;
  let fixture: ComponentFixture<EitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
