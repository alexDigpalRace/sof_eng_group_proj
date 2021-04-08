import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsPageComponent } from 'src/app/stats-page/stats-page.component';
import { FoodViewComponent } from '../../search/food-view/food-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },    //full makes sure its goes to exactly search and not search/something
  { path: 'search', component: FoodViewComponent },
  { path: 'search/moredetails/:foodname', component: FoodViewComponent },
  { path: 'stats', component: StatsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
