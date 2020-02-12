import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelComponent } from './model/model.component';
import { TemplateComponent } from './template/template.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'model' },
  { path: 'model', component: ModelComponent },
  { path: 'form', component: FormComponent },
  { path: 'template', component: TemplateComponent },
  { path: '**', component: ModelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
