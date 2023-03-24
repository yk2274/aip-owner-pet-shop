import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OwnerRequest } from 'src/app/interface/owner';
import { OwnerService } from 'src/app/service/owner.service';

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.css']
})
export class OwnerFormComponent {
  formData = this.formBuilder.group({
    firstName: '',
    lastName: ''
  })

  constructor(
    private formBuilder: FormBuilder,
    private ownerService: OwnerService,
    ) { }

  onSubmit() {
    console.log(this.formData.value);
    this.ownerService
      .addOwner(this.formData.value as OwnerRequest)
      .subscribe();
    this.formData.reset();
  }
}
