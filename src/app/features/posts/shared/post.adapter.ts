import { ModelAdapter } from '@app/@core/interfaces';
import { Post } from './post.model';

export class PostAdapter implements ModelAdapter<Post> {
  adapt(item: any): Post {
    return new Post(
      item.id,
      item.title,
      item.description,
      item.author,
      item.date
    );
  }
  encode(item: Post) {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      author: item.author,
      date: item.date,
    };
  }
}
