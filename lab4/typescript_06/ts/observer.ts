interface ReactorObserver {
    update(temperature: number, status: string): void;
}

interface ReactorSubject {
    attach(observer: ReactorObserver): void;
    detach(observer: ReactorObserver): void;
    notify(): void;
}

class NuclearReactor implements ReactorSubject {
    private temperature: number = 300;
    private status: string = "NORMAL";
    private observers: ReactorObserver[] = [];

    public setTemperature(newTemp: number): void {
        this.temperature = newTemp;
        this.updateStatus();
        this.notify();
    }

    private updateStatus(): void {
        if (this.temperature < 400) {           this.status = "NORMAL";
        } else if (this.temperature < 600) {    this.status = "WARNING";
        } else if (this.temperature < 800) {    this.status = "CRITICAL";
        } else {                                this.status = "MELTDOWN";
        }
    }

    public attach(observer: ReactorObserver): void {
        this.observers.push(observer);
    }

    public detach(observer: ReactorObserver): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    public notify(): void {
        for (const observer of this.observers) {
            observer.update(this.temperature, this.status);
        }
    }
}

class ControlRoomDisplay implements ReactorObserver {
    update(temperature: number, status: string): void {
        console.log(`[CONTROL ROOM] Temperature: ${temperature}°C | Status: ${status}`);
    }
}

class EmergencySystem implements ReactorObserver {
    update(temperature: number, status: string): void {
        if (status === "CRITICAL") {
            console.log("[EMERGENCY] CRITICAL TEMPERATURE! Initiating cooling systems...");
        } else if (status === "MELTDOWN") {
            console.log("[EMERGENCY] MELTDOWN IMMINENT! Activating containment protocol!");
        }
    }
}

class DataLogger implements ReactorObserver {
    private log: string[] = [];
    
    update(temperature: number, status: string): void {
        const entry = `[${new Date().toISOString()}] ${temperature}°C - ${status}`;
        this.log.push(entry);
        console.log("[LOGGER] New entry:", entry);
    }
    
    getLog(): string[] {
        return this.log;
    }
}


const reactor = new NuclearReactor();
const controlRoom = new ControlRoomDisplay();
const emergency = new EmergencySystem();
const logger = new DataLogger();

console.log('---> Demonstrating Observer pattern...')

reactor.attach(controlRoom);
reactor.attach(emergency);
reactor.attach(logger);

reactor.setTemperature(350);
reactor.setTemperature(450);
reactor.setTemperature(650);
reactor.setTemperature(900);

reactor.detach(logger);
reactor.setTemperature(200);  // только controlRoom и emergency получат обновление

console.log("[LOGGER] Full log of event:\n", logger.getLog());