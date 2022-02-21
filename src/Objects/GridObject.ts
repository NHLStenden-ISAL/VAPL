import { Mesh, Scene } from "@babylonjs/core";
import { createGrid } from "../Helpers/ObjectCreator";

export class GridObject {
  private scene: Scene;
  private mesh: Mesh;

  constructor(scene: Scene, planeSize: number, gridRatio: number = 1) {
    this.scene = scene;

    this.mesh = createGrid(this.scene, planeSize, gridRatio);
  }

}