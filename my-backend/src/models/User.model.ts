import mongoose, { Schema, Document } from "mongoose";

// User model
export interface IUser extends Document {
  name: string;
  email: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export const User = mongoose.model<IUser>("User", UserSchema);
