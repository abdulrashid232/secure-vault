import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'design-system',
        pathMatch: 'full'
    },
    {
        path: 'design-system',
        loadComponent: () => import('./pages/design-system-demo/design-system-demo').then(m => m.DesignSystemDemoComponent)
    },
];
