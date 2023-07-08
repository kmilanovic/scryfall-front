import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CARD_LIST_PATH, CREATE_SET_PATH,
  LOGIN_PATH,
  MY_SET_LIST_PATH, REGISTER_PATH,
  SET_CARD_LIST_PATH,
  SET_LIST_PATH
} from "./app-core/globals/route.properties";
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
      },
      {
        path: REGISTER_PATH,
        loadChildren: () => import('./pages/register/register.module').then((mod) => mod.RegisterModule),
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
      },
      {
        path: SET_LIST_PATH,
        loadChildren: () => import('./pages/set/set.module').then((mod) => mod.SetModule),
        canActivate: [AuthGuard]
      },
      {
        path: SET_CARD_LIST_PATH,
        loadChildren: () => import('./pages/set/set.module').then((mod) => mod.SetModule),
        canActivate: [AuthGuard]
      },
      {
        path: MY_SET_LIST_PATH,
        loadChildren: () => import('./pages/my-set/my-set.module').then((mod) => mod.MySetModule),
        canActivate: [AuthGuard]
      },
      {
        path: CREATE_SET_PATH,
        loadChildren: () => import('./pages/create-set/create-set.module').then((mod) => mod.CreateSetModule),
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
