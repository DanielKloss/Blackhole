import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'winner', loadChildren: './winner/winner.module#WinnerPageModule' },
    { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
    { path: 'help', loadChildren: './help/help.module#HelpPageModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
