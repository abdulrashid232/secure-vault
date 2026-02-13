import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileExplorerComponent } from '../file-explorer/file-explorer';
import { FileDetailsComponent } from '../file-details/file-details';
import { AccessLogComponent } from '../access-log/access-log';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, FileExplorerComponent, FileDetailsComponent, AccessLogComponent],
  template: `
    <div class="flex h-screen w-full bg-sv-charcoal text-white font-body overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-90 flex-shrink-0 z-20 shadow-[5px_0_20px_rgba(0,0,0,0.5)]">
        <app-file-explorer></app-file-explorer>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col min-w-0 bg-[#0F1218] relative">
        <!-- Top Bar -->
        <header class="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-sv-charcoal/50 backdrop-blur-sm z-10">
           <div class="flex items-center gap-4 w-1/3">
              <div class="bg-gray-800 rounded px-2 py-1 text-xs text-slate-400 font-mono border border-gray-700">CMD+K</div>
              <input type="text" placeholder="Search encrypted volumes..." class="bg-transparent border-none text-sm text-white focus:outline-none w-full placeholder-slate-600 font-mono">
           </div>
           
           <div class="flex items-center gap-6">
              <div class="flex items-center gap-2 px-3 py-1 bg-sv-cyan/10 border border-sv-cyan/20 rounded-full">
                 <span class="w-2 h-2 rounded-full bg-sv-cyan animate-pulse"></span>
                 <span class="text-[10px] font-mono text-sv-cyan font-bold tracking-wider">SYSTEM: SECURE</span>
              </div>
              <div class="flex items-center gap-3">
                 <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-white/10">
                    <svg class="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                 </div>
                 <div class="flex flex-col items-end">
                    <span class="text-xs font-bold text-white">ADMIN-ALPHA</span>
                    <span class="text-[10px] text-sv-gold font-mono">LEVEL 4 CLEARANCE</span>
                 </div>
                 <div class="w-8 h-8 rounded bg-gradient-to-br from-sv-cyan to-blue-600 border border-white/20"></div>
              </div>
           </div>
        </header>

        <!-- Viewport -->
        <div class="flex-1 overflow-hidden relative">
            <app-file-details></app-file-details>
        </div>

        <!-- Bottom Terminal -->
        <div class="flex-shrink-0 z-10 relative">
           <app-access-log></app-access-log>
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class ShellComponent {}
