import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { PetRequest } from 'src/app/interface/pet';
import { PetService } from 'src/app/service/pet.service';
import { Owner } from 'src/app/interface/owner';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent {
  formData = this.formBuilder.group({
    name: '',
    breed: '',
    owner: ''
  })

  constructor(
    private formBuilder: FormBuilder,
    private petService: PetService,
    ) { }

  onSubmit() {
    console.log(this.formData.value);
    this.petService
      .addPet(this.formData.value as PetRequest)
      .subscribe();
    this.formData.reset();
  }
}
