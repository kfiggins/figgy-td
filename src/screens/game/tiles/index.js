export default (context) => {

  const tile = {
    type: "normal",
    backgroundColor: "blue",
    img: null,
    isOpen: true,
  }

  const startTile = {
    type: "start",
    backgroundColor: "pink",
    img: null,
    isOpen: true,
  }

  const endTile = {
    type: "start",
    backgroundColor: "gray",
    img: null,
    isOpen: true,
  }

  return [
    [startTile, tile, tile, tile, tile, tile, tile, tile],
    [tile, tile, tile, tile, tile, tile, tile, tile],
    [tile, tile, tile, tile, tile, tile, tile, tile],
    [tile, tile, tile, tile, tile, tile, tile, tile],
    [tile, tile, tile, tile, tile, tile, tile, tile],
    [tile, tile, tile, tile, tile, tile, tile, endTile],
  ];
};
