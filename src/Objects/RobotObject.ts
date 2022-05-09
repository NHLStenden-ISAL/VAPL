import BaseObject from "./BaseObject";
import WorldInformation from "../Helpers/WorldInformation";
import { Color3, Mesh, Vector2 } from "@babylonjs/core";
import { createCustomMesh } from "../Helpers/ObjectCreator";
import { Direction } from "../Compositions/Transformable";
import { VariableContainer, VariableData } from "../VisualData/VariableContainer";
import { GuiBoxRobot } from "../GUI/Components/GuiBoxes";

export default class RobotObject extends BaseObject {
  private variableMap: Map<string, VariableData>;

  constructor(worldInfo: WorldInformation, gridPos: Vector2, dir: Direction) {
    const objectColor = Color3.Green();

    super(worldInfo, gridPos, dir, objectColor);
    worldInfo.getRobotObjects().push(this);

    this.variableMap = new Map();
  }

  protected createMesh(): Mesh {
    return createCustomMesh(this.worldInfo.getScene(), this.getUUID(), Color3.Green(), "");
  }

  public updateRobot() {
    this.stepForward();
    this.checkIntersection();
  }

  private stepForward() {
    this.gridPosition = this.transformable.stepForward(this.gridPosition);
    this.mesh.position = this.updateMeshPosition();
  }

  private checkIntersection() {
    this.worldInfo.getSceneObjects().forEach(object => {
      object.getInteractable()?.checkIntersection(this);
    });
  }

  public delete(): void {
    const indexOfObject = this.worldInfo.getRobotObjects().findIndex((element) => this === element);
    this.worldInfo.getRobotObjects().splice(indexOfObject, 1);

    super.delete();
  }

  public restore(): void {
    this.worldInfo.addRobotObject(this);

    super.restore();
  }

  public addVariable(variable: VariableContainer) {
    if (variable.getName() === "") { return; }

    if (this.variableMap.has(variable.getName())) {
      console.log("Key already exist");
    } else {
      // Only when the key doesn't exist yet
      // this.variableMap.set(variable.getName(), { value: variable.getValue(), isKnown: true });
      console.log("added new variable");
    }

    this.variableMap.set(variable.getName(), { value: variable.getValue(), isKnown: true });
  }

  public removeVariable(variable: VariableContainer) {
    this.variableMap.delete(variable.getName());
  }

  public checkVariable(variableName: string): VariableData {
    if (variableName === "") { return { value: '', isKnown: false }; }

    if (this.variableMap.has(variableName)) {
      return this.variableMap.get(variableName) as VariableData;
    }

    return { value: '', isKnown: false };
  }

  public getVariables(): Map<string, VariableData> {
    return this.variableMap;
  }
  
  public getGUIBox(): GuiBoxRobot {
    return {
      location: this.getPositionForGUI(),
      direction: this.getDirection(),
    }
  }
}