import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileItem, VaultService } from '../../services/vault';

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="select-none">
      <!-- Node Item -->
      <div 
        class="flex items-center py-1.5 px-2 cursor-pointer transition-all duration-200 border-l-2 border-transparent hover:bg-white/5 group"
        [class.bg-sv-cyan-dim]="isSelected()"
        [class.border-l-sv-cyan]="isSelected()"
        [class.text-sv-cyan]="isSelected()"
        [class.text-slate-400]="!isSelected()"
        (click)="handleSelect()"
      >
        <!-- Indentation spacer (optional if handling with padding-left on container, but recursive usually handles it naturally) -->
        
        <!-- Icon -->
        <div class="mr-2 flex-shrink-0">
           <ng-container *ngIf="item.type === 'folder'">
              <svg *ngIf="item.isExpanded" class="w-4 h-4 text-sv-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path></svg>
              <svg *ngIf="!item.isExpanded" class="w-4 h-4 text-slate-500 group-hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
           </ng-container>
           <ng-container *ngIf="item.type === 'file'">
              <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
           </ng-container>
        </div>

        <!-- Name -->
        <span class="font-mono text-sm truncate flex-1">{{ item.name }}</span>
        
        <!-- Status Indicator -->
        <div *ngIf="isSelected()" class="w-1.5 h-1.5 rounded-full bg-sv-cyan shadow-[0_0_5px_#00F0FF] ml-2"></div>
      </div>

      <!-- Children -->
      <div *ngIf="item.type === 'folder' && item.isExpanded" class="pl-4 border-l border-white/5 ml-2.5">
        <app-tree-node 
          *ngFor="let child of item.children" 
          [item]="child">
        </app-tree-node>
      </div>
    </div>
  `,
  styles: []
})
export class TreeNodeComponent {
  @Input({ required: true }) item!: FileItem;
  vaultService = inject(VaultService);

  isSelected(): boolean {
    return this.vaultService.selectedItem()?.id === this.item.id;
  }

  handleSelect() {
    this.vaultService.selectItem(this.item);
    if (this.item.type === 'folder') {
      this.vaultService.toggleExpand(this.item);
    }
  }
}
