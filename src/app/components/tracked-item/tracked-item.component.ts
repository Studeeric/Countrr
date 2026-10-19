import { Component, input, output } from "@angular/core";
import { TrackedItem } from "../../models/tracked-item";

@Component({
    selector: 'countrr-tracked-item',
    templateUrl: 'tracked-item.component.html',
    styleUrl: 'style.css'
})
export class TrackedItemComponent {
    trackedItem = input.required<TrackedItem>()
    incrementTrackedItem = output<TrackedItem>()
    decrementTrackedItem = output<TrackedItem>()
    deleteTrackedItem = output<TrackedItem>()
}