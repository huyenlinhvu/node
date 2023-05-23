import { Schema, SchemaTypes, Types, model } from "mongoose";

const passengerSchema = Schema(
  {
    _id: { type: SchemaTypes.ObjectId, default: () => new Types.ObjectId() },
    PassengerId: { type: Number, required: true },
    Survived: { type: Boolean, required: true },
    Pclass: { type: Number, required: true },
    Name: { type: String, required: true },
    Sex: { type: String, required: true },
    Age: { type: Number, required: true },
    SibSp: { type: Number, required: true },
    Parch: { type: Number, required: true },
    Ticket: { type: Number, required: true },
    Fare: { type: Number, required: true },
    Cabin: { type: String, required: false },
    Embarked: { type: String, required: true },
  }
  // { versionKey: false } // Permet de supprimer le "__v" si besoin
);

const collectionName = "passengers";

export default model("Passenger", passengerSchema, collectionName);
