import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class StorageManagerService {

    constructor() {}

    save(key: string, value: any) {
        console.log("Saving item...", key);
        
        try {
            console.log("Adding value..");
            
            localStorage.setItem(key, JSON.stringify(value))
        } catch (e) {
            console.error('Error saving to local storage', e);
        }
    }

    getItem(key: string): any {
        try {
            console.log("Getting item... ", key);
            
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from local storage', e);
            return null;
        }
    }

    removeItem(key: string): any {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from local storage', e);
        }
    }
}