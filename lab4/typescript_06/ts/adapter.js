"use strict";
// old system with unappropriate interface
class OldPaymentSystem {
    makePayment(totalAmount) {
        console.log(`Paying ${totalAmount} via old system`);
    }
}
// adapter
class OldPaymentSystemAdapter {
    constructor(oldSystem) {
        this.oldSystem = oldSystem;
    }
    pay(amount) {
        this.oldSystem.makePayment(amount);
    }
}
function processPayment(paymentSystem, amount) {
    paymentSystem.pay(amount);
}
const oldSystem = new OldPaymentSystem();
const adaptedSystem = new OldPaymentSystemAdapter(oldSystem);
console.log('---> Demonstrating Adapter pattern example...');
// paying 100 via old system
processPayment(adaptedSystem, 100);
