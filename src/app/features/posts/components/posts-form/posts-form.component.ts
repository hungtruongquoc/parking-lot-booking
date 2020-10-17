import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../shared/post.model';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsFormComponent implements OnInit, OnChanges {
  @Input() post: Post;

  @Output() save = new EventEmitter<Post>();
  @Output() edit = new EventEmitter<Post>();

  postForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  get f() {
    return this.postForm.controls;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.postForm = this.fb.group({
      id: [this.post?.id || 0],
      title: [this.post?.title || '', Validators.required],
      author: [this.post?.author || '', Validators.required],
      description: [this.post?.description || '', Validators.required],
      date: [new Date()],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.postForm.status === 'INVALID') {
      return false;
    }

    this.postForm.value.date.value = new Date();

    if (this.post?.id > 0) {
      this.edit.emit(this.postForm.value);
    } else {
      this.save.emit(this.postForm.value);
    }
  }
}
