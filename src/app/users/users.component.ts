import { Component, OnInit } from '@angular/core';
import { UserData } from '../types/User';
import { UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  users: UserData[];
  numberOfUsers: number;

  constructor(
    private userService: UserService,
    private location:Location
  ) {
    this.numberOfUsers = 10;
  }

  ngOnInit(): void {
    this.userService.getUsers(this.numberOfUsers).subscribe((data) => {
      this.users = data;
    })
  }
}
