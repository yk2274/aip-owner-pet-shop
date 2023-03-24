import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { PetFormComponent } from '../form/pet-form/pet-form.component';
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
  constructor(
    private petService: PetService,
    private dialog: MatDialog
    
    ) { }

  ngOnInit(): void {
    this.loadPet();
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
        case 'owner':
          return compare(a.owner.firstName, b.owner.firstName, isAsc);
        case 'dateCreated':
          return compare(a.dateCreated, b.dateCreated, isAsc);
        case 'dateModified':
          return compare(a.dateModified, b.dateModified, isAsc);
        default:
          return 0;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PetFormComponent)
    dialogRef.afterClosed().subscribe(() => {
      this.loadPet();
    })
  }

  loadPet() {
    this.petService.getPets()
      .subscribe(pets => {
        this.pets = pets
        this.sortedData = pets
      })
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}