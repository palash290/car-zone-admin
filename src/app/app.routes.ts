import { Routes } from '@angular/router';
import { RootComponent } from './components/main/root/root.component';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./components/core/login/login.component').then(m => m.LoginComponent), pathMatch: 'full' },
    { path: 'forgot-password', loadComponent: () => import('./components/core/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
    {
        path: 'home',
        component: RootComponent,
        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./components/main/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'buyer-management',
                loadComponent: () =>
                    import('./components/main/buyer-management/buyer-management.component').then(m => m.BuyerManagementComponent)
            },
            {
                path: 'buyer-details',
                loadComponent: () =>
                    import('./components/main/buyer-management/buyer-details/buyer-details.component').then(m => m.BuyerDetailsComponent)
            },
            {
                path: 'my-profile',
                loadComponent: () =>
                    import('./components/main/my-profile/my-profile.component').then(m => m.MyProfileComponent)
            },
            {
                path: 'change-password',
                loadComponent: () =>
                    import('./components/main/change-password/change-password.component').then(m => m.ChangePasswordComponent)
            },
            {
                path: 'car-listing',
                loadComponent: () =>
                    import('./components/main/car-listing/car-listing.component').then(m => m.CarListingComponent)
            },
            {
                path: 'car-listing-details',
                loadComponent: () =>
                    import('./components/main/car-listing/car-listing-details/car-listing-details.component').then(m => m.CarListingDetailsComponent)
            },
            {
                path: 'seller-management',
                loadComponent: () =>
                    import('./components/main/seller-management/seller-management.component').then(m => m.SellerManagementComponent)
            },
            {
                path: 'seller-details',
                loadComponent: () =>
                    import('./components/main/seller-management/seller-detail/seller-detail.component').then(m => m.SellerDetailComponent)
            },
            {
                path: 'notifications',
                loadComponent: () =>
                    import('./components/main/notifications/notifications.component').then(m => m.NotificationsComponent)
            },
            {
                path: 'price-management',
                loadComponent: () =>
                    import('./components/main/price-management/price-management.component').then(m => m.PriceManagementComponent)
            },
            {
                path: 'edit-slot',
                loadComponent: () =>
                    import('./components/main/price-management/edit-slot/edit-slot.component').then(m => m.EditSlotComponent)
            },
            {
                path: 'edit-listing',
                loadComponent: () =>
                    import('./components/main/price-management/edit-listing/edit-listing.component').then(m => m.EditListingComponent)
            },
            {
                path: 'slot-request',
                loadComponent: () =>
                    import('./components/main/slot-request/slot-request.component').then(m => m.SlotRequestComponent)
            },
            {
                path: 'slot-request-details',
                loadComponent: () =>
                    import('./components/main/slot-request/slot-request-details/slot-request-details.component').then(m => m.SlotRequestDetailsComponent)
            },
            {
                path: 'payment-history',
                loadComponent: () =>
                    import('./components/main/purches/purches.component').then(m => m.PurchesComponent)
            },
            {
                path: 'payment-detail',
                loadComponent: () =>
                    import('./components/main/purches-detail/purches-detail.component').then(m => m.PurchesDetailComponent)
            },
            {
                path: 'trx-history',
                loadComponent: () =>
                    import('./components/main/trx-history/trx-history.component').then(m => m.TrxHistoryComponent)
            },
            {
                path: 'view-trx',
                loadComponent: () =>
                    import('./components/main/trx-history/view-trx/view-trx.component').then(m => m.ViewTrxComponent)
            },
        ]
    },
];

