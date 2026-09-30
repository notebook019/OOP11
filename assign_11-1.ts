export{};
abstract class TravelPackage {


    constructor(public packageId: string,public packageName: string,public basePrice: number) {
    
    }

    abstract calPrice(people: number): number;
}


class OneDayTrip extends TravelPackage {
    constructor(packageId: string, packageName: string, basePrice: number) {
        super(packageId, packageName, basePrice);
    }

    calPrice(people: number): number {
        let total = this.basePrice * people;
        if (people >= 5) {
            total *= 0.90; 
        }
        return total;
    }
}

class OvernightTrip extends TravelPackage {
    _numberOfNights: number;

    constructor(packageId: string, packageName: string, basePrice: number, numberOfNights: number) {
        super(packageId, packageName, basePrice);
        this._numberOfNights = numberOfNights;
    }

    calPrice(people: number): number {
        let total = this.basePrice * people * this._numberOfNights;
        if (this._numberOfNights >= 3) {
            total *= 0.85; 
        }
        return total;
    }
}

class Customer {
    _customerId: string;
    _name: string;
    _phone: string;

    constructor(customerId: string, name: string, phone: string) {
        this._customerId = customerId;
        this._name = name;
        this._phone = phone;
    }
}

class TravelAgency {
    private _packages: TravelPackage[] = [];

    addPackage(pkg: TravelPackage): void {
        this._packages.push(pkg);
    }

    displayPackages(): void {
        console.log("===== Travel Packages =====");
        this._packages.forEach((pkg, index) => {
            if (pkg instanceof OvernightTrip) {
                console.log(`${index + 1}. ${pkg.packageName} (Overnight - ${pkg._numberOfNights} Nights)`);
            } else {
                console.log(`${index + 1}. ${pkg.packageName} (One-Day)`);
            }
            console.log(`Price: ${pkg.basePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} Baht`);
        });
        console.log("");
    }
}

class Booking {
    private _bookingId: string;
    private _customer: Customer;
    private _travelPackage: TravelPackage;
    private _travelers: string[];

    constructor(bookingId: string, customer: Customer, travelPackage: TravelPackage, travelers: string[]) {
        this._bookingId = bookingId;
        this._customer = customer;
        this._travelPackage = travelPackage;
        this._travelers = travelers;
    }

    displayBookingDetail(): void {
        const count = this._travelers.length;
        const total = this._travelPackage.calPrice(count);

        let discText = "";
        if (this._travelPackage instanceof OneDayTrip && count >= 5) {
            discText = " (10% Disc)";
        } else if (this._travelPackage instanceof OvernightTrip && this._travelPackage._numberOfNights >= 3) {
            discText = " (15% Disc)";
        }

        console.log("===== Booking Detail =====");
        console.log(`Booking ID: ${this._bookingId}`);
        console.log(`Customer: ${this._customer._name}`);
        console.log(`Package: ${this._travelPackage.packageName}`);
        console.log(`Travelers: ${count} (${this._travelers.join(", ")})\n`);
        console.log(`Total Price${discText}: ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })} Baht`);
  
    }
}

const agency = new TravelAgency();
const pkg1 = new OneDayTrip("001", "Bangkok City Tour", 1500);
const pkg2 = new OvernightTrip("002", "Chiang Mai Trip", 2500, 3);

agency.addPackage(pkg1);
agency.addPackage(pkg2);
agency.displayPackages();

const customer = new Customer("001", "nameless", "0650064635");
const travelers = ["P", "mavin", "note", "melody", "pun"];
const booking = new Booking("001", customer, pkg1, travelers);

booking.displayBookingDetail();