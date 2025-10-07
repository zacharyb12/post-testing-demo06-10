import { Routes } from '@angular/router';
import { PostList } from '../components/post-list/post-list';
import { PostDetails } from '../components/post-details/post-details';
import { PostUpdate } from '../components/post-update/post-update';
import { PostAdd } from '../components/post-add/post-add';

export const routes: Routes = [
    {path : '' , component : PostList},
    {path : 'post-detail/:id', component : PostDetails},
    {path : 'post-update/:id', component : PostUpdate},
    {path : 'post-add', component : PostAdd}
];
