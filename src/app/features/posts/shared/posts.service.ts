import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '@app/@core/services';
import { environment } from '@environments/environment';
import { PostAdapter } from './post.adapter';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService extends GenericHttpService<Post> {
  constructor(httpClient: HttpClient) {
    super(httpClient, environment.apiUrl, 'posts', new PostAdapter());
  }
}
