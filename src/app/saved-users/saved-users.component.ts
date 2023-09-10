import { Component, OnInit } from '@angular/core';
import { UserData } from '../types/User';
import { UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-saved-users',
  templateUrl: './saved-users.component.html',
  styleUrls: ['./saved-users.component.scss']
})
export class SavedUsersComponent implements OnInit{
  users:UserData[];
  constructor(
    private userService:UserService,
    private location:Location
  ){}

  ngOnInit(): void {
    this.users=this.userService.getSavedUsers();
  }

  goBack():void{
    this.location.back();
  }

}
