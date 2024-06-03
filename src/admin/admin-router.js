import LayoutBasic from '@/admin/layouts/LayoutBasic.vue'
import AuthTopBar from '@/admin/layouts/AuthTopBar.vue'
import Dashboard from '@/admin/views/dashboard/Dashboard.vue'

// Auth
import Login from '@/admin/views/auth/login.vue'
import ForgotPassword from '@/admin/views/auth/ForgortPassword.vue'
import RComponent from '@/admin/views/reusable_components/Reusable_components.vue'

import abilities from './stubs/abilities'

export default [
    {
        path: '/admin',
        component: LayoutBasic,
        meta: { requiresAuth: true },
        children: [
            {
                path: "home",
                name: "Home",
                meta: { ability: '' },
                meta: { requiresAuth: false },
                component: () => import("@/admin/views/home/Index.vue"),
            },
            {
                path: "dashboard",
                name: "Dashboard-Name",
                component: () => Dashboard,
                meta: { ability: abilities.DASHBOARD },
            },
            {
                path: "users",
                name: "Users",
                meta: { ability: abilities.USER },
                component: () => import("@/admin/views/users/Index.vue"),
            },
            {
                path: "users/add-individual-taxpayer",
                name: "Individual Taxpayer",
                meta: { ability: abilities.USER_CREATE },
                component: () => import("@/admin/views/users/taxpayer/AddIndividualTaxpayer.vue"),
            },
            {
                path: "users/add-corporate-taxpayer",
                name: "Corporate Taxpayer",
                meta: { ability: abilities.USER_CREATE },
                component: () => import("@/admin/views/users/taxpayer/AddCorporateTaxpayer.vue"),
            },
            {
                path: "users/add-vendor",
                name: "Add New vendor",
                meta: { ability: abilities.USER_CREATE },
                component: () => import("@/admin/views/users/vendor/Addvendor.vue"),
            },
            {
                path: "users/view-vendor",
                name: "Vendors",
                meta: { ability: abilities.USER_CREATE },
                component: () => import("@/admin/views/users/vendor/VeiwVendor.vue"),
            },
            {
                path: "users/administrator-registration",
                name: "Users",
                meta: { ability: abilities.USER_CREATE },
                component: () => import("@/admin/views/users/admin/AdministratorRegistration.vue"),
            },
            {
                path: "payments",
                name: "Payments",
                meta: { ability: abilities.PAYMENT },
                component: () => import("@/admin/views/payments/Index.vue"),
            },
            {
                path: "invoices",
                name: "Invoices",
                meta: { ability: abilities.INVOICE },
                component: () => import("@/admin/views/invoices/Index.vue"),
            },
            {
                path: "messages",
                name: "Messages",
                meta: { ability: abilities.MESSAGE },
                component: () => import("@/admin/views/messages/Index.vue"),
            },
            {
                path: "categories",
                name: "Categories",
                meta: { ability: abilities.CATEGORY },
                component: () => import("@/admin/views/categories/Index.vue"),
            },
            {
                path: "businesses",
                name: "Businesses",
                meta: { ability: abilities.BUSINESS },
                component: () => import("@/admin/views/businesses/Index.vue"),
            },
            {
                path: "reusable_components",
                name: "reusable_components",
                component: () => RComponent,
                meta: { ability: abilities.BUSINESS },
            },
        ],
    },
    {
        path: "/admin/login",
        name: "Login",
        component: () => Login,
        meta: { requiresAuth: false },
    },
    {
        path: "/admin/forgot-password",
        name: "Forgot Password",
        component: () => ForgotPassword,
        meta: { requiresAuth: false },
    },
    {
        path: '/auth',
        component: AuthTopBar,
        meta: { requiresAuth: true },
        children: [
            {
                path: "individual-taxpayer",
                name: "Individual Taxpayer",
                component: () => import("@/admin/views/auth/IndividualTaxpayerRegistration.vue"),
                meta: { requiresAuth: true },
            },
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'ErrorView',
        component: () => import('@/components/Error.vue'),
    },

]
