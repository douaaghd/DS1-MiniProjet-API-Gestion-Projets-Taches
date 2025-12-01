const projectSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  statut: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Project", projectSchema);
