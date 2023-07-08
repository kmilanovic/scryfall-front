import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AppSharedModule } from "./app-shared/app-shared.module";
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { NzGridModule } from "ng-zorro-antd/grid";
import { LoginModule } from "./pages/login/login.module";
import { LoginLayoutComponent } from "./layouts/login-layout/login-layout.component";
import { AuthInterceptor } from "./app-core/util/auth.interceptor";
import { en_US, NZ_I18N } from "ng-zorro-antd/i18n";
import {AppCoreModule} from "./app-core/app-core.module";
import {RegisterModule} from "./pages/register/register.module";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    AppLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    AppSharedModule,
    NzGridModule,
    LoginModule,
    RegisterModule,
    AppCoreModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
