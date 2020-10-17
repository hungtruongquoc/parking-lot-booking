import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Post } from '../../shared/post.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent implements OnInit {
  @Input() posts: Post[];

  @Output() delete = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  trackByPost(post: Post) {
    return post.id;
  }

  onClickDelete(id: number) {
    if (confirm('Are you sure about deleting the post?')) {
      this.delete.emit(id);
    }
  }
}
