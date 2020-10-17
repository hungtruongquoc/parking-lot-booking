import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostPage } from './pages/post/post.page';
import { PostsPage } from './pages/posts/posts.page';

const routes: Routes = [
  {
    path: '',
    component: PostsPage,
    data: {
      title: 'Posts and json-server',
      description: 'Create posts, read them, and delete them.',
    },
  },
  {
    path: 'create',
    component: PostPage,
    data: {
      title: 'Create a new post',
      description:
        'This is the place where you can contribute creating and sharing new posts.',
    },
  },
  {
    path: 'create/:id',
    component: PostPage,
    data: {
      title: 'Update an existing post',
      description:
        'This is the place where you can edit and improve existing posts.',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
