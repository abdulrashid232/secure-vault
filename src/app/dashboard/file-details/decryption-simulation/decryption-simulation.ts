import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../../components/button/button';

@Component({
  selector: 'app-decryption-simulation',
  imports: [CommonModule, Button],
  template: `
    <div class="flex flex-col gap-6">
      
      <!-- Phase 1: Simulation -->
      <div *ngIf="state() === 'decrypting'" class="flex flex-col items-center justify-center py-8">
         <div class="relative w-24 h-24 mb-6">
            <div class="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
            <div class="absolute inset-0 border-4 border-t-sv-cyan border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <div class="absolute inset-0 flex items-center justify-center font-mono text-sv-cyan font-bold">{{ progress() }}%</div>
         </div>
         
         <div class="w-full max-w-md bg-black/50 rounded p-2 font-mono text-xs text-green-500 h-32 overflow-hidden relative">
            <div class="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div *ngFor="let line of consoleLines" class="truncate">{{ line }}</div>
         </div>
      </div>

      <!-- Phase 2: Result -->
      <div *ngIf="state() === 'complete'" class="animate-in fade-in zoom-in duration-300">
         <div class="bg-white text-black p-8 rounded shadow-lg relative min-h-[400px] font-serif">
            <!-- Watermark -->
            <div class="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                <span class="text-6xl font-black rotate-[-45deg] uppercase">Top Secret</span>
            </div>

            <div class="border-b-2 border-black pb-4 mb-6 flex justify-between items-end">
                <div>
                    <h1 class="text-2xl font-bold uppercase">Mission Report: Chimera</h1>
                    <p class="text-sm">Clearance Level 4 Only</p>
                </div>
                <div class="text-right text-xs">
                    <p>Date: 2024-11-15</p>
                    <p>Ref: AZ-992-X</p>
                </div>
            </div>

            <p class="mb-4 text-justify">
                <strong>Executive Summary:</strong> The Project Chimera prototype has successfully exceeded initial containment parameters.
                Preliminary tests indicate a quantum coherence stability of 99.9% under simulated load. 
            </p>
            
            <p class="mb-4 text-justify">
                <strong>Incident Log:</strong> On 2024-11-10, Node-7 reported an anomaly in the cooling sector. 
                Investigation revealed unauthorized access attempts originating from [REDACTED]. 
                Counter-measures were deployed immediately.
            </p>

            <div class="bg-slate-100 p-4 rounded border border-slate-300 font-mono text-sm mb-4">
                > TARGET: SECTOR_Q
                > STATUS: SECURE
                > KEY: 8f7d-22a1-99c0
            </div>

             <div class="mt-8 pt-4 border-t border-black flex justify-between items-center text-xs">
                <span>Authorized by: Director A. Vance</span>
                <span class="font-mono">SIG: 1a2b3c4d</span>
            </div>
         </div>

         <div class="flex justify-end gap-3 mt-6">
            <app-button variant="secondary" (click)="reset()">Close</app-button>
            <app-button variant="primary">Export as PDF</app-button>
         </div>
      </div>
    </div>
  `,
  styles: []
})
export class DecryptionSimulationComponent implements OnInit {
  state = signal<'decrypting' | 'complete'>('decrypting');
  progress = signal(0);
  consoleLines: string[] = [];
  
  private dictionary = ['BYPASSING_FIREWALL', 'INJECTING_PAYLOAD', 'DECRYPTING_AES_256', 'BRUTE_FORCING_HASH', 'ACCESS_GRANTED_NODE_7', 'OVERRIDING_SECURITY_PROTOCOL', 'QUANTUM_ENTANGLEMENT_SYNC', 'RESOLVING_DNS_PROXY'];

  ngOnInit() {
    this.startSimulation();
  }

  startSimulation() {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 5) + 1;
      if (p > 100) p = 100;
      this.progress.set(p);
      
      this.consoleLines.unshift(`> ${this.dictionary[Math.floor(Math.random() * this.dictionary.length)]}...`);
      if (this.consoleLines.length > 8) this.consoleLines.pop();

      if (p === 100) {
        clearInterval(interval);
        setTimeout(() => this.state.set('complete'), 500);
      }
    }, 150);
  }

  reset() {
      // Logic to close parent modal would be handled by parent
  }
}
