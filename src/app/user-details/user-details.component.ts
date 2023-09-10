import { UserData } from '../types/User';
import { UserService } from '../user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  @Input() userData: UserData;
  location: Location;

  constructor(
    location: Location
  ) {
    this.location = location;
  }

  saveUser(user: UserData): void {
    const savedUsers = JSON.parse(localStorage.getItem('savedUsers') || '[]');
    savedUsers.push(user);
    localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
  }
}
