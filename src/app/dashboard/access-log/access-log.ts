import { Component, OnInit, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaultService } from '../services/vault';

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

@Component({
  selector: 'app-access-log',
  imports: [CommonModule],
  template: `
    <div class="h-36 md:h-48 bg-sv-black border-t border-sv-cyan-dim font-mono text-xs p-3 md:p-4 overflow-y-auto flex flex-col gap-1 font-technical scrollbar-custom">
      <div class="flex items-center justify-between text-sv-cyan/50 mb-2 sticky top-0 bg-sv-black/90 backdrop-blur-sm pb-2 border-b border-white/5">
        <span class="uppercase tracking-widest flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Access Log Snippet
        </span>
        <span>REAL-TIME FEED</span>
      </div>

      <div *ngFor="let log of logs" class="flex gap-2 opacity-80 hover:opacity-100 transition-opacity">
        <span class="text-sv-cyan">[{{ log.timestamp }}]</span>
        <span [ngClass]="getTypeClass(log.type)">{{ log.message }}</span>
      </div>
      
      <div *ngIf="isScanning" class="mt-2 text-sv-cyan animate-pulse">
        > INTEGRITY_CHECK: Scanning volume structure... [||||||||||] 100%
      </div>
    </div>
  `,
  styles: [`
    .scrollbar-custom::-webkit-scrollbar { width: 6px; }
    .scrollbar-custom::-webkit-scrollbar-track { background: #0B0E14; }
    .scrollbar-custom::-webkit-scrollbar-thumb { background: #121926; border: 1px solid #00F0FF; }
  `]
})
export class AccessLogComponent implements OnInit {
  vaultService = inject(VaultService);
  logs: LogEntry[] = [];
  isScanning = false;

  constructor() {
    effect(() => {
      const item = this.vaultService.selectedItem();
      if (item) {
        this.addLog(`ACCESS_REQUEST: User selected ${item.type === 'folder' ? 'DIR' : 'FILE'} node [${item.id}]`, 'info');
        if (item.type === 'file') {
          this.simulateScan(item.name);
        }
      }
    });
  }

  ngOnInit() {
    this.addLog('SYSTEM_INIT: SecureVault Dashboard v2.0.4 loaded.', 'success');
    this.addLog('CONNECTION_ESTABLISHED: Encrypted tunnel to US-EAST-01.', 'success');
  }

  getTypeClass(type: string): string {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-sv-gold';
      case 'error': return 'text-sv-red';
      default: return 'text-slate-300';
    }
  }

  private addLog(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    this.logs.unshift({ timestamp: timeString, message, type });
    if (this.logs.length > 50) this.logs.pop();
  }

  private simulateScan(filename: string) {
    this.isScanning = true;
    setTimeout(() => {
      this.isScanning = false;
      this.addLog(`INTEGRITY_VERIFIED: Checksum match for ${filename}.`, 'success');
    }, 1500);
  }
}
