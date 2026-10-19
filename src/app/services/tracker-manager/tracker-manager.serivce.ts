import { inject, Injectable, OnInit, signal } from "@angular/core";
import { StorageManagerService } from "../storage-manager/storage-manager.service";
import { TrackedItem } from "../../models/tracked-item";

@Injectable({providedIn: 'root'})
export class TrackerManagerService implements OnInit {
    private _storageManager = inject(StorageManagerService)
    private TRACKED_ITEMS: string = "tracked-items"
    private _trackedItemKeys: string[] = []
    private _trackedItems = signal<TrackedItem[]>([])
    public trackedItems = this._trackedItems.asReadonly()

    isLoading = signal(true)

    constructor() {
        this.loadData()
    }

    ngOnInit(): void {
        this.loadData()
    }

    loadData(): void {
        const keys = this._storageManager.getItem(this.TRACKED_ITEMS);
        if (keys === null) {
            this.isLoading.update(val => false)
            return
        }

        this._trackedItemKeys = keys

        for (const item of this._trackedItemKeys) {
            
            const trackedItem: TrackedItem = {
                name: item,
                amount: this._storageManager.getItem(item)
            }
            this._trackedItems.update(items => [...this._trackedItems(), trackedItem])
        }

        this.isLoading.update(val => false)
    }

    addItem(name: string) {
        if (this._storageManager.getItem(name) === null) {
            console.log("Kaas");
            
            this._trackedItemKeys = [...this._trackedItemKeys, name]
            console.log("Huh");
            
            this._storageManager.save(this.TRACKED_ITEMS, this._trackedItemKeys)
            console.log("wtf");
            
            this._storageManager.save(name, 0)
            this._trackedItems.update(items => [...this.trackedItems(), {name: name, amount: 0}])
        }
    }

    updateItem(trackedItem: TrackedItem) {
        this._storageManager.save(trackedItem.name, trackedItem.amount)
    }

    removeItem(trackedItem: TrackedItem) {
        this._trackedItems.update(items =>
            items.filter(item => item.name !== trackedItem.name)
        )
        this._trackedItemKeys = this._trackedItemKeys.filter(item => item !== trackedItem.name)
        this._storageManager.save(this.TRACKED_ITEMS, this._trackedItemKeys)
        this._storageManager.removeItem(trackedItem.name)
    }
}