import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { UserCardComponent } from './components/user-card/user-card.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    TaskCardComponent,
    UserCardComponent
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    TaskCardComponent,
    UserCardComponent
  ]
})
export class SharedModule { }
