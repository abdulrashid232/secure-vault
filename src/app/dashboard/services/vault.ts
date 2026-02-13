import { Injectable, signal, computed, Signal } from '@angular/core';

export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  children?: FileItem[];
  isExpanded?: boolean; 
  parent?: FileItem;    
}

const MOCK_DATA: FileItem[] = [
  {
    "id": "root_1",
    "name": "01_Legal_Department",
    "type": "folder",
    "children": [
      {
        "id": "leg_1",
        "name": "Active_Cases",
        "type": "folder",
        "children": [
          {
            "id": "case_a",
            "name": "Doe_vs_MegaCorp_Inc",
            "type": "folder",
            "children": [
              {
                "id": "disc_1",
                "name": "Discovery_Phase",
                "type": "folder",
                "children": [
                  { "id": "email_1", "name": "Email_Thread_Jan2024.pdf", "type": "file", "size": "4.2MB" },
                  { "id": "email_2", "name": "Leak_Evidence.png", "type": "file", "size": "8.1MB" }
                ]
              },
              { "id": "file_summ", "name": "Case_Summary_Draft_v3.docx", "type": "file", "size": "45KB" }
            ]
          },
          {
            "id": "case_b",
            "name": "Smith_Estate_Dispute",
            "type": "folder",
            "children": [
              { "id": "will_1", "name": "Last_Will_Testament.pdf", "type": "file", "size": "890KB" }
            ]
          }
        ]
      },
      {
        "id": "leg_2",
        "name": "Archived_2020",
        "type": "folder",
        "children": [] 
      }
    ]
  },
  {
    "id": "root_2",
    "name": "02_Finance_Team",
    "type": "folder",
    "children": [
      {
        "id": "fin_1",
        "name": "Payroll",
        "type": "folder",
        "children": [
          { "id": "pay_feb", "name": "February_2025.xlsx", "type": "file", "size": "2.1MB" },
          { "id": "pay_mar", "name": "March_2025_Projection.xlsx", "type": "file", "size": "1.8MB" }
        ]
      },
      { "id": "tax_doc", "name": "Tax_Compliance_Checklist.pdf", "type": "file", "size": "340KB" }
    ]
  },
  {
    "id": "root_3",
    "name": "03_IT_Security",
    "type": "folder",
    "children": [
      {
        "id": "sec_logs",
        "name": "Server_Logs",
        "type": "folder",
        "children": [
          { "id": "log_err", "name": "error_log_x86.txt", "type": "file", "size": "12MB" },
          { "id": "log_acc", "name": "access_log_main.txt", "type": "file", "size": "45MB" }
        ]
      },
      { "id": "config_yaml", "name": "docker-compose.yaml", "type": "file", "size": "4KB" }
    ]
  },
  {
    "id": "root_4",
    "name": "Shared_Resources",
    "type": "folder",
    "children": [
      {
        "id": "brand_kit",
        "name": "Brand_Assets",
        "type": "folder",
        "children": [
          { "id": "logo_svg", "name": "SecureVault_Logo.svg", "type": "file", "size": "15KB" },
          { "id": "font_main", "name": "Roboto-Bold.ttf", "type": "file", "size": "1.2MB" }
        ]
      }
    ]
  },
  { "id": "root_file_1", "name": "README_First.txt", "type": "file", "size": "1KB" },
  { "id": "root_file_2", "name": ".gitignore", "type": "file", "size": "1KB" }
];

@Injectable({
  
  providedIn: 'root'
})
export class VaultService {
  // State
  private _fileSystem = signal<FileItem[]>(this.initializeData(MOCK_DATA));
  selectedItem = signal<FileItem | null>(null);
  
  // Flattened list of visible nodes for keyboard navigation
  flattenedVisibleNodes = computed(() => {
    const visible: FileItem[] = [];
    const traverse = (items: FileItem[]) => {
      for (const item of items) {
        visible.push(item);
        if (item.type === 'folder' && item.isExpanded && item.children) {
          traverse(item.children);
        }
      }
    };
    traverse(this._fileSystem());
    return visible;
  });

  get fileSystem(): Signal<FileItem[]> {
    return this._fileSystem.asReadonly();
  }

  // Actions
  toggleExpand(item: FileItem) {
    if (item.type === 'folder') {
      item.isExpanded = !item.isExpanded;
      // Trigger signal update by creating new array reference (shallow copy enough for this)
      // Actually, since we are mutating the object property inside the array, 
      // we might need to be careful. 
      // Ideally we should use immutable updates, but for this specific tree structure 
      // with deep nesting, in-place mutation and then signal set is pragmatically okay for this scale.
      this._fileSystem.set([...this._fileSystem()]); 
    }
  }

  selectItem(item: FileItem) {
    this.selectedItem.set(item);
  }

  // Keyboard Navigation Helper
  // Returns the next or previous item in the flattened visible list
  navigate(direction: 'up' | 'down') {
    const visible = this.flattenedVisibleNodes();
    const current = this.selectedItem();
    if (!current && visible.length > 0) {
      this.selectItem(visible[0]);
      return;
    }
    
    if (current) {
      const index = visible.indexOf(current);
      if (index === -1) return; // Should not happen

      if (direction === 'up' && index > 0) {
        this.selectItem(visible[index - 1]);
      } else if (direction === 'down' && index < visible.length - 1) {
        this.selectItem(visible[index + 1]);
      }
    }
  }

  expandCollapsedSelected() {
    const current = this.selectedItem();
    if (current && current.type === 'folder' && !current.isExpanded) {
        this.toggleExpand(current);
    }
  }

  collapseExpandedSelected() {
    const current = this.selectedItem();
    if (current && current.type === 'folder' && current.isExpanded) {
        this.toggleExpand(current);
    } else if (current && current.parent) {
         // If file or collapsed folder, move to parent
         this.selectItem(current.parent);
    }
  }

  private initializeData(data: FileItem[], parent?: FileItem): FileItem[] {
    return data.map(item => {
      const newItem = { ...item, parent }; // Link parent for traversal
      if (newItem.children) {
        newItem.children = this.initializeData(newItem.children, newItem);
      }
      return newItem;
    });
  }
}
