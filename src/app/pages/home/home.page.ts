import { Component, inject, OnInit, signal } from "@angular/core";
import { TrackerManagerService } from "../../services/tracker-manager/tracker-manager.serivce";
import { TrackedItem } from "../../models/tracked-item";
import { ItemAdderComponent } from "../../components/item-adder/item-adder.component";
import { TrackedItemComponent } from "../../components/tracked-item/tracked-item.component";

@Component({
    selector: 'countrr-home-page',
    templateUrl: 'home.page.html',
    styleUrl: 'style.css',
    imports: [ItemAdderComponent, TrackedItemComponent]
})
export class HomePage{
    itemManager = inject(TrackerManagerService);

    addItem(itemName: string) {
        this.itemManager.addItem(itemName)
    }

    incrementItem(item: TrackedItem) {
        item.amount += 1
        this.itemManager.updateItem(item)
    }

    decrementItem(item: TrackedItem) {
        item.amount -= 1
        this.itemManager.updateItem(item)
    }

    deleteItem(item: TrackedItem) {
        this.itemManager.removeItem(item)
    }
}