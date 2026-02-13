import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNodeComponent } from './tree-node/tree-node';
import { VaultService } from '../services/vault';

@Component({
  selector: 'app-file-explorer',
  imports: [CommonModule, TreeNodeComponent],
  template: `
    <div class="h-full bg-sv-charcoal border-r border-white/5 flex flex-col">
      <!-- Header -->
     <div class="flex items-center gap-4 bg-[#0a1212] mt-4 px-4 rounded-xl w-full">
  <div class="flex items-center justify-center w-16 h-16 bg-[#132323] rounded-xl border border-white/5 shadow-inner">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      class="w-10 h-10 text-cyan-400"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <rect x="9" y="11" width="6" height="5" rx="1" />
      <path d="M10 11V9a2 2 0 0 1 4 0v2" />
    </svg>
  </div>

  <div class="flex flex-col">
    <h1 class="text-3xl font-black tracking-tighter leading-none flex items-baseline">
      <span class="text-white">SECURE</span>
      <span class="text-cyan-400">VAULT</span>
    </h1>
    
    <p class="mt-1 text-[10px] font-bold tracking-[0.3em] text-cyan-700 uppercase">
      Quantum-Resistant Storage
    </p>
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
          }
          break;
      }
    }
  }
}
