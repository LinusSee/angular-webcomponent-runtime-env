import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterEnvComponent } from './after-env.component';

describe('AfterEnvComponent', () => {
  let component: AfterEnvComponent;
  let fixture: ComponentFixture<AfterEnvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterEnvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfterEnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
