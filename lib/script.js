/**
 * New script file
 */
/**
 * Process a property that is held for sale
 * @param {org.acme.model.Sell} transaction
 * @return {Promise} Asset Registry Promise
 * @transaction
 */
function Sell(transaction) {
    var Buyerfruit = false;
    var factory = getFactory();
    var currentParticipant = getCurrentParticipant();
    if (currentParticipant.id != transaction.fruit.owner.id) {
        throw new Error("Only Owner can sell");
    }

    if (transaction.fruit.quantity <= transaction.quantity) {
        throw new Error("You do not have the stock");
    }

    return query("Q1", {
        name: transaction.fruit.name,
        owner: getResourcePath(transaction.buyer),
    }).then(function(fruits) {

        if (fruits.length > 0) {
            Buyerfruit = fruits[0];
        }
      	console.log(Buyerfruit);
      	debugger;
        return getAssetRegistry("org.acme.model.Fruit");
    }).then(function(fruitAssetRegistry) {
            	debugger;
        if (Buyerfruit) {
            Buyerfruit.quantity = Buyerfruit.quantity + transacion.quantity
            return fruitAssetRegistry.update(Buyerfruit);
        } else {
            var id = Math.random().toString();
            var Buyerfruit = factory.newResource("org.acme.model", "Fruit", id);

            Buyerfruit.name = transaction.fruit.name;
            Buyerfruit.owner = transaction.buyer;
            Buyerfruit.quantity = transaction.quantity;

            return fruitAssetRegistry.add(Buyerfruit);
        }
    }).then(function() {
        return getAssetRegistry("org.acme.model.Fruit");
    }).then(function(fruitAssetRegistry) {
        transaction.fruit.quantity -= transaction.quantity;
        fruitAssetRegistry.update(transaction.fruit);
    })

}


function getResourcePath(resource) {
    return "resource:" + resource.getFullyQualifiedIdentifier();
}