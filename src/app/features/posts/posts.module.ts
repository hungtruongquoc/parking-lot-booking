import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsFormComponent } from './components/posts-form/posts-form.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostPage } from './pages/post/post.page';
import { PostsPage } from './pages/posts/posts.page';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  declarations: [PostsPage, PostsFormComponent, PostsListComponent, PostPage],
  imports: [CommonModule, PostsRoutingModule, ReactiveFormsModule],
})
export class PostsModule {}
