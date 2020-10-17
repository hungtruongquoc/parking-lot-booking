import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Post } from '../../shared/post.model';
import { PostsService } from '../../shared/posts.service';

@Component({
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  posts: Post[];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService
      .getAll()
      .pipe(first())
      .subscribe((posts) => {
        console.log(posts);
        this.posts = posts;
      });
  }

  onDeletePost(id: number) {
    this.postsService.delete(id.toString()).subscribe(() => {
      alert('Post deleted successfully');
      window.location.reload();
    });
  }
}
