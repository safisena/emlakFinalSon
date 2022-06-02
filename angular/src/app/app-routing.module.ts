import { LoginComponent } from './components/Login/Login.component';
import { EmlakComponent } from './components/emlak/emlak.component';
import { UyeComponent } from './components/uye/uye.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'uye',
    component:UyeComponent
  },
  {
    path:'emlak',
    component:EmlakComponent
  },
  {
    path:'login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
