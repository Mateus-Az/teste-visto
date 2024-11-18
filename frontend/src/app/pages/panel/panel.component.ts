import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {}
