import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaultService } from '../services/vault';
import { Card } from '../../components/card/card';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-file-details',
  imports: [CommonModule, Card, Button],
  template: `
    <div class="h-full p-4 md:p-8 flex flex-col justify-center items-center text-center" *ngIf="!vaultService.selectedItem()">
      <div class="w-24 h-24 rounded-full bg-sv-midnight border border-sv-cyan-dim flex items-center justify-center mb-6 animate-pulse">
        <svg class="w-10 h-10 text-sv-cyan/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
      </div>
      <h2 class="font-display text-2xl text-white mb-2">Awaiting Selection</h2>
      <p class="text-slate-400 max-w-md">Select a file from the secure registry to decrypt metadata and view audit trails.</p>
    </div>

    <div class="h-full p-4 md:p-8 overflow-y-auto" *ngIf="vaultService.selectedItem() as item">
      <div class="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
           <div class="flex items-center gap-3 mb-2">
              <span class="font-mono text-xs text-sv-gold border border-sv-gold/30 px-2 py-0.5 rounded bg-sv-gold/5">TOP SECRET</span>
              <span class="font-mono text-xs text-slate-500">/root/classified/{{ item.id }}</span>
           </div>
           <h1 class="font-display text-3xl md:text-4xl text-white break-all">{{ item.name }}</h1>
        </div>
        
        <div class="flex gap-3 flex-shrink-0">
            <app-button variant="secondary" class="flex-1 md:flex-none">Download</app-button>
            <app-button variant="primary" class="flex-1 md:flex-none">Decrypt Access</app-button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
         <div class="bg-sv-midnight border border-white/5 p-4 rounded-lg">
            <p class="font-mono text-[10px] text-slate-500 uppercase mb-1">File Type</p>
            <div class="flex items-center gap-2 text-white">
                <svg class="w-5 h-5 text-sv-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                <span class="font-medium">{{ item.type === 'folder' ? 'Directory' : 'Encrypted File' }}</span>
            </div>
         </div>
         
         <div class="bg-sv-midnight border border-white/5 p-4 rounded-lg">
            <p class="font-mono text-[10px] text-slate-500 uppercase mb-1">File Size</p>
             <div class="flex items-center gap-2 text-white">
                <svg class="w-5 h-5 text-sv-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                <span class="font-medium font-mono">{{ item.size || 'DIR' }}</span>
            </div>
         </div>

         <div class="bg-sv-midnight border border-white/5 p-4 rounded-lg">
            <p class="font-mono text-[10px] text-slate-500 uppercase mb-1">Clearance</p>
             <div class="flex items-center gap-2 text-sv-gold">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                <span class="font-medium">Lvl 4 Classified</span>
            </div>
         </div>
      </div>

      <app-card class="mb-8">
        <h3 class="font-display text-lg text-white mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-sv-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Encryption Parameters
        </h3>
        <div class="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div class="flex justify-between border-b border-white/5 pb-2">
                <span class="text-slate-400">Encryption Standard</span>
                <span class="text-white font-mono">AES-256-GCM</span>
            </div>
             <div class="flex justify-between border-b border-white/5 pb-2">
                <span class="text-slate-400">Key Rotation Cycle</span>
                <span class="text-white font-mono">Every 12h</span>
            </div>
             <div class="flex justify-between border-b border-white/5 pb-2">
                <span class="text-slate-400">Integrity Check</span>
                <span class="text-sv-cyan font-mono truncate max-w-[100px]">SHA-512</span>
            </div>
             <div class="flex justify-between border-b border-white/5 pb-2">
                <span class="text-slate-400">Quantum Protection</span>
                <span class="text-green-400 font-mono flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-green-400"></span> ENABLED</span>
            </div>
        </div>
      </app-card>
      
      <div class="h-64 bg-slate-900/50 rounded-lg border border-white/5 flex items-center justify-center relative overflow-hidden group">
         <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         <p class="font-display text-4xl text-slate-700 font-bold tracking-[0.2em] group-hover:text-slate-600 transition-colors cursor-default select-none">300x300</p>
         <div class="absolute bottom-4 right-4 flex gap-2">
            <span class="w-2 h-2 rounded-full bg-sv-cyan animate-pulse"></span>
            <span class="text-[10px] font-mono text-slate-500 uppercase">Preview Restricted</span>
         </div>
      </div>
    </div>
  `,
  styles: []
})
export class FileDetailsComponent {
  vaultService = inject(VaultService);
}
