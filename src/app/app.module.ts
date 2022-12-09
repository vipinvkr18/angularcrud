import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsService } from './services/posts.service';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { InputOutputComponent } from './components/input-output/input-output.component';
@NgModule({
  declarations: [
    AppComponent,
    PostsListComponent,
    PostDetailsComponent,
    AddPostComponent,
    InputOutputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
   provide: HTTP_INTERCEPTORS,
   useClass: AuthInterceptorService,
   multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
