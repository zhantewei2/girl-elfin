import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfMainComponent } from './self-main.component';

describe('SelfMainComponent', () => {
  let component: SelfMainComponent;
  let fixture: ComponentFixture<SelfMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
