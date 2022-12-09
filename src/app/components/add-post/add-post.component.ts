import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb:FormBuilder, private postService: PostsService,
    private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: [null,[Validators.required]],
    });
  }
  
  onSubmit(myForm){
    this.postService.create({id: Math.floor(Math.random() * 100),...myForm.value})
    .subscribe(
      data => {
       console.log('add post: '+JSON.stringify(data));
       this.router.navigate(['/posts']);
      },
      error =>{
        console.log("error")
      }
    )
  }
}
