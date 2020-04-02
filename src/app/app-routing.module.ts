import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, LayoutComponent, SuccessComponent } from './shared/components';
import { MyLoanPage } from "./pages";
import { LoanDetailPage } from "./pages"

const routes: Routes = [{
	path: '',
	pathMatch: 'full',
	redirectTo: 'signin'
}, {
	path: '',
	component: LayoutComponent,
	children: [{
		path: 'my-loan',
		component: MyLoanPage,
	},
	{
		path: 'loan-detail',
		component: LoanDetailPage,
	}]
}, {
	path: 'signin',
	component: LoginComponent
},
{
	path: 'success',
	component: SuccessComponent
}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})

export class AppRoutingModule { }

export const NavigatableComponents = [
	LoginComponent,
	LayoutComponent
]