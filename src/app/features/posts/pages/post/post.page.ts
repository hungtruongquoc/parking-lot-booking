import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PathMap } from '@app/@core/enums';
import { Post } from '../../shared/post.model';
import { PostsService } from '../../shared/posts.service';

@Component({
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  post: Post;
  postId: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService
  ) {
    this.postId = +activatedRoute.snapshot.paramMap.get('id') || 0;
  }

  ngOnInit(): void {
    if (this.postId > 0) {
      this.postsService
        .getById(this.postId.toString())
        .subscribe((post) => (this.post = post));
    }
  }

  onSave(post: Post) {
    this.postsService.post(post).subscribe((result) => {
      console.log(result);
      alert('Post saved successfully');
      this.router.navigate([PathMap.Posts]);
    });
  }

  onEdit(post: Post) {
    this.postsService.put(post.id.toString(), post).subscribe((result) => {
      console.log(result);
      alert('Post updated successfully');
      this.router.navigate([PathMap.Posts]);
    });
  }
}
