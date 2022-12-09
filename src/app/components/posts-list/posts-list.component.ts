import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Observer, ReplaySubject, Subject } from 'rxjs';
import { delay, concatMap, mergeMap, switchMap, exhaustMap, filter } from 'rxjs/operators';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { InputOutputComponent } from '../input-output/input-output.component';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Post[];
  currentPost?: Post;
  currentIndex = -1;
  title = '';
  message:string;
  rxjsPosts: Post[] = [];
  name:string = "vipin"
  formValue:any;
  @ViewChild(InputOutputComponent, { static: false}) appInputOutput:InputOutputComponent;
  
  constructor(private postsService:PostsService) { }

  ngOnInit(): void {
    this.retrievePosts();

    const numbers$ = new Observable((observer: Observer<number>) => {
      const n = [ 1,2,3,4,5];
      for(let x of n) {
        observer.next(x);
        delay(2000);
      }
    });
    numbers$.pipe(
      filter(n => n<4),
      switchMap( n => {
      return this.postsService.get(n)
    }))
    .subscribe(
      data => {
        this.rxjsPosts.push(data);
        console.log("rxjs post: "+ JSON.stringify(this.rxjsPosts));
      },
      error => {
        console.log('error: '+ JSON.stringify(error));
      }
    )

    //
    let subject = new Subject();
    let behaviourSubject = new BehaviorSubject(1);
    let replaySubject = new ReplaySubject();
    subject.next(1);
    behaviourSubject.next(2);
    replaySubject.next(1);
    replaySubject.next(2);
    replaySubject.next(3);
    subject.subscribe((value => console.log("subject: "+value)));
    behaviourSubject.subscribe((value => console.log("behaviourSubject: "+value)));
    replaySubject.subscribe((value => console.log("replaySubject: "+value)));
    subject.next(5);
    replaySubject.next(5);
    behaviourSubject.next(5);
// Output 
//behaviourSubject: 2 
//replaySubject: 1 
//replaySubject: 2 
//replaySubject: 3 
//subject: 5 
//replaySubject: 5 
//behaviourSubject: 5

  }

  ngAfterViewInit(){
   this.appInputOutput.myForm.valueChanges.subscribe((value) =>{
    this.formValue = value;
   })
  
  }

  retrievePosts(){
   this.postsService.getAllPosts()
                  .subscribe( data => {
                    this.posts = data;
                    console.log(data);
                  },
                  error => {
                    console.log(error);
                  });
  }

  removeAllPosts(): void {
    this.postsService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  setActivePost(post: Post, index: number): void {
    this.currentPost = post;
    this.currentIndex = index;
  }
  
  refreshList(): void {
    this.retrievePosts();
    this.currentPost = undefined;
    this.currentIndex = -1;
  }

  displayMessage($event){
    this.message = $event;
  }

}
