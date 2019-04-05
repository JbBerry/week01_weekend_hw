const myFunctions = require('../pet_shop_functions');

describe('pet shop', () => {

  let petShop;
  let customers;
  let newPet;

  beforeEach(() => {

    customers = [
      {
        name: "Alice",
        pets: [],
        cash: 1000
      },
      {
        name: "Bob",
        pets: [],
        cash: 50
      }
    ]

    newPet = {
      name: "Bors the Younger",
      petType: "cat",
      breed: "Cornish Rex",
      price: 100
    }

    petShop = {
      pets: [
        {
          name: "Sir Percy",
          petType: "cat",
          breed: "British Shorthair",
          price: 500
        },
        {
          name: "King Bagdemagus",
          petType: "cat",
          breed: "British Shorthair",
          price: 500
        },
        {
          name: "Sir Lancelot",
          petType: "dog",
          breed: "Pomsky",
          price: 1000,
        },
        {
          name: "Arthur",
          petType: "dog",
          breed: "Husky",
          price: 900,
        },
        {
          name: "Tristan",
          petType: "dog",
          breed: "Basset Hound",
          price: 800,
        },
        {
          name: "Merlin",
          petType: "cat",
          breed: "Egyptian Mau",
          price: 1500,
        }
      ],
      admin: {
        totalCash: 1000,
        petsSold: 0,
      },
      name: "Camelot of Pets"
    }

  });
/*TEST1*/
  test('has name Camelot of Pets', () => {
    expect(myFunctions.getName(petShop)).toBe("Camelot of Pets");
  });
/*TEST2*/
  test('has correct total cash', () => {
    expect(myFunctions.getTotalCash(petShop)).toBe(1000);
  });
/*TEST3*/
  test('can add cash', () => {
    myFunctions.addOrRemoveCash(petShop, 10);
    expect(myFunctions.getTotalCash(petShop)).toBe(1010);
  });
/*TEST4*/
  test('can remove cash', () => {
    myFunctions.addOrRemoveCash(petShop, -10);
    expect(myFunctions.getTotalCash(petShop)).toBe(990);
  });
/*TEST5*/
  test('can get number of pets sold', () => {
    expect(myFunctions.getPetsSold(petShop)).toBe(0);
  });
/*TEST6*/
  test('can increase number of pets sold', () => {
    myFunctions.increasePetsSold(petShop, 2);
    expect(myFunctions.getPetsSold(petShop)).toBe(2);
  });
/*TEST7*/
  test('can get stock count', () => {
    expect(myFunctions.getStockCount(petShop)).toBe(6);
  });
/*TEST8*/
  test('can get pets by breed', () => {
    expect(myFunctions.getPetsByBreed(petShop, "British Shorthair")).toBe(2);
  });
/*TEST9*/
  test('returns 0 if not pet by breed found', () => {
    expect(myFunctions.getPetsByBreed(petShop, "Dalmation")).toBe(0);
  });
/*TEST10*/
  test('finds a pet by name', () => {
    expect(myFunctions.getPetByName(petShop, "Arthur"))
      .toEqual(
        {
          name: "Arthur",
          petType: "dog",
          breed: "Husky",
          price: 900,
        }
      );
  });
/*TEST11*/
  test('returns undefined if pet is not found by name', () => {
    expect(myFunctions.getPetByName(petShop, "Fred")).toBeUndefined();
  });
/*TEST12*/
  test('can remove all pets called Arthur', () => {
    // HINT: You can loop round an array starting at the end
    // using for(var i = shop.pets.length-1; i >= 0; i--){}
    myFunctions.removePetByName(petShop, "Arthur");
    expect(myFunctions.getPetByName(petShop, "Arthur")).toBeUndefined();
  });
/*TEST13*/
  test('can add a new pet to stock', () => {
    myFunctions.addPetToStock(petShop, newPet);
    expect(myFunctions.getStockCount(petShop)).toBe(7);
  });
/*TEST14*/
  test('can get a customers cash', () => {
    expect(myFunctions.getCustomersCash(customers[0])).toBe(1000);
  });
/*TEST15*/
  test('can get total customers cash', () => {
    expect(myFunctions.getCustomersCashTotal(customers)).toBe(1050);
  });
/*TEST16*/
  test('can remove customers cash', () => {
    myFunctions.removeCustomerCash(customers[0], 100);
    expect(customers[0].cash).toBe(900);
  });
/*TEST17*/
  test('can get number of pets for a customer', () => {
    expect(myFunctions.getCustomerPetCount(customers[0])).toBe(0);
  });
/*TEST18*/
  test('can add a pet to a customer', () => {
    myFunctions.addPetToCustomer(customers[0], newPet);
    expect(myFunctions.getCustomerPetCount(customers[0])).toBe(1);
  });

  // ===== EXTENSIONS ==============================
/*TEST19*/
  test('customer CANT afford a pet', () => {;
    expect(myFunctions.customerCanAffordPet(customers[1], newPet)).toBeFalsy();
  });
/*TEST20*/
  test('customer CAN afford a pet', () => {;
    expect(myFunctions.customerCanAffordPet(customers[0], newPet)).toBeTruthy();
  });

  // These are 'integration' tests so we want multiple assertions.
  // If one fails the entire test should fail
/*TEST21*/
  test('customer can buy a pet', () => {
    var customer = customers[0];
    var pet = myFunctions.getPetByName(petShop, "Arthur");
    myFunctions.sellPetToCustomer(petShop, pet, customer);

    expect(myFunctions.getCustomerPetCount(customers[0])).toBe(1);
    expect(myFunctions.getPetsSold(petShop)).toBe(1);
    expect(myFunctions.getCustomersCash(customer)).toBe(100);
    expect(myFunctions.getTotalCash(petShop)).toBe(1900);
  });
/*TEST22*/
  test('customer cant buy a pet that doesnt exist', () => {
    var customer = customers[0];
    var pet = myFunctions.getPetByName(petShop, "Dave");
    myFunctions.sellPetToCustomer(petShop, pet, customer);

    expect(myFunctions.getCustomerPetCount(customers[0])).toBe(0);
    expect(myFunctions.getPetsSold(petShop)).toBe(0);
    expect(myFunctions.getCustomersCash(customer)).toBe(1000);
    expect(myFunctions.getTotalCash(petShop)).toBe(1000);
  });
/*TEST23*/
  test('customer cant buy a pet if they cant afford it', () => {
    var customer = customers[1];
    var pet = myFunctions.getPetByName(petShop, "Arthur");
    myFunctions.sellPetToCustomer(petShop, pet, customer);

    expect(myFunctions.getCustomerPetCount(customers[0])).toBe(0);
    expect(myFunctions.getPetsSold(petShop)).toBe(0);
    expect(myFunctions.getCustomersCash(customer)).toBe(50);
    expect(myFunctions.getTotalCash(petShop)).toBe(1000);
  });

})
