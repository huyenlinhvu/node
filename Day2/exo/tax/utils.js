function addTax(priceHT) {
    const TAX = 0.2;
    return Number((priceHT * (1 + TAX)).toFixed(2));
  }
  
  module.exports = {
    addTax,
  };
  