import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import { User } from '../../model/user.model ';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users : User[];
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
     this.retrieveUsers();
  }
  
  retrieveUsers(){
    this.userService.getUsers().subscribe(
      data => {
        console.log('users: '+JSON.stringify(data));
       this.users = data;
      },
      error => {
        console.log('error: '+ JSON.stringify(error));
      }
    )
  }
}
