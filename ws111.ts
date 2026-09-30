class Restaurant{
    constructor(private menu:MenuItem[]){}
    showMenuinfo(){
        this.menu.forEach(menus=>{
            console.log(menus.showMenuinfo());
        })
    }

    calNetPrice(total:number):number{
        const rate = 0.01;
        if(total>= 500){
            return total*(1-0.01);
        }else{
            return total;
        }
    }
}

class MenuItem{
    constructor(private _name:string, private _price:number, private _category:string ){}
    showMenuinfo(){
        return this._name +"-"+this._price+"-"+this._category;
    }
    get name(){
        return this._name;
    }
    get price(){
        return this._price;
    }
}


class Oder {
    constructor(
        private items: {item:MenuItem, quantity:number} [] = []
    ){}
    showOder(){
        this.items.forEach(({item, quantity})=>{
            console.log(`${item.showMenuinfo()} * ${quantity}`)
        })
    }

    caltotal():number{
        let total = 0;
        for(const {item ,quantity} of this.items){
            total += item.price * quantity;
        }
        return total;
    }    
}

class Customer {
    constructor(private name:string){}
    placeOder(res:Restaurant, oder:Oder){
        console.log(`${this.name} สั่งรายการอาหารดังนี้`)
        oder.showOder();
        const total = oder.caltotal();
        const Netprice = res.calNetPrice(total);
        console.log(`จำนวนเงินที่ต้องชำระ ${Netprice}`)
    }
}
const menu1 = new MenuItem("Pizza",199,"Italian")
const menu2 = new MenuItem("mama",29,"thai")
const menu3 = new MenuItem("yumyum",29,"thai")

const res1 = new Restaurant([menu1,menu2,menu3]);
const user1 = new Customer("supakit");
const oder1 = new Oder([
    {item:menu1,quantity:2},
    {item:menu2, quantity:3}
])

user1.placeOder(res1,oder1);