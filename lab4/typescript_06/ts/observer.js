"use strict";
class NuclearReactor {
    constructor() {
        this.temperature = 300;
        this.status = "NORMAL";
        this.observers = [];
    }
    setTemperature(newTemp) {
        this.temperature = newTemp;
        this.updateStatus();
        this.notify();
    }
    updateStatus() {
        if (this.temperature < 400) {
            this.status = "NORMAL";
        }
        else if (this.temperature < 600) {
            this.status = "WARNING";
        }
        else if (this.temperature < 800) {
            this.status = "CRITICAL";
        }
        else {
            this.status = "MELTDOWN";
        }
    }
    attach(observer) {
        this.observers.push(observer);
    }
    detach(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }
    notify() {
        for (const observer of this.observers) {
            observer.update(this.temperature, this.status);
        }
    }
}
class ControlRoomDisplay {
    update(temperature, status) {
        console.log(`[CONTROL ROOM] Temperature: ${temperature}°C | Status: ${status}`);
    }
}
class EmergencySystem {
    update(temperature, status) {
        if (status === "CRITICAL") {
            console.log("[EMERGENCY] CRITICAL TEMPERATURE! Initiating cooling systems...");
        }
        else if (status === "MELTDOWN") {
            console.log("[EMERGENCY] MELTDOWN IMMINENT! Activating containment protocol!");
        }
    }
}
class DataLogger {
    constructor() {
        this.log = [];
    }
    update(temperature, status) {
        const entry = `[${new Date().toISOString()}] ${temperature}°C - ${status}`;
        this.log.push(entry);
        console.log("[LOGGER] New entry:", entry);
    }
    getLog() {
        return this.log;
    }
}
const reactor = new NuclearReactor();
const controlRoom = new ControlRoomDisplay();
const emergency = new EmergencySystem();
const logger = new DataLogger();
console.log('---> Demonstrating Observer pattern...');
reactor.attach(controlRoom);
reactor.attach(emergency);
reactor.attach(logger);
reactor.setTemperature(350);
reactor.setTemperature(450);
reactor.setTemperature(650);
reactor.setTemperature(900);
reactor.detach(logger);
reactor.setTemperature(200); // только controlRoom и emergency получат обновление
console.log("[LOGGER] Full log of event:\n", logger.getLog());
