import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArchivioComponent } from './pages/archivio/archivio.component';
import { StatisticheComponent } from './pages/statistiche/statistiche.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'archivio', component: ArchivioComponent},
    {path:'statistiche', component: StatisticheComponent},

];
