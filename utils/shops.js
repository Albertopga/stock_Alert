class Shops {
  static shops = [
    {
      name: "Game",
      productUrl:
        "https://www.game.es/HARDWARE/CONSOLA/PLAYSTATION-5/CONSOLA-PLAYSTATION-5/183224",
      selectors: {
        state: "section.right-side.product-quick-actions > div > h4",
        price: "section.right-side.product-quick-actions > div > div",
      },
    },
    {
      name: "GameVip.es",
      productUrl: "https://www.gamevip.es/consola-ps5-blanca-p-1-50-37065/",
      selectors: {
        state: "#availability",
        price: "#precio_principal > strong",
      },
    },
    {
      name: "fnac.es",
      productUrl:
        "https://www.fnac.es/Mando-inalambrico-DualSense-para-PS5-Blanco-Accesorio-Videoconsola-Mando-consola/a7724804#omnsearchpos=4",
      selectors: {
        state: "f-buyBox-availabilityStatus-available",
        price: "f-productOffer-priceBox",
      },
    },
  ];
}
module.exports = Shops;
