import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNodeComponent } from './tree-node/tree-node';
import { VaultService } from '../services/vault';

@Component({
  selector: 'app-file-explorer',
  standalone: true,
  imports: [CommonModule, TreeNodeComponent],
  template: `
    <div class="h-full bg-sv-charcoal border-r border-white/5 flex flex-col">
      <!-- Header -->
      <div class="p-4 border-b border-white/5 flex items-center justify-between">
         <span class="font-display font-medium text-sm text-slate-300 tracking-wider">FILE EXPLORER</span>
         <div class="flex gap-1">
             <div class="w-2 h-2 rounded-full bg-slate-700"></div>
             <div class="w-2 h-2 rounded-full bg-slate-700"></div>
         </div>
      </div>

      <!-- Tree -->
      <div class="flex-1 overflow-y-auto p-2 scrollbar-hide">
         <app-tree-node 
            *ngFor="let item of vaultService.fileSystem()" 
            [item]="item">
         </app-tree-node>
      </div>

      <div class="p-2 border-t border-white/5 text-[10px] text-slate-600 font-mono text-center">
        ENCRYPTED_VOL_MOUNTED
      </div>
    </div>
  `,
  styles: [`
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `]
})
export class FileExplorerComponent {
  vaultService = inject(VaultService);

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(event.key)) {
      event.preventDefault();
      
      switch(event.key) {
        case 'ArrowUp':
          this.vaultService.navigate('up');
          break;
        case 'ArrowDown':
          this.vaultService.navigate('down');
          break;
        case 'ArrowRight':
          this.vaultService.expandCollapsedSelected();
          break;
        case 'ArrowLeft':
          this.vaultService.collapseExpandedSelected();
          break;
        case 'Enter':
          const current = this.vaultService.selectedItem();
          if (current) {
             if (current.type === 'folder') {
                this.vaultService.toggleExpand(current);
             }
             // For file, assume already selected
          }
          break;
      }
    }
  }
}
