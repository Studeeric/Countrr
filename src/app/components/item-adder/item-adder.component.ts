import { Component, output, signal } from "@angular/core";

@Component({
    selector: 'countrr-item-adder',
    templateUrl: 'item-adder.component.html'
})
export class ItemAdderComponent {
    value = signal('')
    itemAdded = output<string>()

    onAddItem() {        
        if (this.value().length > 0) {
            this.itemAdded.emit(this.value())
        }
        this.value.update(val => '')
    }
}