class Shops {
  static shops = [
    {
      name: "Game.es",
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
      name: "pccomponentes.com",
      productUrl:
        "https://www.pccomponentes.com/sony-playstation-5",
      selectors: {
        state: "#articleOutOfStock > div.col-xs-12.col-sm-9",
        price: "#precio-main",
      },
    },
  ];
}
module.exports = Shops;
