myFunctions = {
  // Write your functions here
  getName(petShop){
    /*TEST1*/
    return petShop.name;
  },
  getTotalCash(petShop){
    /*TEST2*/
    return petShop.admin.totalCash;
  },
  addOrRemoveCash(petShop,cash){
    /*TEST3*/ /*TEST4*/
    petShop.admin.totalCash += cash;
  },
  getPetsSold(petShop){
    /*TEST5*/
    return petShop.admin.petsSold;
  },
  increasePetsSold(petShop,numberSold){
    /*TEST6*/
    petShop.admin.petsSold += numberSold;
  },
  getStockCount(petShop){
    /*TEST7*/
    return petShop.pets.length;
  },
  getPetsByBreed(petShop, breed){
    /*TEST8*//*TEST9*/
    let petsOfBreed = [];
    for (let pet of petShop.pets) {
      if (pet.breed == breed) {
        petsOfBreed.push(pet)
      };
    };
    return petsOfBreed.length;
  },
  getPetByName(petShop, petName){
    /*TEST10*/ /*TEST11*/
    for (let pet of petShop.pets) {
      if(pet.name == petName){
        return pet;
      };
    }
    return undefined;
  },
  removePetByName(petShop, petName){
    /*TEST12*/
    for (let i = petShop.pets.length-1; i >= 0; i--){
      if (petShop.pets[i].name == petName){
        petShop.pets.splice(i,1);
      };
    };
  },
  addPetToStock(petShop, newPet){
    /*TEST13*/
    petShop.pets.push(newPet);
  },
  getCustomersCash(customer){
    /*TEST14*/
    return customer.cash;
  },
  getCustomersCashTotal(customer){
    /*TEST15*/
    let total =0;
    for (var i = 0; i < customer.length; i++) {
      total+= myFunctions.getCustomersCash(customer[i])
    };
    return total;
  },
  removeCustomerCash(customer,cash){
    /*TEST16*/
    customer.cash -= cash;
  },
  getCustomerPetCount(customer){
    /*TEST17*/
    return customer.pets.length;
  },
  addPetToCustomer(customer, newPet){
    /*TEST18*/
    customer.pets.push(newPet);
  },
  customerCanAffordPet(customer,newPet){
    /*TEST19*/ /*TEST20*/
    if (customer.cash >= newPet.price){
      return true;
    };
  },
  sellPetToCustomer(petShop, pet, customer){
    /*TEST21
      customer pet count to increase
      pets sold to increase
      customer cash to decrease
      petShop cash to increase */
    /*TEST22
      getPetByName needs to return a value */
    /*TEST23
      pet.value cannot be more than customer.cash */

    if(pet){ //returns truthy if pet exists
      if(myFunctions.customerCanAffordPet(customer,pet)){
        myFunctions.removeCustomerCash (customer, pet.price);
        myFunctions.addOrRemoveCash(petShop, pet.price);
        myFunctions.addPetToCustomer(customer, pet);
        myFunctions.increasePetsSold(petShop, 1);
      };
    };
  }
};

module.exports = myFunctions;
