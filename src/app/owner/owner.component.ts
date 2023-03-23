import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Owner } from '../interface/owner';
import { OwnerService } from '../service/owner.service';


@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})

export class OwnerComponent implements OnInit {
  owners: Owner[] = [];
  sortedData: Owner[] = [];

  constructor(private ownerService: OwnerService) { }

  ngOnInit(): void {
    this.ownerService.getOwners()
      .subscribe(owners => {
        this.owners = owners
        this.sortedData = owners
      });
  }
  
  sortData(sort: Sort) {
    const data = this.owners.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'firstName':
          return compare(a.firstName, b.firstName, isAsc);
        case 'lastName':
          return compare(a.lastName, b.lastName, isAsc);
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