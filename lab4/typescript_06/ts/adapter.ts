// expected interface
interface NewPaymentSystem {
    pay(amount: number): void;
}

// old system with unappropriate interface
class OldPaymentSystem {
    public makePayment(totalAmount: number): void {
        console.log(`Paying ${totalAmount} via old system`);
    }
}

// adapter
class OldPaymentSystemAdapter implements NewPaymentSystem {
    constructor(private oldSystem: OldPaymentSystem) {}

    pay(amount: number): void {
        this.oldSystem.makePayment(amount);
    }
}


function processPayment(paymentSystem: NewPaymentSystem, amount: number) {
    paymentSystem.pay(amount);
}

const oldSystem = new OldPaymentSystem();
const adaptedSystem = new OldPaymentSystemAdapter(oldSystem);

console.log('---> Demonstrating Adapter pattern example...');

// paying 100 via old system
processPayment(adaptedSystem, 100);