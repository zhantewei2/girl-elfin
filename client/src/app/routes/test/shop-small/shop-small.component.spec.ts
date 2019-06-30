import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSmallComponent } from './shop-small.component';

describe('ShopSmallComponent', () => {
  let component: ShopSmallComponent;
  let fixture: ComponentFixture<ShopSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
