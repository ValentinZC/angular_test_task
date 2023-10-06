import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./pages/main/main.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { AboutComponent } from "./pages/about/about.component";
import { NewArticleComponent } from "./pages/new-article/new-article.component";
import { withAuth, withoutAuth } from "./helpers/guards/auth.guard";
import { ArticleComponent } from "./pages/article/article.component";

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [withoutAuth]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate:  [withoutAuth]
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [withAuth],
  },
  {
    path: 'new-article',
    component: NewArticleComponent
  },
  {
    path: 'edit/:slug',
    component: NewArticleComponent
  },
  {
    path: 'article/:slug',
    component: ArticleComponent
  },
  {
    path: '**',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
