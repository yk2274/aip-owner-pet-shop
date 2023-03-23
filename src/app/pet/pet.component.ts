import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Pet } from '../interface/pet';
import { PetService } from '../service/pet.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})

export class PetComponent {
  pets: Pet[] = [];
  sortedData: Pet[] = [];

  constructor(private petService: PetService) { }

  ngOnInit(): void {
    this.petService.getPets()
      .subscribe(pets => {
        this.pets = pets
        this.sortedData = pets
      });
  }

  sortData(sort: Sort) {
    const data = this.pets.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'breed':
          return compare(a.breed, b.breed, isAsc);
        // case 'ownerId':
        //   return compare(a.breed, b.breed, isAsc);
        case 'dateCreated':
          return compare(a.dateCreated, b.dateCreated, isAsc);
        case 'dateModified':
          return compare(a.dateModified, b.dateModified, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}