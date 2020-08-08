import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CollectionRoutingModule } from "./collection-routing.module";
import { CollectionComponent } from "./collection.component";
import { CollectionGridComponent } from "./collection-grid/collection-grid.component";
import { SharedModule } from "../shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PaginationComponent } from "./pagination/pagination.component";
import { SortComponent } from "./sort/sort.component";
import { FormsModule } from "@angular/forms";
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    CollectionComponent,
    CollectionGridComponent,
    PaginationComponent,
    SortComponent,
    SidebarComponent,
  ],
  exports: [CollectionGridComponent, PaginationComponent, SortComponent],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
  ],
})
export class CollectionModule {}
