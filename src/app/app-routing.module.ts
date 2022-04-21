import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { E001Component } from './experiments/e001/e001.component';
import { E002Component } from './experiments/e002/e002.component';
import { E003Component } from './experiments/e003/e003.component';
import { E004Component } from './experiments/e004/e004.component';
import { E005Component } from './experiments/e005/e005.component';
import { E006Component } from './experiments/e006/e006.component';

const routes: Routes = [
  { path: '001', component: E001Component },
  { path: '002', component: E002Component },
  { path: '003', component: E003Component },
  { path: '004', component: E004Component },
  { path: '005', component: E005Component },
  { path: '006', component: E006Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }