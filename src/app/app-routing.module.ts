import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CARD_LIST_PATH, LOGIN_PATH } from "./app-core/globals/route.properties";
import { LoginLayoutComponent } from "./layouts/login-layout/login-layout.component";
import { AppLayoutComponent } from "./layouts/app-layout/app-layout.component";
import { AuthGuard } from "./app-core/guards/auth.guard";
import { LoginGuard } from "./app-core/guards/login.guard";

const routes: Routes = [
  {
    path: LOGIN_PATH,
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/login/login.module').then((mod) => mod.LoginModule),
        canActivate: [LoginGuard]
      }
    ]
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: CARD_LIST_PATH},
      {
        path: CARD_LIST_PATH,
        loadChildren: () => import('./pages/card/card.module').then((mod) => mod.CardModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
