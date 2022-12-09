import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  currentPost: Post = {
    title: '',
  };

  constructor(private postsService:PostsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getCurrentPost(this.route.snapshot.params['id']);
  }
  getCurrentPost(id: any) {
    this.postsService.get(id)
        .subscribe(
          data => {
           this.currentPost = data; 
          },
          error => {
            console.log('error');
          }
          
        )
  }

}
