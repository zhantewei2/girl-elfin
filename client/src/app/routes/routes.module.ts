import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:"self", loadChildren:()=>import("./self-module/self.module").then(m=>m.SelfModule)},
  {path:"plan", loadChildren:()=>import("./plan-module/plan.module").then(m=>m.PlanModule)},
  {path:"test",loadChildren:()=>import("./test/test.module").then(m=>m.TestModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class RoutesModule { }
