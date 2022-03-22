import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerRegistrationComponent } from './UI/customer-registration/customer-registration.component';

const routes: Routes = [
  { path: "", redirectTo: "customer", pathMatch: "full" },
 { path: "customer", component: CustomerRegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
