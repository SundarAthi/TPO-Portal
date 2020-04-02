import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { Pages } from '../pages';
import { Services } from '../services';
import { Dialogs } from '../dialogs';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgbModule,
		NgxPaginationModule
	],
	declarations: [
		...Pages,
		...Dialogs
	],
	exports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgbModule,
		...Pages,
		...Dialogs
	],
	entryComponents: [
		...Pages,
		...Dialogs
	],
	providers: [
		Services,
		DatePipe
	],
	bootstrap: [
		...Pages,
		...Dialogs
	]
})

export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [
				DatePipe,
				Services
			]
		};
	}
}
