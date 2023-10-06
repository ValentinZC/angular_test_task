import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layouts/header/header.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { LoginComponent } from './pages/login/login.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatCardModule } from "@angular/material/card";
import { ReactiveFormsModule } from "@angular/forms";
import { MatLineModule } from "@angular/material/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ApiInterceptor } from "./interceptors/api.interceptor";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { LoaderInterceptor } from "./interceptors/loader.interceptor";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ShowIfAuthed } from './helpers/directives/show-if-authed.directive';
import { LocalStorageService } from "./services/local-storage.service";
import { UserService } from "./services/user.service";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { initAuth } from "./helpers/initialAuthentication";
import { NewArticleComponent } from "./pages/new-article/new-article.component";
import { MatTabsModule } from "@angular/material/tabs";
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { PreviewPostComponent } from './components/post-previewer/preview-post.component';
import { HeardButtonComponent } from './components/heard-button/heard-button.component';
import { AboutComponent } from "./pages/about/about.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ArticleComponent } from './pages/article/article.component';
import { PostViewerComponent } from './components/post-viewer/post-viewer.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { PostEditorComponent } from './components/post-editor/post-editor.component';
import { FollowButtonComponent } from './components/follow-button/follow-button.component';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    ShowIfAuthed,
    NewArticleComponent,
    PostFeedComponent,
    PreviewPostComponent,
    HeardButtonComponent,
    AboutComponent,
    PaginatorComponent,
    ArticleComponent,
    PostViewerComponent,
    PostCommentComponent,
    PostEditorComponent,
    FollowButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatLineModule,
    MatProgressBarModule,
    MatSnackBarModule,
    HttpClientModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatSlideToggleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: initAuth, deps: [LocalStorageService, UserService], multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
